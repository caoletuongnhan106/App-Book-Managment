export const API_URL = '/api/loans';

export interface Loan {
  id: number;
  userId: number;
  userName: string;
  bookId: string;
  bookTitle: string;
  loanDate: string;
  returnDate?: string;
}

let mockLoans: Loan[] = [];

const getRandomLoanDate = () => {
  const today = new Date();
  const randomDays = Math.floor(Math.random() * 3) - 1;
  today.setDate(today.getDate() + randomDays);
  return today.toISOString().split('T')[0];
};

export const getLoansByUser = async (userId: number, isAdmin?: boolean): Promise<Loan[]> => {
  if (isAdmin) {
    return [...mockLoans];
  }
  return mockLoans.filter((loan) => loan.userId === userId);
};

export const borrowBook = async (
  userId: number,
  bookId: string,
  bookTitle: string,
  userName: string,
): Promise<Loan> => {
  const existingLoan = mockLoans.find((loan) => loan.bookId === bookId && !loan.returnDate);
  if (existingLoan) throw new Error('Sách đã được mượn');
  const loan: Loan = {
    id: Date.now(),
    userId,
    userName,
    bookId,
    bookTitle,
    loanDate: new Date().toISOString().split('T')[0],
  };
  mockLoans.push(loan);
  return loan;
};

export const returnBook = async (loanId: number): Promise<void> => {
  const loanIndex = mockLoans.findIndex((loan) => loan.id === loanId);
  if (loanIndex !== -1 && !mockLoans[loanIndex].returnDate) {
    mockLoans[loanIndex] = { ...mockLoans[loanIndex], returnDate: new Date().toISOString().split('T')[0] };
  } else if (loanIndex !== -1) {
    throw new Error('Sách đã được trả');
  } else {
    throw new Error('Không tìm thấy loan');
  }
};