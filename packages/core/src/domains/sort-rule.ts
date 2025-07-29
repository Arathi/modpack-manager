export enum SortRule {
  // 公共
  Popularity = "popularity",
  Updated = "updated",
  Created = "created",
  Downloads = "downloads",
  // 仅限CurseForge
  Featured = "featured",
  Name = "name",
  Author = "author",
  Category = "category",
  GameVersion = "game-version",
  Rating = "rating",
  // 仅限Modrinth
  Relevancy = "relevancy",
}

export const SortRuleNames: Record<SortRule, string> = {
  // 公共
  [SortRule.Popularity]: "流行度",
  [SortRule.Updated]: "更新时间",
  [SortRule.Created]: "创建时间",
  [SortRule.Downloads]: "下载次数",
  // 仅限CurseForge
  [SortRule.Featured]: "特征",
  [SortRule.Name]: "名称",
  [SortRule.Author]: "作者",
  [SortRule.Category]: "分类",
  [SortRule.GameVersion]: "游戏版本",
  [SortRule.Rating]: "评分",
  // 仅限Modrinth
  [SortRule.Relevancy]: "关联性",
};
