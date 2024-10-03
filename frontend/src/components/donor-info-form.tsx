import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormState } from "@/lib/types";

interface DonorInfoFormProps {
  name: string;
  phone: string;
  email: string;
  onChange: (field: keyof FormState, value: string) => void;
}

export function DonorInfoForm({ name, phone, email, onChange }: DonorInfoFormProps) {
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-6 mb-6">
      <div className="flex flex-col">
        <Label htmlFor="name" className="mb-2">Name</Label>
        <Input
          id="name"
          placeholder="Name"
          value={name}
          onChange={(e) => onChange("name", e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="phone" className="mb-2">Phone</Label>
        <Input
          id="phone"
          placeholder="Phone"
          value={phone}
          onChange={(e) => onChange("phone", e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="email" className="mb-2">Email</Label>
        <Input
          id="email"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => onChange("email", e.target.value)}
        />
      </div>
    </div>
  );
}