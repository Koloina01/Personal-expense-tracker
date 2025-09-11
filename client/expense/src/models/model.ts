export type ExpenseType = "ONE_TIME" | "RECURRING";

export interface User {
  id: number;
  fullName: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  budget: string;   
  summary: string;
  expenses?: Expense[];
  incomes?: Income[];
  receiptUploads?: ReceiptUpload[];
  userCategoryBudgets?: UserCategoryBudget[];
}


export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;

  expenses?: Expense[];
  userCategoryBudgets?: UserCategoryBudget[];
}


export interface Expense {
  id: number;
  amount: string;        
  date?: string;         
  categoryId: number;
  description?: string;
  type: ExpenseType;
  creationDate: string;
  startDate?: string;
  endDate?: string;
  userId: number;
  receiptUploadId?: number;

  category?: Category;
  user?: User;
  receiptUpload?: ReceiptUpload;
}


export interface Income {
  id: number;
  amount: string; 
  date: string;
  source: string;
  description?: string;
  creationDate: string;
  userId: number;

  user?: User;
}


export interface ReceiptUpload {
  id: number;
  filename: string;
  url: string;
  contentType: string;
  size: number;
  uploadedAt: string;
  userId: number;

  user?: User;
  expenses?: Expense[];
}


export interface UserCategoryBudget {
  id: number;
  userId: number;
  categoryId: number;
  budget: string;       

  user?: User;
  category?: Category;
}

