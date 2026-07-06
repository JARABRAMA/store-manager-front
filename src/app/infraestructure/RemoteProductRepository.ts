import type { Product } from "../domain/model/Product";
import type { Page } from "../domain/model/Page";
import type { ProductRepositoryPort } from "../domain/ProductRepositoryPort";
import type { ErrorResponse } from "./dto/ErrorResponse";
import type { PageResponse } from "./dto/PageResponse";
import type { ProductResponse } from "./dto/ProductResponse";
import { ProductResponseMapper } from "./mapper/ProductResponseMapper";
import { ConnectionFailedException } from "../domain/exceptions/ConnectionFailedException";
import { ServerErrorException } from "../domain/exceptions/ServerErrorException";

export class RemoteProductRepository implements ProductRepositoryPort {
  private SERVICE_URL = import.meta.env.VITE_SERVICE_URL;

  async findAll(
    search: string,
    category: string,
    page: number,
  ): Promise<Page<Product>> {
    const params = this.getFilterProductsURLParams(search, category, page);
    let res: Response;
    try {
      res = await fetch(
        `${this.SERVICE_URL}/api/products?${params.toString()}`,
      );
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
      throw new ConnectionFailedException();
    }
    if (!res.ok) {
      const data = (await res.json()) as ErrorResponse;
      throw new ServerErrorException(
        data.status,
        `Http error: ${data.status} - ${data.message}`,
      );
    }
    const pageResponse = (await res.json()) as PageResponse<ProductResponse>;

    return {
      content: pageResponse.content.map((p) =>
        ProductResponseMapper.toDomain(p),
      ),
      page: pageResponse.page,
      size: pageResponse.size,
      totalElements: pageResponse.totalElements,
      totalPages: pageResponse.totalPages,
      first: pageResponse.first,
      last: pageResponse.last,
    };
  }

  private getFilterProductsURLParams(
    search: string | null,
    category: string | null,
    page: number | null,
  ): URLSearchParams {
    const params = new URLSearchParams();
    if (search) params.append("text", search);
    if (category) params.append("category", category);
    if (page) params.append("page", page.toString());
    return params;
  }

  async findById(id: string): Promise<Product> {
    throw new Error("Method not implemented.");
  }

  async findAllCategories(): Promise<string[]> {
    let res: Response;
    try {
      res = await fetch(`${this.SERVICE_URL}/api/products/categories`);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e);
        throw new ConnectionFailedException();
      }
      return [];
    }
    if (!res.ok) {
      const data = (await res.json()) as ErrorResponse;
      throw new ServerErrorException(
        data.status,
        `Http error: ${data.status} - ${data.message}`,
      );
    }
    return (await res.json()) as string[];
  }

  async save(product: Product): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async update(id: string, product: Product): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
