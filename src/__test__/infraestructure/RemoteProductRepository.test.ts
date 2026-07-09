import { describe, it, expect, vi, beforeEach } from "vitest";
import type { PageResponse } from "../../app/infraestructure/dto/PageResponse";
import type { ProductResponse } from "../../app/infraestructure/dto/ProductResponse";
import { RemoteProductRepository } from "../../app/infraestructure/RemoteProductRepository";
import type { Page } from "../../app/domain/model/Page";
import type { Product } from "../../app/domain/model/Product";
import type { ErrorResponse } from "../../app/infraestructure/dto/ErrorResponse";
import { BadRequestException } from "../../app/domain/exceptions/BadRequestException";
import { ServerErrorException } from "../../app/domain/exceptions/ServerErrorException";
import { ConnectionFailedException } from "../../app/domain/exceptions/ConnectionFailedException";

describe("RemoteProductRepository", () => {
  const serviceUrl = "http://service-test";
  let fetchMock: ReturnType<typeof vi.fn>;
  let repository: RemoteProductRepository;

  beforeEach(() => {
    fetchMock = vi.fn();
    repository = new RemoteProductRepository(
      serviceUrl,
      fetchMock as unknown as typeof fetch,
    );
  });

  describe("findAll", () => {
    it("returns a mapped Page<Product> when the request succeeds", async () => {
      const pageResponse: PageResponse<ProductResponse> = {
        content: [
          {
            id: "1",
            name: "Product 1",
            price: 10,
            categories: ["category"],
            description: null,
            stock: 0,
            imageUrl: null,
          },
        ],
        page: 0,
        size: 10,
        totalElements: 1,
        totalPages: 1,
        first: true,
        last: true,
      };
      const expectedPage: Page<Product> = {
        content: [
          {
            id: "1",
            name: "Product 1",
            price: 10,
            categories: ["category"],
            description: null,
            stock: 0,
            imageUrl: null,
          },
        ],
        page: 0,
        size: 10,
        totalElements: 1,
        totalPages: 1,
        first: true,
        last: true,
      };

      fetchMock.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => pageResponse,
      });

      const actual = await repository.findAll("", "", 0);
      expect(actual).toEqual(expectedPage);
    });

    it("Should throw Server Error exception when bad request", async () => {
      const errorResponse: ErrorResponse = {
        message: "Internal Server Error",
        status: 506,
      };

      fetchMock.mockResolvedValue(
        new Response(JSON.stringify(errorResponse), {
          status: 506,
          headers: { "Content-Type": "appilcation/json" },
        }),
      );

      try {
        await repository.findAll("invalid", "invalid", 1);
        expect.fail();
      } catch (e) {
        expect(e).toBeInstanceOf(ServerErrorException);
        expect((e as ServerErrorException).message).toBe(errorResponse.message);
      }
    });

    it("Should trow bad request exception when bad request", async () => {
      const errorResponse: ErrorResponse = {
        message: "Categoria Invalida",
        status: 400,
      };

      fetchMock.mockResolvedValue(
        new Response(JSON.stringify(errorResponse), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }),
      );

      try {
        await repository.findAll("invalid", "invalid", -122);
        expect.fail();
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect((e as BadRequestException).message).toBe(errorResponse.message);
      }
    });

    it("Shuld trow ConnectionFailedException when connection errors", async () => {
      fetchMock.mockRejectedValue(Error("connection error"));

      try {
        await repository.findAll("", "category", 12);
        expect.fail();
      } catch (e) {
        expect(e).toBeInstanceOf(ConnectionFailedException);
        expect((e as Error).message).toBe(
          "Error de conexion por favor intenta más tarde",
        );
      }
    });
  });

  describe("findAllCategories", () => {
    it("should return a list of categories strings when success", async () => {
      const expectedResponse = ["category1", "category2", "category3"];

      fetchMock.mockResolvedValue(
        new Response(JSON.stringify(expectedResponse), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );

      const actual = await repository.findAllCategories();
      expect(actual).toEqual(expectedResponse);
    });

    it("should throw server error exception when response is not ok", async () => {
      const response: ErrorResponse = {
        message: "bad response",
        status: 400,
      };
      fetchMock.mockResolvedValue(
        new Response(JSON.stringify(response), {
          status: 400,
        }),
      );

      try {
        await repository.findAllCategories();
        expect.fail();
      } catch (e) {
        expect(e).toBeInstanceOf(ServerErrorException);
        expect((e as ServerErrorException).message).toBe(response.message);
      }
    });

    it("should throw a connection server exception  when a connection exception", async () => {
      fetchMock.mockRejectedValue(new Error("Connection error"));

      try {
        await repository.findAllCategories();
        expect.fail();
      } catch (e) {
        expect(e).toBeInstanceOf(ConnectionFailedException);
      }
    });
  });
});
