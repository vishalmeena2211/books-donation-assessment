export interface BookEntry {
    id: number
    title: string
    author: string
    genre: string
    year: string
    isbn: string
  }
  
  export interface FormState {
    name: string
    phone: string
    email: string
    books: BookEntry[]
  }