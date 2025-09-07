import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import API from "@/lib/api";
import { toast } from "sonner"

export function RegisterForm({
  className,
  ...props
}) {
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
  e.preventDefault();

  const name = e.target.name.value;
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const res = await API.post("/auth/signup", { name, email, password });
    localStorage.setItem("token", res.data.token);
    navigate("/");
    toast.success("Signup successfull", {duration: 1500})
    setTimeout(() => {window.location.reload();}, 1500);
  } catch (err) {
    console.error(err);
    toast.error("Signup failed", {duration: 1500});
  }
};

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-blue-600">Join ToyKart Today!</h1>
        <p className="text-muted-foreground text-sm">
          Sign up to discover and shop from a wide range of handcrafted and innovative toys for children of all ages.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="name" className="text-blue-600">Full Name</Label>
          <Input id="name" type="text" placeholder="Enter your full name" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email" className="text-blue-600">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email address" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password" className="text-blue-600">Password</Label>
            <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline text-blue-600">
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" placeholder="Enter your password" required />
        </div>
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Sign Up
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="underline underline-offset-4 text-blue-600">
          Log in
        </a>
      </div>
    </form>
  );
}
