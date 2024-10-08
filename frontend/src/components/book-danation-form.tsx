import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { Download } from "lucide-react"
import { DonorInfoForm } from "./donor-info-form"
import { BookTable } from "./book-table"
import { FormState } from "@/lib/types"
import { useSelector } from "react-redux"
import axios from "axios"
import { RootState } from "@/redux/Store"
import { userApis } from "@/lib/apis"

export default function BookDonationForm() {

    const { user } = useSelector((state: RootState) => state.profile);
    console.log(user);
    const [formState, setFormState] = useState<FormState>({
        name: user?.name ?? "",
        phone: user?.phone ?? "",
        email: user?.email ?? "",
        books: [],
    })
    

    useEffect(() => {
        // Fetch initial data from the API
        const fetchInitialData = async () => {
            try {
                const response = await axios.get(userApis.getUserById, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })
                setFormState((pre) => ({ ...pre, books: response.data.books }))
            } catch (error) {
                console.log(error)
                toast({
                    title: "Error",
                    description: "Failed to fetch initial data.",
                    variant: "destructive",
                })
            }
        }

        fetchInitialData()
    }, [])


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
                <Button variant="outline" className="ml-2">
                    Save Data
                </Button>
            </div>
            <DonorInfoForm setFormState={setFormState} />
            <BookTable
                books={formState.books}
                setFormState={setFormState}
                validateForm={validateForm}
            />
        </div>
    )
}