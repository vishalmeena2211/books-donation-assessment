import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/lib/types";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import { userApis } from "@/lib/apis"; // Adjust the import path as necessary
import { setUser } from "@/redux/Slices/profileSlice";
import { FormState } from "@/lib/types";
import { z } from "zod";

export function DonorInfoForm({ setFormState }: { setFormState: React.Dispatch<React.SetStateAction<FormState>> }) {
  const { user } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();
  const [error, setError] = useState<{ phone: string; email: string; name: string }>({
    phone: "",
    email: "",
    name: ""
  });

  const [formData, setFormData] = useState<User>({
    name: user?.name ?? "",
    phone: user?.phone ?? "",
    email: user?.email ?? ""
  });

  const handleChange = (field: keyof User, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateName = (name: string): boolean => {
    if (name.trim() === "") {
      setError((prev) => ({ ...prev, name: "Name cannot be empty" }));
      toast({ title: "Validation Error", description: "Name cannot be empty" });
      return false;
    }
    return true;
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(phone)) {
      setError((prev) => ({ ...prev, phone: "Please enter a valid phone number" }));
      setTimeout(() => setError((prev) => ({ ...prev, phone: "" })), 3000); // Clear the error message after 3 seconds
      toast({ title: "Validation Error", description: "Please enter a valid phone number" });
      return false;
    }
    return true;
  };

  const validateEmail = (email: string): boolean => {
    const emailSchema = z.string().email();
    if (!emailSchema.safeParse(email).success) {
      setError((prev) => ({ ...prev, email: "Please enter a valid email" }));
      setTimeout(() => setError((prev) => ({ ...prev, email: "" })), 3000); // Clear the error message after 3 seconds
      toast({ title: "Validation Error", description: "Please enter a valid email" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateName(formData.name) || !validatePhone(formData.phone) || !validateEmail(formData.email)) {
      return;
    }

    try {
      const res = await axios.put(
        userApis.updateUserById,
        {
          name: formData.name,
          phone: formData.phone
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      const updatedUser = {
        name: res.data.name,
        phone: res.data.phone,
        email: res.data.email
      };

      dispatch(setUser(updatedUser));
      setFormData(updatedUser);
      setFormState((prev) => ({ ...prev, name: updatedUser.name, phone: updatedUser.phone }));

      toast({
        title: "Details Updated Successfully",
        description: "Your information has been updated successfully."
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Your Info Save Failed",
        description: "An error occurred while saving your information."
      });
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
        {error.name && <span>{error.name}</span>}
      </div>
      <div className="flex flex-col">
        <Label htmlFor="phone" className="mb-2">Phone</Label>
        <Input
          id="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
        {error.phone && <span>{error.phone}</span>}
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
        {error.email && <span>{error.email}</span>}
      </div>
      <Button type="submit" className="w-fit">Save</Button>
    </form>
  );
}
