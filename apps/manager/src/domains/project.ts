export type Project = {
  id: number | string;
  name: string;
  slug: string;
  description: string;
  author: Author;
  avatar: string;
  categories: Category[];
  createAt: number;
  updateAt: number;
};

type Author = {
  id: number | string;
  name: string;
}

export type Category = {
  id: number | string;
  icon: string;
  name: string;
  slug: string;
}
