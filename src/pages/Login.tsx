import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, User, Lock, Shield, Users, UserCheck, ArrowLeft, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AdminSubRole, UserRole } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);
  const [selectedAdminSubRole, setSelectedAdminSubRole] = useState<AdminSubRole | null>(null);
  const navigate = useNavigate();
  const { login, userRole } = useAuth();
  const { toast } = useToast();

  const adminSubRoles = [
    {
      id: AdminSubRole.SUPER_ADMIN,
      title: "Super Admin",
      description: "Application owner with monetization access",
      icon: Shield,
    },
    {
      id: AdminSubRole.PG_ADMIN,
      title: "PG Admin", 
      description: "Full PG management control",
      icon: Users,
    },
    {
      id: AdminSubRole.WARDEN,
      title: "Warden",
      description: "Limited access for maintenance tasks",
      icon: UserCheck,
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (userRole === UserRole.ADMIN && selectedAdminSubRole) {
        await login(email, password, UserRole.ADMIN, selectedAdminSubRole);
        
        // Handle different admin sub-role redirections
        if (selectedAdminSubRole === AdminSubRole.SUPER_ADMIN) {
          toast({
            title: "Login successful",
            description: "Welcome back, Super Admin!",
          });
          navigate("/super-admin", { replace: true });
        } else if (selectedAdminSubRole === AdminSubRole.PG_ADMIN) {
          toast({
            title: "Login successful",
            description: "Welcome back, PG Admin!",
          });
          navigate("/pg-admin", { replace: true });
        } else {
          toast({
            title: "Login successful",
            description: "Welcome back, Warden!",
          });
          navigate("/admin", { replace: true });
        }
      } else {
        await login(email, password, userRole);
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        const redirectPath = userRole === UserRole.PG_GUEST ? "/guest" : "/public";
        navigate(redirectPath, { replace: true });
      }

      // Save credentials if remember password is checked
      if (rememberPassword) {
        localStorage.setItem("rememberedEmail", email);
        localStorage.setItem("rememberedPassword", password);
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
      }
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

  const handleGmailLogin = async () => {
    // TODO: Implement Gmail OAuth login
    toast({
      title: "Coming soon",
      description: "Gmail login will be available soon!",
    });
  };

  const handleAdminSubRoleSelect = (subRole: AdminSubRole) => {
    setSelectedAdminSubRole(subRole);
  };

  const handleBackToRoleSelection = () => {
    setSelectedAdminSubRole(null);
  };

  // Show admin sub-role selection first for admin users
  if (userRole === UserRole.ADMIN && !selectedAdminSubRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 pt-safe pb-safe">
        <Card className="w-full max-w-sm animate-fade-in shadow-xl border-hostel-accent/30">
          <CardHeader className="space-y-1 text-center bg-gradient-to-r from-hostel-primary to-hostel-secondary text-white rounded-t-lg p-4">
            <CardTitle className="text-xl font-bold">Welcome Back</CardTitle>
            <CardDescription className="text-hostel-accent text-sm">
              Select Your Admin Role
            </CardDescription>
          </CardHeader>

          <CardContent className="p-4">
            <div className="space-y-3">
              {adminSubRoles.map((subRole) => {
                const IconComponent = subRole.icon;
                return (
                  <div
                    key={subRole.id}
                    className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex items-center space-x-3 hover:border-hostel-primary active:scale-95"
                    onClick={() => handleAdminSubRoleSelect(subRole.id)}
                  >
                    <div className="w-10 h-10 rounded-full bg-hostel-accent flex items-center justify-center flex-shrink-0">
                      <IconComponent className="text-hostel-primary w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 text-sm truncate">{subRole.title}</h3>
                      <p className="text-xs text-gray-600 line-clamp-2">{subRole.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 text-center">
              <button
                type="button"
                className="text-xs text-hostel-primary hover:text-hostel-secondary underline transition-colors"
                onClick={() => navigate("/role-selection")}
              >
                Back to Role Selection
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 pt-safe pb-safe">
      <Card className="w-full max-w-sm animate-fade-in shadow-xl border-hostel-accent/30">
        <CardHeader className="space-y-1 text-center bg-gradient-to-r from-hostel-primary to-hostel-secondary text-white rounded-t-lg p-4">
          <CardTitle className="text-xl font-bold">Welcome Back</CardTitle>
          <CardDescription className="text-hostel-accent text-sm">
            {userRole === UserRole.ADMIN ? `Admin Access - ${selectedAdminSubRole === AdminSubRole.SUPER_ADMIN ? 'Super Admin' : selectedAdminSubRole === AdminSubRole.PG_ADMIN ? 'PG Admin' : 'Warden'}` : userRole === UserRole.PG_GUEST ? "PG Guest Access" : "Public Access"}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              <div className="relative">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={16} className="text-gray-500" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 bg-white text-sm h-11"
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={16} className="text-gray-500" />
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 pr-10 bg-white text-sm h-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff size={16} className="text-gray-500" />
                    ) : (
                      <Eye size={16} className="text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberPassword}
                  onCheckedChange={(checked) => setRememberPassword(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm text-gray-600">
                  Remember password
                </Label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-hostel-primary hover:bg-hostel-secondary transition-all duration-300 h-11 text-sm font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Login"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-11 text-sm font-medium"
              onClick={handleGmailLogin}
            >
              <Mail className="mr-2 h-4 w-4" />
              Continue with Gmail
            </Button>

            <div className="flex justify-between items-center mt-3">
              {userRole === UserRole.ADMIN && (
                <button
                  type="button"
                  className="text-xs text-hostel-primary hover:text-hostel-secondary underline transition-colors flex items-center space-x-1"
                  onClick={handleBackToRoleSelection}
                >
                  <ArrowLeft size={14} />
                  <span>Change Role</span>
                </button>
              )}
              <button
                type="button"
                className="text-xs text-hostel-primary hover:text-hostel-secondary underline transition-colors ml-auto"
                onClick={() => navigate("/role-selection")}
              >
                Back to Role Selection
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
