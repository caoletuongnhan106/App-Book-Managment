import type { Book } from '../types';
import {type User } from '../context/UserContext';

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

export const editUserApi = async (user: User): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(user), 500); 
  });
};