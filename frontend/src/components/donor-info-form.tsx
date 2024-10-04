import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/lib/types";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import { userApis } from "@/lib/apis"; // Adjust the import path as necessary

export function DonorInfoForm() {
  const { user } = useSelector((state: RootState) => state.profile);

  const [formData, setFormData] = useState<User>({
    name: user?.name ?? "",
    phone: user?.phone ?? "",
    email: user?.email ?? "",
  });

  const handleChange = (field: keyof User, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(userApis.updateUserById, {
        name: formData.name,
        phone: formData.phone,
      },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        }
      )
      toast({
        title: "Detailed Updated Sucessfully",
        description: "Your information has been updated successfully.",
      })
    } catch (error) {
      console.error(error);
      toast({
        title: "Your Info Save Failed",
        description: "An error occurred while saving yours information.",
      })
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-3 grid-cols-1 gap-6 mb-6">
      <div className="flex flex-col">
        <Label htmlFor="name" className="mb-2">Name</Label>
        <Input
          id="name"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="phone" className="mb-2">Phone</Label>
        <Input
          id="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="email" className="mb-2">Email</Label>
        <Input
          id="email"
          placeholder="Email"
          type="email"
          value={formData.email}
          readOnly
        />
      </div>
      <Button type="submit" className="w-fit">Save</Button>
    </form>
  );
}