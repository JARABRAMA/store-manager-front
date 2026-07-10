import type { Product } from "../domain/model/Product";
import type { Page } from "../domain/model/Page";
import type { ProductRepositoryPort } from "../domain/ProductRepositoryPort";
import type { ErrorResponse } from "./dto/ErrorResponse";
import type { PageResponse } from "./dto/PageResponse";
import type { ProductResponse } from "./dto/ProductResponse";
import { ProductResponseMapper } from "./mapper/ProductResponseMapper";
import { ConnectionFailedException } from "../domain/exceptions/ConnectionFailedException";
import { ServerErrorException } from "../domain/exceptions/ServerErrorException";
import { BadRequestException } from "../domain/exceptions/BadRequestException";
import { PageResponseMapper } from "./mapper/PageResponseMapper";

export class RemoteProductRepository implements ProductRepositoryPort {
  private readonly serviceUrl: string;
  private readonly fetchFn: typeof fetch;

  constructor(
    serviceUrl: string = import.meta.env.VITE_SERVICE_URL,
    fetchFn: typeof fetch = fetch,
  ) {
    this.serviceUrl = serviceUrl;
    this.fetchFn = fetchFn;
  }

  async findAll(
    search: string,
    category: string,
    page: number,
  ): Promise<Page<Product>> {
    const params = this.getFilterProductsURLParams(search, category, page);
    let res: Response;
    try {
      res = await this.fetchFn(
        `${this.serviceUrl}/api/products?${params.toString()}`,
      );
    } catch (e: unknown) {
      console.log("Repository Error: ", e);
      throw new ConnectionFailedException();
    }

    if (!res.ok) {
      const error: ErrorResponse = await res.json();
      if (res.status >= 400 && res.status < 500) {
        throw new BadRequestException(error.message);
      }
      throw new ServerErrorException(error.message);
    }

    const pageResponse: PageResponse<ProductResponse> = await res.json();
    return PageResponseMapper.toDomain(
      pageResponse,
      ProductResponseMapper.toDomain,
    );
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
    let res: Response;
    try {
      res = await this.fetchFn(`${this.serviceUrl}/api/products/${id}`);
    } catch (e) {
      if (e instanceof Error) console.log(`Repository: ${e.message}`);
      throw new ConnectionFailedException();
    }
    if (!res.ok) {
      const data = (await res.json()) as ErrorResponse;
      if (data.status >= 400 && data.status < 500) {
        throw new BadRequestException(data.message);
      } else {
        throw new ServerErrorException(data.message);
      }
    }
    const data = (await res.json()) as ProductResponse;
    return ProductResponseMapper.toDomain(data);
  }

  async findAllCategories(): Promise<string[]> {
    let res: Response;
    try {
      res = await this.fetchFn(`${this.serviceUrl}/api/products/categories`);
    } catch (e: unknown) {
      console.log("Repository Error: ", e);
      throw new ConnectionFailedException();
    }
    if (!res.ok) {
      const data = (await res.json()) as ErrorResponse;
      throw new ServerErrorException(data.message);
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
