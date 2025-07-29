export interface SearchProjectsParameters {
  query?: string;
  facets?: Facet[];
  index?: Index;
  offset?: number;
  limit?: number;
}

type Facet = "";

enum Index {
  Relevance = "relevance",
  Downloads = "downloads",
  Followers = "follows",
  DatePuhlished = "newest",
  DateUpdated = "updated",
}
