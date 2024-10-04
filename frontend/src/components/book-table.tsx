import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { BookEntry, FormState } from "@/lib/types";
import { BookTableRow } from "./book-table-row";
import { bookApis, userApis } from "@/lib/apis"; // Adjust the import path as necessary
import { toast } from "@/hooks/use-toast"; // Import the toast component

interface BookTableProps {
    books: BookEntry[];
    setFormState: (value: React.SetStateAction<FormState>) => void;
    validateForm: () => boolean;
}

export function BookTable({
    books,
    setFormState,
    validateForm
}: BookTableProps) {
    const [editingId, setEditingId] = useState<string | null>(null);

    // Function to handle adding a new book
    const handleAddBook = async () => {
        if (validateForm()) {
            const newBook: BookEntry = { _id: Date.now().toString(), title: "", author: "", genre: "", year_of_publication: "", ISBN: "" };
            try {
                const response = await axios.post(bookApis.createBook, newBook, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const addedBook = response.data;
                setFormState(prev => ({ ...prev, books: [addedBook, ...prev.books] }));
                setEditingId(addedBook._id);
                toast({
                    title: "Success",
                    description: "Book added successfully.",
                });
            } catch (error) {
                console.error("Error adding book:", error);
                toast({
                    title: "Error",
                    description: "Failed to add book.",
                    variant: "destructive",
                });
            }
        } else {
            // Show validation error toast
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields correctly.",
                variant: "destructive",
            });
        }
    };

    // Function to handle saving an updated book
    const handleSave = async (updatedBook: BookEntry) => {
        try {
            const res = await axios.put(bookApis.updateBook(updatedBook._id), updatedBook, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const newUpdatedBook: BookEntry = res.data;
            setFormState(prev => ({ ...prev, books: books.map(book => book._id === newUpdatedBook._id ? newUpdatedBook : book) }));
            setEditingId(null);
            toast({
                title: "Success",
                description: "Book updated successfully.",
            });
        } catch (error) {
            console.error("Error saving book:", error);
            toast({
                title: "Error",
                description: "Failed to update book.",
                variant: "destructive",
            });
        }
    };

    // Function to handle deleting a book
    const handleDelete = async (id: string) => {
        try {
            await axios.delete(bookApis.deleteBook(id), {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setFormState(prev => ({ ...prev, books: books.filter(book => book._id !== id) }));
            toast({
                title: "Success",
                description: "Book deleted successfully.",
            });
        } catch (error) {
            console.error("Error deleting book:", error);
            toast({
                title: "Error",
                description: "Failed to delete book.",
                variant: "destructive",
            });
        }
    };

    // Function to handle moving a book to the first position
    const handleMoveToFirst = async (bookId: string) => {
        try {
            await axios.get(bookApis.reorderBooks(bookId), {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const res = await axios.get(userApis.getUserById, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
            });

            setFormState(prev => ({ ...prev, books: res.data.books }));
            toast({
                title: "Success",
                description: "Book moved to the first position successfully.",
            });
        } catch (error) {
            console.error("Error reordering books:", error);
            toast({
                title: "Error",
                description: "Failed to reorder books.",
                variant: "destructive",
            });
        }
    };

    return (
        <>
            <div className="overflow-x-auto">
                <Button onClick={handleAddBook} className="my-4">+ Add Book</Button>
                <Table className="min-w-full border border-black">
                    <TableHeader className="bg-green-600">
                        <TableRow>
                            <TableHead className="px-4 py-2 text-center font-bold underline text-white">Sr No.</TableHead>
                            <TableHead className="px-4 py-2 text-center font-bold underline text-white">Book Title</TableHead>
                            <TableHead className="px-4 py-2 text-center font-bold underline text-white">Author</TableHead>
                            <TableHead className="px-4 py-2 text-center font-bold underline text-white">Genre</TableHead>
                            <TableHead className="px-4 py-2 text-center font-bold underline text-white">Year of Publication</TableHead>
                            <TableHead className="px-4 py-2 text-center font-bold underline text-white">ISBN</TableHead>
                            <TableHead className="px-4 py-2 text-center font-bold underline text-white">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {books.map((book, index) => (
                            <BookTableRow
                                key={book._id}
                                srNo={index + 1}
                                book={book}
                                isEditing={editingId === book._id}
                                onEdit={() => setEditingId(book._id)}
                                onSave={handleSave}
                                onDelete={() => handleDelete(book._id)}
                                onMoveToFirst={() => handleMoveToFirst(book._id)}
                                isFirstRow={index === 0}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}