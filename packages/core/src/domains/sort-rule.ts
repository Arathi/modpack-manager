export enum SortRule {
  Relevancy = "relevancy",
  Popularity = "popularity",
  Updated = "updated",
  Created = "created",
  Downloads = "downloads",
}

export const SortRuleNames: Record<SortRule, string> = {
  [SortRule.Relevancy]: "关联性",
  [SortRule.Popularity]: "流行度",
  [SortRule.Updated]: "更新时间",
  [SortRule.Created]: "创建时间",
  [SortRule.Downloads]: "下载次数",
};
