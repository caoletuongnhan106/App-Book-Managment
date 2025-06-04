export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  quantity: number;
  category: string;
  isAvailable: boolean;
  bookCondition: 'new' | 'used';
}