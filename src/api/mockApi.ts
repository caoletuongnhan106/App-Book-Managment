import type { Book } from '../types';

export const addBookApi = async (book: Book): Promise<Book> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return book;
};

export const editBookApi = async (book: Book): Promise<Book> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return book;
};

export const deleteBookApi = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
};