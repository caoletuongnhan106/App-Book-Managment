import axios from 'axios';

export interface Loan {
  id: number;
  userId: number;
  userName: string;
  bookId: number;
  bookTitle: string;
  loanDate: string;
  returnDate?: string;
}

const API_URL = '/api/loans';

export const loanApi = {
  getLoansByUser: async (userId: number): Promise<Loan[]> => {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  },
  borrowBook: async (userId: number, bookId: number): Promise<Loan> => {
    const response = await axios.post(`${API_URL}/borrow`, { userId, bookId });
    return response.data;
  },
  returnBook: async (loanId: number): Promise<void> => {
    await axios.post(`${API_URL}/return`, { loanId });
  },
};