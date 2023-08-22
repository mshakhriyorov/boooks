export interface Book {
  id: number | string | null;
  categoryId: number | string | null;
  name: string;
  image: string;
  year: number | null;
  author: string;
  description: string;
}

export interface BOOK_DATA {
  name: string;
  description: string;
  author: string;
  categoryId: number | null;
  year: number | null;
}
