import { useRef, useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, Check, ArrowUp } from "lucide-react"
import { BookEntry } from "@/lib/types"

interface BookTableRowProps {
    book: BookEntry
    srNo: number
    isEditing: boolean
    onEdit: () => void
    onSave: (book: BookEntry) => void
    onDelete: () => void
    onMoveToFirst: () => void
    isFirstRow: boolean
}

export function BookTableRow({
    book,
    srNo,
    isEditing,
    onEdit,
    onSave,
    onDelete,
    onMoveToFirst,
    isFirstRow
}: BookTableRowProps) {
    const [editedBook, setEditedBook] = useState(book)
    const [errors, setErrors] = useState<{ [key in keyof BookEntry]?: string }>({})
    const firstCellRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (isEditing && firstCellRef.current) {
            firstCellRef.current.focus()
        }
    }, [isEditing])

    useEffect(() => {
        setEditedBook(book)
    }, [book])

    const handleChange = (field: keyof BookEntry, value: string) => {
        setEditedBook(prev => ({ ...prev, [field]: value }))
        setErrors(prev => ({ ...prev, [field]: undefined })) // Clear error for the field
    }

    const validate = () => {
        const newErrors: { [key in keyof BookEntry]?: string } = {}
        if (!editedBook.title) newErrors.title = "Title is required"
        if (!editedBook.author) newErrors.author = "Author is required"
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSave = () => {
        if (validate()) {
            onSave(editedBook)
        }
    }

    return (
        <TableRow className="border-b">
            <TableCell className="border-r p-2 text-center">
                {srNo}
            </TableCell>
            <TableCell className="border-r p-2 text-center">
                {isEditing ? (
                    <>
                        <Input
                            ref={firstCellRef}
                            value={editedBook.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                        />
                        {errors.title && <span className="text-red-500">{errors.title}</span>}
                    </>
                ) : (
                    book.title
                )}
            </TableCell>
            <TableCell className="border-r p-2 text-center">
                {isEditing ? (
                    <>
                        <Input
                            value={editedBook.author}
                            onChange={(e) => handleChange("author", e.target.value)}
                        />
                        {errors.author && <span className="text-red-500">{errors.author}</span>}
                    </>
                ) : (
                    book.author
                )}
            </TableCell>
            <TableCell className="border-r p-2 text-center">
                {isEditing ? (
                    <>
                        <Input
                            value={editedBook.genre}
                            onChange={(e) => handleChange("genre", e.target.value)}
                        />
                        {errors.genre && <span className="text-red-500">{errors.genre}</span>}
                    </>
                ) : (
                    book.genre
                )}
            </TableCell>
            <TableCell className="border-r p-2 text-center">
                {isEditing ? (
                    <>
                        <Input
                            value={editedBook.year_of_publication}
                            onChange={(e) => handleChange("year_of_publication", e.target.value)}
                        />
                        {errors.year_of_publication && <span className="text-red-500">{errors.year_of_publication}</span>}
                    </>
                ) : (
                    book.year_of_publication
                )}
            </TableCell>
            <TableCell className="border-r p-2 text-center">
                {isEditing ? (
                    <>
                        <Input
                            value={editedBook.ISBN}
                            onChange={(e) => handleChange("ISBN", e.target.value)}
                        />
                        {errors.ISBN && <span className="text-red-500">{errors.ISBN}</span>}
                    </>
                ) : (
                    book.ISBN
                )}
            </TableCell>
            <TableCell className="p-2 text-center">
                {isEditing ? (
                    <>
                        <Button variant="ghost" size="icon" onClick={handleSave}>
                            <Check className="h-4 w-4" />
                        </Button>
                        {!isFirstRow && (
                            <Button variant="ghost" size="icon" onClick={onMoveToFirst}>
                                <ArrowUp className="h-4 w-4" />
                            </Button>
                        )}
                    </>
                ) : (
                    <Button variant="ghost" size="icon" onClick={onEdit}>
                        <Pencil className="h-4 w-4" />
                    </Button>
                )}
                <Button variant="ghost" size="icon" onClick={onDelete}>
                    <Trash2 className="h-4 w-4" />
                </Button>
            </TableCell>
        </TableRow>
    )
}