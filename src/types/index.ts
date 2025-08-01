export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  quantity: number;
  category: string;
  isAvailable: boolean;
  bookCondition: 'new' | 'used';
  imageUrl?: string;
  description?: string;
  createdAt: string;
}

export enum RULE_ENUM {
  ADMIN = 'admin',
  USER = 'user',
}

export interface UserBase {
  email: string;
  name?: string;
  avatar?: string;
  birthYear?: string;
  role: RULE_ENUM;
}

export interface AuthUser extends UserBase {
  id: string;
}

export interface UserInList extends UserBase {
  id: number;
}

export interface TestAccount extends AuthUser {
  password: string;
}
