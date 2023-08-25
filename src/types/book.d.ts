export interface Book {
  id: number;
  categoryId: number;
  name: string;
  files: Array;
  year: number | null;
  author: string;
  description: string;
  isSaved?: boolean
}

export interface BOOK_DATA {
  name: string;
  description: string;
  author: string;
  categoryId: number | null;
  year: number | null;
}
