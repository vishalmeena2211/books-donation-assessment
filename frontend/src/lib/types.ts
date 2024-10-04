export interface BookEntry {
  _id: string
  title: string
  author: string
  genre: string
  year_of_publication: string
  ISBN: string
}

export interface User {
  name: string
  phone: string
  email: string
}
export interface FormState extends User {
  books: BookEntry[]
}