const baseUrl = 'http://localhost:5000';

export const authApis = {
    login: `${baseUrl}/api/v1/auth/login`,
    signup: `${baseUrl}/api/v1/auth/register`,
};

export const userApis = {
    getUserById: `${baseUrl}/api/v1/users`,
    updateUserById: `${baseUrl}/api/v1/users`,
    deleteUserById: (id: string) => `${baseUrl}/api/v1/users/${id}`,
};

export const bookApis = {
    getAllBooksOfUser: `${baseUrl}/api/v1/books`,
    createBook: `${baseUrl}/api/v1/books`,
    updateBook: (id: string) => `${baseUrl}/api/v1/books/${id}`,
    deleteBook: (id: string) => `${baseUrl}/api/v1/books/${id}`,
    reorderBooks: (id: string) => `${baseUrl}/api/v1/books/reorder/${id}`,
};