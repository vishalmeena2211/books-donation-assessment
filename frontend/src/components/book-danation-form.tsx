"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { Download } from "lucide-react"
import { DonorInfoForm } from "./donor-info-form"
import { BookTable } from "./book-table"
import { BookEntry, FormState } from "@/lib/types"

export default function BookDonationForm() {
    const [formState, setFormState] = useState<FormState>({
        name: "",
        phone: "",
        email: "",
        books: [],
    })

    const handleDonorInfoChange = (field: keyof FormState, value: string) => {
        setFormState(prev => ({ ...prev, [field]: value }))
    }

    const handleAddBook = (book: BookEntry) => {
        setFormState(prev => ({ ...prev, books: [book, ...prev.books] }))
    }

    const handleUpdateBook = (updatedBook: BookEntry) => {
        setFormState(prev => ({
            ...prev,
            books: prev.books.map(book => book.id === updatedBook.id ? updatedBook : book)
        }))
    }

    const handleDeleteBook = (id: number) => {
        setFormState(prev => ({
            ...prev,
            books: prev.books.filter(book => book.id !== id)
        }))
    }

    const handleReorderBooks = (newBooks: BookEntry[]) => {
        setFormState(prev => ({ ...prev, books: newBooks }))
    }

    const validateForm = (): boolean => {
        if (!formState.name.trim() || !formState.phone.trim() || !/^\S+@\S+\.\S+$/.test(formState.email)) {
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields correctly.",
                variant: "destructive",
            })
            return false
        }
        return true
    }

    const dumpStateAsJson = () => {
        if (!validateForm()) {
            return
        }
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formState, null, 2))
        const downloadAnchorNode = document.createElement('a')
        downloadAnchorNode.setAttribute("href", dataStr)
        downloadAnchorNode.setAttribute("download", "book_donation_state.json")
        document.body.appendChild(downloadAnchorNode)
        downloadAnchorNode.click()
        downloadAnchorNode.remove()
    }

    return (
        <div className="container mx-auto p-4">

            <h1 className="text-2xl font-bold mb-4">DONATE A BOOK</h1>
            <div className="mt-4 flex justify-end">
                <Button onClick={dumpStateAsJson} variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download State
                </Button>
            </div>
            <DonorInfoForm
                name={formState.name}
                phone={formState.phone}
                email={formState.email}
                onChange={handleDonorInfoChange}
            />
            <BookTable
                books={formState.books}
                onAddBook={handleAddBook}
                onUpdateBook={handleUpdateBook}
                onDeleteBook={handleDeleteBook}
                onReorderBooks={handleReorderBooks}
                validateForm={validateForm}
            />

        </div>
    )
}