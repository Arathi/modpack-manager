export interface PagedResponse<D> {
  data: Array<D>;
  page: Page;
}

interface Page {
  index: number;
  size: number;
  total: number;
}
