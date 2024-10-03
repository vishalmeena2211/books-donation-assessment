"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { BookEntry } from "@/lib/types"
import { BookTableRow } from "./book-table-row"

interface BookTableProps {
    books: BookEntry[]
    onAddBook: (book: BookEntry) => void
    onUpdateBook: (book: BookEntry) => void
    onDeleteBook: (id: number) => void
    onReorderBooks: (books: BookEntry[]) => void
    validateForm: () => boolean
}

export function BookTable({
    books,
    onAddBook,
    onUpdateBook,
    onDeleteBook,
    onReorderBooks,
    validateForm
}: BookTableProps) {
    const [editingId, setEditingId] = useState<number | null>(null)

    const handleAddBook = () => {
        if (validateForm()) {
            const newBook: BookEntry = { id: Date.now(), title: "", author: "", genre: "", year: "", isbn: "" }
            onAddBook(newBook)
            setEditingId(newBook.id)
        }
    }

    const handleSave = (updatedBook: BookEntry) => {
        onUpdateBook(updatedBook)
        setEditingId(null)
    }

    const handleMoveToFirst = (bookId: number) => {
        const bookToMove = books.find(book => book.id === bookId)
        if (bookToMove) {
            const newBooks = [bookToMove, ...books.filter(book => book.id !== bookId)]
            onReorderBooks(newBooks)
        }
    }

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
                                key={book.id}
                                srNo={index + 1}
                                book={book}
                                isEditing={editingId === book.id}
                                onEdit={() => setEditingId(book.id)}
                                onSave={handleSave}
                                onDelete={() => onDeleteBook(book.id)}
                                onMoveToFirst={() => handleMoveToFirst(book.id)}
                                isFirstRow={index === 0}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}