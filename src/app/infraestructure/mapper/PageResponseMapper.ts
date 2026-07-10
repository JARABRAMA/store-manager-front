import type { Page } from "../../domain/model/Page";
import type { PageResponse } from "../dto/PageResponse";

export class PageResponseMapper {
  static toDomain<V, T>(
    page: PageResponse<V>,
    mapFn: (object: V) => T,
  ): Page<T> {
    return {
      content: page.content.map(mapFn),
      page: page.page,
      size: page.size,
      totalElements: page.totalElements,
      totalPages: page.totalPages,
      first: page.first,
      last: page.last,
    };
  }
}
