export type DataResponse<D> = {
  data: D;
}

export type ListResponse<E> = DataResponse<Array<E>>;

export type Pagination = {
  index: number;
  pageSize: number;
  resultCount: number;
  totalCount: number;
};

export type PaginationResponse<E> = ListResponse<E> & {
  pagination: Pagination;
};
