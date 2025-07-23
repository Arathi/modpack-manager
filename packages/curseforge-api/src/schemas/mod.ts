import type { Category } from "./category";

export interface Mod {
    screenshots: Screenshot[];
    id: number;
    gameId: number;
    name: string;
    slug: string;
    links: Links;
    summary: string;
    status: number;
    downloadCount: number;
    isFeatured: boolean;
    primaryCategoryId: number;
    categories: Category[];
    classId: number;
    authors: Author[];
    logo: Screenshot;
    mainFileId: number;
    latestFiles: object[];
    latestFilesIndexes: object[];
    latestEarlyAccessFilesIndexes: any[];
    dateCreated: string;
    dateModified: string;
    dateReleased: string;
    allowModDistribution: boolean;
    gamePopularityRank: number;
    isAvailable: boolean;
    thumbsUpCount: number;
    featuredProjectTag: number;
    socialLinks?: object[];
    serverAffiliation?: object;
}

export interface Screenshot {
    id: number;
    modId: number;
    title: string;
    description: string;
    thumbnailUrl: string;
    url: string;
}

export interface Links {
    websiteUrl: string;
    wikiUrl: string | null;
    issuesUrl: string | null;
    sourceUrl: string | null;
}

export interface Author {
    id: number;
    name: string;
    url: string;
    avatarUrl: string;
}