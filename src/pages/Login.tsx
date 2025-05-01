
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, userRole } = useAuth();
  const { toast } = useToast();

  const from = location.state?.from?.pathname || `/${userRole}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password, userRole);
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      navigate(from, { replace: true });
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid credentials. Try again.",
        variant: "destructive",
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-hostel-primary">Login</h1>
          <p className="text-gray-600 mt-2">
            {userRole === "admin" ? "Admin Access" : "PG Guest Access"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
                placeholder={userRole === "admin" ? "admin@example.com" : "guest@example.com"}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                placeholder={userRole === "admin" ? "admin" : "guest"}
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-hostel-primary hover:bg-hostel-secondary"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </div>

          <div className="text-center">
            <button
              type="button"
              className="text-sm text-hostel-primary hover:text-hostel-secondary"
              onClick={() => navigate("/role-selection")}
            >
              Back to Role Selection
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
