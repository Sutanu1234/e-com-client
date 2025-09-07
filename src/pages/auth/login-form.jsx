import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom";
import API from "@/lib/api";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}) {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const res = await API.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    const payload = JSON.parse(atob(res.data.token.split(".")[1]));
    console.log(payload.roles.includes("ADMIN"));
    if (payload.roles.includes("ADMIN")) {
      navigate("/admin");
      window.location.reload()
    } else {
      navigate("/");
      toast.success("login successfull", {duration: 1500})
      setTimeout(() => {window.location.reload();}, 1000);
    }
  } catch (err) {
    console.error(err);
    toast.error("Login failed", {duration: 1500});
  }
};

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-blue-600">Welcome Back to ToyKart!</h1>
        <p className="text-muted-foreground text-sm">
          Sign in to explore a world of safe, fun, and educational toys from across India.
        </p>
      </div>
      <div className="grid gap-6">
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
          Login
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="/register" className="underline underline-offset-4 text-blue-600">
          Sign up
        </a>
      </div>
    </form>
  );
}
