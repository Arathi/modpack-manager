export default interface Mod {
  id: number;
  name: string;
  summary: string;
  avatarUrl: string;
  author: Author;
}

interface Author {
  id: number;
  name: string;
}
