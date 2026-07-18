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
import { randIntExclusive } from "../TestUtils";

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

    it("Should trow ConnectionFailedException when connection errors", async () => {
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

  describe("findProductById", () => {
    it("Should return connection error exception when connection error", async () => {
      fetchMock.mockRejectedValue(new Error("Connection error"));

      try {
        await repository.findById("any");
        expect.fail();
      } catch (e) {
        expect(e).toBeInstanceOf(ConnectionFailedException);
      }
    });

    it("Should return bad request exception when http status between 400 and 499", async () => {
      const randBadRequestStatus = randIntExclusive(400, 500);
      const response: ErrorResponse = {
        message: "Bad request",
        status: randBadRequestStatus,
      };
      fetchMock.mockResolvedValue(
        new Response(JSON.stringify(response), {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }),
      );

      try {
        await repository.findById("any");
        expect.fail();
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect((e as BadRequestException).message).toBe(response.message);
      }
    });

    it("Should return service error exception when http status equals or greatest than 500", async () => {
      const randHttpStatus = randIntExclusive(500, 599);
      const response: ErrorResponse = {
        message: "Server error",
        status: randHttpStatus,
      };

      fetchMock.mockResolvedValue(
        new Response(JSON.stringify(response), {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }),
      );

      try {
        await repository.findById("any");
        expect.fail();
      } catch (e) {
        expect(e).instanceOf(ServerErrorException);
        expect((e as ServerErrorException).message).toBe(response.message);
      }
    });

    it("Should return a product when server response is ok", async () => {
      const productResponse: ProductResponse = {
        categories: ["category1", "category2"],
        description: "a short description",
        id: "123",
        imageUrl: "http://image.jpg",
        name: "product 1",
        stock: 3,
        price: 4_500,
      };

      const expectedProduct: Product = {
        categories: ["category1", "category2"],
        description: "a short description",
        id: "123",
        imageUrl: "http://image.jpg",
        name: "product 1",
        stock: 3,
        price: 4_500,
      };

      fetchMock.mockResolvedValue(
        new Response(JSON.stringify(productResponse), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );

      const actual = await repository.findById("123");
      expect(actual).toEqual(expectedProduct);
    });
  });

  describe("delete", () => {
    it("Should return connection error when fetch error", async () => {
      fetchMock.mockRejectedValue(new Error("Connection error"));

      try {
        await repository.delete("any");
        expect.fail();
      } catch (e) {
        expect(e).toBeInstanceOf(ConnectionFailedException);
        expect((e as Error).message).toEqual(
          "Error de conexion por favor intenta más tarde",
        );
      }
    });

    it("Should return bad request error when Http Response between 400 and 499", async () => {
      const response: ErrorResponse = {
        message: "invalid id",
        status: 400,
      };
      fetchMock.mockResolvedValue(
        new Response(JSON.stringify(response), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }),
      );

      try {
        await repository.delete("any");
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect((e as BadRequestException).message).toBe(response.message);
      }
    });
    it("Should return server error exception when http response is bigger or equals than 500", async () => {
      const response: ErrorResponse = {
        message: "error del servidor",
        status: 599,
      };
      fetchMock.mockResolvedValue(
        new Response(JSON.stringify(response), {
          status: 599,
          headers: { "Content-Type": "application/json" },
        }),
      );

      try {
        await repository.delete("any");
      } catch (e) {
        expect(e).toBeInstanceOf(ServerErrorException);
        expect((e as BadRequestException).message).toBe(response.message);
      }
    });

    it("Should return message when ok response", async () => {
      const response: { message: string } = {
        message: "Producto eliminado exitosamente",
      };
      fetchMock.mockResolvedValue(
        new Response(JSON.stringify(response), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );

      const actualMessage = await repository.delete("any");
      expect(actualMessage).toBe(response.message);
    });
  });

  describe("save", () => {
    const product = {
      id: "1",
      name: "Product 1",
      price: 10,
      categories: ["category"],
      description: null,
      stock: 0,
      imageUrl: null,
    };

    it("when success should return message", async () => {
      const message = "saved product";
      const response = new Response(JSON.stringify({ message }), {
        status: 202,
        headers: {
          "Content-Type": "application-json",
        },
      });

      fetchMock.mockResolvedValue(response);

      const actual = await repository.save(product);

      expect(actual).toBe(message);
    });

    it("when 400 >= HTTP response < 500 should return bad request exception", async () => {
      const message = "invalid input";
      const status = randIntExclusive(400, 500);
      console.log(status);
      const errorResponse: ErrorResponse = {
        message,
        status,
      };
      const res = new Response(JSON.stringify(errorResponse), {
        status,
        headers: {
          "Content-Type": "application-json",
        },
      });

      fetchMock.mockResolvedValue(res);

      try {
        await repository.save(product);
        expect.fail();
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect((e as Error).message).toBe(message);
      }
    });

    it("when 500 >= HTTP response < 599 should return server error exception", async () => {
      const message = "invalid input";
      const status = randIntExclusive(500, 600);
      const errorResponse: ErrorResponse = {
        message,
        status,
      };
      const res = new Response(JSON.stringify(errorResponse), {
        status,
        headers: {
          "Content-Type": "application-json",
        },
      });

      fetchMock.mockResolvedValue(res);

      try {
        await repository.save(product);
        expect.fail();
      } catch (e) {
        expect(e).toBeInstanceOf(ServerErrorException);
        expect((e as ServerErrorException).message).toBe(message);
      }
    });

    it("when connection error should return connection failed exception", async () => {
      fetchMock.mockRejectedValue(new ConnectionFailedException());

      try {
        await repository.save(product);
        expect.fail();
      } catch (e) {
        expect(e).toBeInstanceOf(ConnectionFailedException);
        expect((e as Error).message).toEqual(
          "Error de conexion por favor intenta más tarde",
        );
      }
    });
  });
});
