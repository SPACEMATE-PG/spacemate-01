import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, User, Lock, Shield, Users, UserCheck, ArrowLeft, UserPlus, ChevronRight, ChevronLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { AdminSubRole, UserRole } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Login = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);
  const [selectedAdminSubRole, setSelectedAdminSubRole] = useState<AdminSubRole | null>(null);
  
  // Registration form state
  const [registrationStep, setRegistrationStep] = useState(1);
  const [isRegisteringAsAdmin, setIsRegisteringAsAdmin] = useState(false);
  const [signupForm, setSignupForm] = useState({
    // Personal & Authentication
    fullName: "",
    mobile: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    profilePicture: null as File | null,
    
    // PG/Hostel Details
    pgName: "",
    pgType: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    mapLocation: "",
    numberOfBranches: "1",
    joinDate: "",
    endDate: "",
    emergencyPhone: "",
    
    // Government and Legal Documents
    idProofType: "",
    idProofFile: null as File | null,
    propertyProofType: "",
    propertyProofFile: null as File | null,
    gstin: "",
    
    // Initial PG Setup
    roomCount: "",
    bedCapacity: "",
    hasAC: false,
    facilities: [] as string[],
    monthlyRent: "",
    securityDeposit: "",
    hasMeals: false,
    
    // Subscription Plan
    planType: "monthly",
    pgCount: "1",
    
    // Staff Details
    wardenName: "",
    wardenContact: "",
    emergencyContact: "",
    
    // Asset Inventory
    assetBeds: "",
    assetFans: "",
    enableServiceRequests: true,
    
    // Terms and Conditions
    agreeToTerms: false,
  });
  
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

  // Ensure Super Admin always uses login tab
  useEffect(() => {
    if (userRole === UserRole.ADMIN && selectedAdminSubRole === AdminSubRole.SUPER_ADMIN && activeTab === "signup") {
      setActiveTab("login");
    }
  }, [userRole, selectedAdminSubRole, activeTab]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    console.log("Login attempt - email:", email, "userRole:", userRole, "selectedAdminSubRole:", selectedAdminSubRole);

    try {
      if (userRole === UserRole.ADMIN && selectedAdminSubRole) {
        console.log("Logging in as admin with sub-role:", selectedAdminSubRole);
        await login(email, password, UserRole.ADMIN, selectedAdminSubRole);
        
        // Handle different admin sub-role redirections
        if (selectedAdminSubRole === AdminSubRole.SUPER_ADMIN) {
          toast({
            title: "Login successful",
            description: "Welcome back, Super Admin!",
          });
          console.log("Redirecting to /super-admin");
          navigate("/super-admin", { replace: true });
        } else if (selectedAdminSubRole === AdminSubRole.PG_ADMIN) {
          toast({
            title: "Login successful",
            description: "Welcome back, PG Admin!",
          });
          console.log("Redirecting to /pg-admin");
          navigate("/pg-admin", { replace: true });
        } else if (selectedAdminSubRole === AdminSubRole.WARDEN) {
          toast({
            title: "Login successful",
            description: "Welcome back, Warden!",
          });
          console.log("Redirecting to /warden with role:", userRole, "and sub-role:", selectedAdminSubRole);
          navigate("/warden", { replace: true });
        }
      } else {
        console.log("Logging in as non-admin:", userRole);
        await login(email, password, userRole);
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        const redirectPath = userRole === UserRole.PG_GUEST ? "/guest" : "/public";
        console.log("Redirecting to:", redirectPath);
        navigate(redirectPath, { replace: true });
      }

      // Save credentials if remember password is checked
      if (rememberPassword) {
        localStorage.setItem("rememberedEmail", email);
        localStorage.setItem("rememberedPassword", password);
        localStorage.setItem("rememberedRole", userRole);
        if (selectedAdminSubRole) {
          localStorage.setItem("rememberedSubRole", selectedAdminSubRole);
        }
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
        localStorage.removeItem("rememberedRole");
        localStorage.removeItem("rememberedSubRole");
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

  const handleAdminSubRoleSelect = (subRole: AdminSubRole) => {
    setSelectedAdminSubRole(subRole);
  };

  const handleBackToRoleSelection = () => {
    setSelectedAdminSubRole(null);
  };
  
  // Registration form handlers
  const handleSignupInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSignupForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setSignupForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setSignupForm(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleFacilityToggle = (facility: string) => {
    setSignupForm(prev => {
      const facilities = [...prev.facilities];
      if (facilities.includes(facility)) {
        return { ...prev, facilities: facilities.filter(f => f !== facility) };
      } else {
        return { ...prev, facilities: [...facilities, facility] };
      }
    });
  };
  
  const handleFileUpload = (name: string, file: File | null) => {
    setSignupForm(prev => ({ ...prev, [name]: file }));
  };
  
  const nextStep = () => {
    // Guest users have only 2 registration steps
    const maxStep = isRegisteringAsAdmin ? 8 : 2;
    
    if (registrationStep < maxStep) {
      setRegistrationStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const prevStep = () => {
    if (registrationStep > 1) {
      setRegistrationStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In a real app, this would send data to your backend
      console.log("Registration data:", signupForm);
      
      // For demo purposes, we'll just show a success message
      toast({
        title: "Registration successful!",
        description: "Your account has been created. You can now login.",
      });
      
      // Reset form and go to login tab
      setSignupForm({
        fullName: "", mobile: "", emailAddress: "", password: "", confirmPassword: "", profilePicture: null,
        pgName: "", pgType: "", address: "", city: "", state: "", pincode: "", mapLocation: "", numberOfBranches: "1",
        joinDate: "", endDate: "", emergencyPhone: "",
        idProofType: "", idProofFile: null, propertyProofType: "", propertyProofFile: null, gstin: "",
        roomCount: "", bedCapacity: "", hasAC: false, facilities: [], monthlyRent: "", securityDeposit: "", hasMeals: false,
        planType: "monthly", pgCount: "1", wardenName: "", wardenContact: "", emergencyContact: "",
        assetBeds: "", assetFans: "", enableServiceRequests: true, agreeToTerms: false
      });
      setRegistrationStep(1);
      setActiveTab("login");
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "There was an error during registration. Please try again.",
        variant: "destructive",
      });
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    
    return strength;
  };
  
  const passwordStrength = calculatePasswordStrength(signupForm.password);
  const passwordMatch = signupForm.password === signupForm.confirmPassword;
  
  const getStrengthColor = (strength: number) => {
    if (strength <= 25) return "bg-red-500";
    if (strength <= 50) return "bg-orange-500";
    if (strength <= 75) return "bg-yellow-500";
    return "bg-green-500";
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
      <Card className={`w-full ${activeTab === 'login' ? 'max-w-sm' : 'max-w-3xl'} animate-fade-in shadow-xl border-hostel-accent/30`}>
        <CardHeader className="space-y-1 text-center bg-gradient-to-r from-hostel-primary to-hostel-secondary text-white rounded-t-lg p-4">
          <CardTitle className="text-xl font-bold">
            {activeTab === "login" ? "Welcome Back" : "Create Your Account"}
          </CardTitle>
          <CardDescription className="text-hostel-accent text-sm">
            {activeTab === "login" 
              ? (userRole === UserRole.ADMIN ? `Admin Access - ${selectedAdminSubRole === AdminSubRole.SUPER_ADMIN ? 'Super Admin' : selectedAdminSubRole === AdminSubRole.PG_ADMIN ? 'PG Admin' : 'Warden'}` : userRole === UserRole.PG_GUEST ? "PG Guest Access" : "Public Access")
              : "Join Space Mate to manage your PG accommodation"
            }
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4">
          <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "signup")} className="w-full">
            <TabsList className={`grid ${userRole === UserRole.ADMIN && selectedAdminSubRole === AdminSubRole.SUPER_ADMIN ? 'grid-cols-1' : 'grid-cols-2'} mb-4`}>
              <TabsTrigger value="login">Login</TabsTrigger>
              {/* Hide signup option for Super Admin */}
              {!(userRole === UserRole.ADMIN && selectedAdminSubRole === AdminSubRole.SUPER_ADMIN) && (
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="login">
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
            </TabsContent>
            
            <TabsContent value="signup">
              {/* Enhanced Registration Progress */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-medium text-sm text-gray-700">Registration Progress</h3>
                  <span className="text-xs bg-hostel-primary/10 text-hostel-primary px-2 py-1 rounded-full">
                    Step {registrationStep} of {isRegisteringAsAdmin ? 8 : 2}
                  </span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-hostel-primary to-hostel-secondary transition-all duration-500 ease-in-out"
                    style={{ width: `${registrationStep * (isRegisteringAsAdmin ? 12.5 : 50)}%` }}
                  ></div>
                </div>
                {isRegisteringAsAdmin && (
                  <div className="flex justify-between mt-1 text-[10px] text-gray-500">
                    <span>Personal</span>
                    <span>PG Details</span>
                    <span>Documents</span>
                    <span>Setup</span>
                    <span>Subscription</span>
                    <span>Staff</span>
                    <span>Assets</span>
                    <span>Terms</span>
                  </div>
                )}
              </div>
              
              <form onSubmit={handleSignupSubmit}>
                {/* Step 1: Personal & Authentication Details */}
                {registrationStep === 1 && (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <UserPlus className="h-5 w-5 text-hostel-primary" />
                        <h2 className="text-lg font-medium">Personal Details</h2>
                      </div>
                      <span className="px-3 py-1 bg-gradient-to-r from-hostel-primary to-hostel-secondary text-white text-xs rounded-full font-medium">
                        Step 1 of {isRegisteringAsAdmin ? 8 : 2}
                      </span>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-5 border border-blue-100 shadow-sm mb-5">
                      <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Account Setup
                      </h3>
                      <p className="text-sm text-gray-600">
                        Create your Space Mate account with a strong password. This information will be used for login and communication.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                        <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</Label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <Input
                            id="fullName"
                            name="fullName"
                            value={signupForm.fullName}
                            onChange={handleSignupInputChange}
                            placeholder="Enter your full name"
                            required
                            className="pl-10 py-2"
                          />
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                        <Label htmlFor="mobile" className="text-sm font-medium text-gray-700">Mobile Number</Label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                          <Input
                            id="mobile"
                            name="mobile"
                            type="tel"
                            value={signupForm.mobile}
                            onChange={handleSignupInputChange}
                            placeholder="For OTP verification"
                            required
                            className="pl-10 py-2"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                      <Label htmlFor="emailAddress" className="text-sm font-medium text-gray-700">Email Address</Label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <Input
                          id="emailAddress"
                          name="emailAddress"
                          type="email"
                          value={signupForm.emailAddress}
                          onChange={handleSignupInputChange}
                          placeholder="Enter your email address"
                          required
                          className="pl-10 py-2"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                        <Label htmlFor="signupPassword" className="text-sm font-medium text-gray-700">Password</Label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                          <Input
                            id="signupPassword"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={signupForm.password}
                            onChange={handleSignupInputChange}
                            placeholder="Create a strong password"
                            required
                            className="pl-10 pr-10 py-2"
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
                        
                        {signupForm.password && (
                          <>
                            <Progress value={passwordStrength} className={`h-1 mt-2 ${getStrengthColor(passwordStrength)}`} />
                            <div className="flex justify-between text-xs mt-1">
                              <span>Password Strength</span>
                              <span className={
                                passwordStrength <= 25 ? "text-red-500" : 
                                passwordStrength <= 50 ? "text-orange-500" :
                                passwordStrength <= 75 ? "text-yellow-500" : "text-green-500"
                              }>
                                {passwordStrength <= 25 ? "Weak" : 
                                 passwordStrength <= 50 ? "Fair" :
                                 passwordStrength <= 75 ? "Good" : "Strong"}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                        <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</Label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                          </div>
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            value={signupForm.confirmPassword}
                            onChange={handleSignupInputChange}
                            placeholder="Confirm your password"
                            required
                            className="pl-10 py-2"
                          />
                        </div>
                        {signupForm.confirmPassword && !passwordMatch && (
                          <p className="text-sm text-red-500 mt-1">Passwords do not match</p>
                        )}
                        {signupForm.confirmPassword && passwordMatch && (
                          <p className="text-sm text-green-500 mt-1 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Passwords match
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                      <Label htmlFor="profilePicture" className="text-sm font-medium text-gray-700">Profile Picture</Label>
                      <div className="mt-1 relative">
                        <Input
                          id="profilePicture"
                          name="profilePicture"
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload('profilePicture', e.target.files ? e.target.files[0] : null)}
                          className="py-2"
                        />
                        <p className="text-xs text-gray-500 mt-1">Optional: Upload a profile picture (max 5MB)</p>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-5 border border-green-100 shadow-sm">
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">Account Type</h3>
                      <RadioGroup 
                        defaultValue={isRegisteringAsAdmin ? "admin" : "guest"}
                        onValueChange={(value) => setIsRegisteringAsAdmin(value === "admin")}
                        className="flex space-x-6"
                      >
                        <div className="flex-1 bg-white rounded-md p-3 flex items-center space-x-3 cursor-pointer border border-gray-200 hover:border-hostel-primary transition-all">
                          <div className="flex items-center h-5">
                            <RadioGroupItem value="admin" id="admin" className="text-hostel-primary" />
                          </div>
                          <div className="flex flex-col">
                            <Label htmlFor="admin" className="font-medium text-gray-700">PG Admin</Label>
                            <span className="text-xs text-gray-500">For property managers</span>
                          </div>
                        </div>
                        <div className="flex-1 bg-white rounded-md p-3 flex items-center space-x-3 cursor-pointer border border-gray-200 hover:border-hostel-primary transition-all">
                          <div className="flex items-center h-5">
                            <RadioGroupItem value="guest" id="guest" className="text-hostel-primary" />
                          </div>
                          <div className="flex flex-col">
                            <Label htmlFor="guest" className="font-medium text-gray-700">Guest User</Label>
                            <span className="text-xs text-gray-500">For residents</span>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                )}

                {/* Guest Registration Step 2 */}
                {registrationStep === 2 && !isRegisteringAsAdmin && (
                  <div className="space-y-5">
                    <div className="flex items-center space-x-2 mb-4">
                      <User className="h-5 w-5 text-hostel-primary" />
                      <h2 className="text-lg font-medium">Guest Details</h2>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-5 border border-blue-100 shadow-sm">
                      <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Guest Information
                      </h3>
                      <p className="text-sm text-gray-600">
                        Please provide your accommodation details to help us serve you better.
                        This information will be used to manage your stay at the PG.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                        <Label htmlFor="pgName" className="text-sm font-medium text-gray-700">PG/Hostel Name</Label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <Input
                            id="pgName"
                            name="pgName"
                            value={signupForm.pgName}
                            onChange={handleSignupInputChange}
                            placeholder="Enter your PG or hostel name"
                            className="pl-10 py-2"
                          />
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                        <Label htmlFor="roomCount" className="text-sm font-medium text-gray-700">Room Number</Label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                          </div>
                          <Input
                            id="roomCount"
                            name="roomCount"
                            value={signupForm.roomCount}
                            onChange={handleSignupInputChange}
                            placeholder="Enter your room number"
                            className="pl-10 py-2"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                        <Label htmlFor="joinDate" className="text-sm font-medium text-gray-700">Check-in Date</Label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <Input
                            id="joinDate"
                            name="joinDate"
                            type="date"
                            value={signupForm.joinDate}
                            onChange={handleSignupInputChange}
                            className="pl-10 py-2"
                          />
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                        <Label htmlFor="endDate" className="text-sm font-medium text-gray-700">Expected Check-out Date</Label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <Input
                            id="endDate"
                            name="endDate"
                            type="date"
                            value={signupForm.endDate}
                            onChange={handleSignupInputChange}
                            className="pl-10 py-2"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Optional</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                        <Label htmlFor="emergencyContact" className="text-sm font-medium text-gray-700">Emergency Contact Person</Label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <Input
                            id="emergencyContact"
                            name="emergencyContact"
                            value={signupForm.emergencyContact}
                            onChange={handleSignupInputChange}
                            placeholder="Name and relation"
                            className="pl-10 py-2"
                          />
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                        <Label htmlFor="emergencyPhone" className="text-sm font-medium text-gray-700">Emergency Contact Number</Label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                          <Input
                            id="emergencyPhone"
                            name="emergencyPhone"
                            value={signupForm.emergencyPhone}
                            onChange={handleSignupInputChange}
                            placeholder="Enter emergency contact number"
                            className="pl-10 py-2"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-5 border border-purple-100 shadow-sm">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="agreeToTerms"
                          checked={signupForm.agreeToTerms}
                          onCheckedChange={(checked) => handleCheckboxChange('agreeToTerms', checked as boolean)}
                          className="h-5 w-5 text-hostel-primary"
                        />
                        <Label htmlFor="agreeToTerms" className="text-sm text-gray-700">
                          I agree to the <span className="text-hostel-primary hover:text-hostel-secondary cursor-pointer underline">Terms & Conditions</span> and <span className="text-hostel-primary hover:text-hostel-secondary cursor-pointer underline">Privacy Policy</span>
                        </Label>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Step 2: PG/Hostel Details - Only for admin registrations */}
                {registrationStep === 2 && isRegisteringAsAdmin && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <Users className="h-5 w-5 text-hostel-primary" />
                      <h2 className="text-lg font-medium">PG/Hostel Details</h2>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="pgName">PG/Hostel Name</Label>
                      <Input
                        id="pgName"
                        name="pgName"
                        value={signupForm.pgName}
                        onChange={handleSignupInputChange}
                        placeholder="Enter your PG or hostel name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="pgType">PG Type</Label>
                      <Select
                        value={signupForm.pgType}
                        onValueChange={(value) => handleSelectChange("pgType", value)}
                      >
                        <SelectTrigger id="pgType">
                          <SelectValue placeholder="Select PG type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="men">Men</SelectItem>
                          <SelectItem value="women">Women</SelectItem>
                          <SelectItem value="mixed">Mixed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={signupForm.address}
                        onChange={handleSignupInputChange}
                        placeholder="Complete address with landmark"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={signupForm.city}
                          onChange={handleSignupInputChange}
                          placeholder="City"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          name="state"
                          value={signupForm.state}
                          onChange={handleSignupInputChange}
                          placeholder="State"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="pincode">PIN Code</Label>
                        <Input
                          id="pincode"
                          name="pincode"
                          value={signupForm.pincode}
                          onChange={handleSignupInputChange}
                          placeholder="PIN Code"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="mapLocation">Google Map Location (Optional)</Label>
                      <Input
                        id="mapLocation"
                        name="mapLocation"
                        value={signupForm.mapLocation}
                        onChange={handleSignupInputChange}
                        placeholder="Share Google Maps link or coordinates"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="numberOfBranches">Number of Branches/PGs</Label>
                      <Select
                        value={signupForm.numberOfBranches}
                        onValueChange={(value) => handleSelectChange("numberOfBranches", value)}
                      >
                        <SelectTrigger id="numberOfBranches">
                          <SelectValue placeholder="Select number" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5+">5 or more</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Step 3: Government and Legal Documents */}
                {registrationStep === 3 && isRegisteringAsAdmin && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <Shield className="h-5 w-5 text-hostel-primary" />
                      <h2 className="text-lg font-medium">Government and Legal Documents</h2>
                    </div>
                    
                    <div className="space-y-1">
                      <Label htmlFor="idProofType">ID Proof Type</Label>
                      <Select
                        value={signupForm.idProofType}
                        onValueChange={(value) => handleSelectChange("idProofType", value)}
                      >
                        <SelectTrigger id="idProofType">
                          <SelectValue placeholder="Select ID proof type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aadhaar">Aadhaar Card</SelectItem>
                          <SelectItem value="pan">PAN Card</SelectItem>
                          <SelectItem value="business_license">Business License</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="idProofFile">Upload ID Proof</Label>
                      <Input
                        id="idProofFile"
                        name="idProofFile"
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => handleFileUpload('idProofFile', e.target.files ? e.target.files[0] : null)}
                        required
                      />
                      <p className="text-xs text-gray-500">Upload JPG, JPEG, PNG or PDF (max 5MB)</p>
                    </div>
                    
                    <div className="space-y-1">
                      <Label htmlFor="propertyProofType">Property Ownership Document Type</Label>
                      <Select
                        value={signupForm.propertyProofType}
                        onValueChange={(value) => handleSelectChange("propertyProofType", value)}
                      >
                        <SelectTrigger id="propertyProofType">
                          <SelectValue placeholder="Select property document type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ownership_proof">Property Ownership Proof</SelectItem>
                          <SelectItem value="rental_agreement">Rental Agreement</SelectItem>
                          <SelectItem value="lease_deed">Lease Deed</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="propertyProofFile">Upload Property Document</Label>
                      <Input
                        id="propertyProofFile"
                        name="propertyProofFile"
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => handleFileUpload('propertyProofFile', e.target.files ? e.target.files[0] : null)}
                        required
                      />
                      <p className="text-xs text-gray-500">Upload JPG, JPEG, PNG or PDF (max 5MB)</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="gstin">GSTIN (Optional)</Label>
                      <Input
                        id="gstin"
                        name="gstin"
                        value={signupForm.gstin}
                        onChange={handleSignupInputChange}
                        placeholder="Enter GSTIN if available"
                      />
                      <p className="text-xs text-gray-500">Required later for monetization tracking</p>
                    </div>
                  </div>
                )}
                
                {/* Step 4: Initial PG Setup - Only for admin registrations */}
                {registrationStep === 4 && isRegisteringAsAdmin && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <Users className="h-5 w-5 text-hostel-primary" />
                      <h2 className="text-lg font-medium">Initial PG Setup</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="roomCount">Number of Rooms</Label>
                        <Input
                          id="roomCount"
                          name="roomCount"
                          type="number"
                          min="1"
                          value={signupForm.roomCount}
                          onChange={handleSignupInputChange}
                          placeholder="Total number of rooms"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bedCapacity">Bed Capacity per Room</Label>
                        <Select
                          value={signupForm.bedCapacity}
                          onValueChange={(value) => handleSelectChange("bedCapacity", value)}
                        >
                          <SelectTrigger id="bedCapacity">
                            <SelectValue placeholder="Select capacity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 (Single occupancy)</SelectItem>
                            <SelectItem value="2">2 (Double sharing)</SelectItem>
                            <SelectItem value="3">3 (Triple sharing)</SelectItem>
                            <SelectItem value="4+">4 or more (Dormitory style)</SelectItem>
                            <SelectItem value="mixed">Mixed (Different rooms have different capacities)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Room Type</Label>
                      <div className="flex items-center space-x-2 mt-2">
                        <Checkbox
                          id="hasAC"
                          checked={signupForm.hasAC}
                          onCheckedChange={(checked) => handleCheckboxChange("hasAC", checked as boolean)}
                        />
                        <Label htmlFor="hasAC" className="text-sm">AC Rooms Available</Label>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-2">
                      <Label>Available Facilities</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        {['Wi-Fi', 'Washing Machine', 'Water Purifier', 'CCTV', 'Power Backup', 
                          'TV Lounge', 'Parking', 'Kitchen', 'Housekeeping', 'Security Guard'].map((facility) => (
                          <div key={facility} className="flex items-center space-x-2">
                            <Checkbox
                              id={facility}
                              checked={signupForm.facilities.includes(facility)}
                              onCheckedChange={() => handleFacilityToggle(facility)}
                            />
                            <Label htmlFor={facility} className="text-sm">{facility}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="monthlyRent">Monthly Rent (₹)</Label>
                        <Input
                          id="monthlyRent"
                          name="monthlyRent"
                          type="number"
                          min="0"
                          value={signupForm.monthlyRent}
                          onChange={handleSignupInputChange}
                          placeholder="Enter monthly rent"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="securityDeposit">Security Deposit (₹)</Label>
                        <Input
                          id="securityDeposit"
                          name="securityDeposit"
                          type="number"
                          min="0"
                          value={signupForm.securityDeposit}
                          onChange={handleSignupInputChange}
                          placeholder="Enter security deposit amount"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="hasMeals"
                          checked={signupForm.hasMeals}
                          onCheckedChange={(checked) => handleCheckboxChange("hasMeals", checked as boolean)}
                        />
                        <Label htmlFor="hasMeals">Meals Provided</Label>
                      </div>
                      {signupForm.hasMeals && (
                        <p className="text-sm text-gray-600 pl-6">
                          You'll be able to set up meal schedules after registration
                        </p>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Step 5: Subscription Plan - Only for admin registrations */}
                {registrationStep === 5 && isRegisteringAsAdmin && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <Shield className="h-5 w-5 text-hostel-primary" />
                      <h2 className="text-lg font-medium">Subscription Plan</h2>
                    </div>
                    
                    <div className="space-y-4">
                      <Label>Choose Plan Type</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div 
                          className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-hostel-primary ${signupForm.planType === 'monthly' ? 'border-hostel-primary bg-hostel-accent/10' : 'border-gray-200'}`}
                          onClick={() => handleSelectChange("planType", "monthly")}
                        >
                          <div className="font-medium">Monthly</div>
                          <div className="text-sm text-gray-600">Pay month-to-month</div>
                          <div className="text-lg font-bold mt-2">₹499/month</div>
                          <div className="text-xs text-gray-500">per PG</div>
                        </div>
                        
                        <div 
                          className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-hostel-primary ${signupForm.planType === 'six-month' ? 'border-hostel-primary bg-hostel-accent/10' : 'border-gray-200'}`}
                          onClick={() => handleSelectChange("planType", "six-month")}
                        >
                          <div className="font-medium">Six-Month</div>
                          <div className="text-sm text-gray-600">Save 10%</div>
                          <div className="text-lg font-bold mt-2">₹449/month</div>
                          <div className="text-xs text-gray-500">₹2,694 billed every 6 months</div>
                        </div>
                        
                        <div 
                          className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-hostel-primary ${signupForm.planType === 'yearly' ? 'border-hostel-primary bg-hostel-accent/10' : 'border-gray-200'}`}
                          onClick={() => handleSelectChange("planType", "yearly")}
                        >
                          <div className="font-medium">Yearly</div>
                          <div className="text-sm text-gray-600">Save 20%</div>
                          <div className="text-lg font-bold mt-2">₹399/month</div>
                          <div className="text-xs text-gray-500">₹4,788 billed annually</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="pgCount">Number of PGs to be Managed</Label>
                      <Select
                        value={signupForm.pgCount}
                        onValueChange={(value) => handleSelectChange("pgCount", value)}
                      >
                        <SelectTrigger id="pgCount">
                          <SelectValue placeholder="Select PG count" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 PG</SelectItem>
                          <SelectItem value="2">2 PGs</SelectItem>
                          <SelectItem value="3">3 PGs</SelectItem>
                          <SelectItem value="4">4 PGs</SelectItem>
                          <SelectItem value="5+">5 or more PGs</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-500 mt-2">
                        Subscription cost is per PG. Total cost: ₹{
                          signupForm.planType === 'monthly' ? 499 : 
                          signupForm.planType === 'six-month' ? 449 : 399
                        } × {signupForm.pgCount === "5+" ? "5+" : signupForm.pgCount} PGs
                      </p>
                    </div>
                    
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h3 className="text-sm font-medium mb-2">Payment Information</h3>
                      <p className="text-sm text-gray-600">
                        Payment will be collected after registration through our secure payment gateway.
                        We accept UPI, credit/debit cards, and net banking options.
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Step 6: Staff Details - Only for admin registrations */}
                {registrationStep === 6 && isRegisteringAsAdmin && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <UserCheck className="h-5 w-5 text-hostel-primary" />
                      <h2 className="text-lg font-medium">Staff Details (Optional)</h2>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg mb-4">
                      <p className="text-sm text-gray-600">
                        Add details of your warden or other key staff who will help manage your PG.
                        You can also add more staff members after registration.
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="wardenName">Warden Name</Label>
                        <Input
                          id="wardenName"
                          name="wardenName"
                          value={signupForm.wardenName}
                          onChange={handleSignupInputChange}
                          placeholder="Enter warden's name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="wardenContact">Warden Contact Number</Label>
                        <Input
                          id="wardenContact"
                          name="wardenContact"
                          value={signupForm.wardenContact}
                          onChange={handleSignupInputChange}
                          placeholder="Enter warden's contact number"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContact">Emergency Contact Person</Label>
                        <Input
                          id="emergencyContact"
                          name="emergencyContact"
                          value={signupForm.emergencyContact}
                          onChange={handleSignupInputChange}
                          placeholder="Enter emergency contact person"
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Step 7: Asset Inventory - Only for admin registrations */}
                {registrationStep === 7 && isRegisteringAsAdmin && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <Users className="h-5 w-5 text-hostel-primary" />
                      <h2 className="text-lg font-medium">Asset Inventory</h2>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg mb-4">
                      <p className="text-sm text-gray-600">
                        Initialize your PG asset inventory. This will help you track and manage
                        your assets effectively. You can update this information later.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="assetBeds">Number of Beds</Label>
                        <Input
                          id="assetBeds"
                          name="assetBeds"
                          type="number"
                          min="0"
                          value={signupForm.assetBeds}
                          onChange={handleSignupInputChange}
                          placeholder="Total number of beds"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="assetFans">Number of Fans</Label>
                        <Input
                          id="assetFans"
                          name="assetFans"
                          type="number"
                          min="0"
                          value={signupForm.assetFans}
                          onChange={handleSignupInputChange}
                          placeholder="Total number of fans"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2 mt-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="enableServiceRequests"
                          checked={signupForm.enableServiceRequests}
                          onCheckedChange={(checked) => handleCheckboxChange("enableServiceRequests", checked as boolean)}
                        />
                        <Label htmlFor="enableServiceRequests">Enable Service Requests</Label>
                      </div>
                      <p className="text-sm text-gray-600 pl-6">
                        Allow residents to submit service and maintenance requests
                      </p>
                    </div>
                    
                    <div className="mt-4 p-4 border border-dashed border-gray-300 rounded-lg">
                      <p className="text-sm text-center text-gray-600">
                        You'll be able to add more detailed asset information after registration
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Step 8: Terms and Conditions - Only for admin registrations */}
                {registrationStep === 8 && isRegisteringAsAdmin && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <Shield className="h-5 w-5 text-hostel-primary" />
                      <h2 className="text-lg font-medium">Terms and Conditions</h2>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg space-y-4 max-h-64 overflow-y-auto">
                      <h3 className="font-medium">Space Mate Platform Terms of Service</h3>
                      <p className="text-sm text-gray-600">
                        By agreeing to these terms, you acknowledge that you have read, understood, 
                        and agree to be bound by the following terms and conditions:
                      </p>
                      
                      <ol className="list-decimal pl-5 text-sm text-gray-600 space-y-2">
                        <li>You will provide accurate and complete information about your PG property.</li>
                        <li>You have the legal right to operate a PG business at the provided address.</li>
                        <li>You will maintain the confidentiality of all resident data and use it only for legitimate business purposes.</li>
                        <li>You will comply with all local housing and rental laws applicable to your property.</li>
                        <li>You understand that Space Mate charges a subscription fee as selected during registration.</li>
                        <li>You will not use the platform for any illegal or unauthorized purposes.</li>
                        <li>Space Mate reserves the right to terminate your account for violation of any terms.</li>
                        <li>All content you upload will comply with our content policy and not infringe on any third-party rights.</li>
                        <li>You understand that the platform may collect analytics data to improve services.</li>
                        <li>Payments processed through the platform are subject to our payment processing terms.</li>
                      </ol>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-4">
                      <Checkbox
                        id="agreeToTerms"
                        checked={signupForm.agreeToTerms}
                        onCheckedChange={(checked) => handleCheckboxChange("agreeToTerms", checked as boolean)}
                        required
                      />
                      <Label htmlFor="agreeToTerms" className="text-sm">
                        I agree to the platform guidelines, terms of service, privacy policy, and monetization terms
                      </Label>
                    </div>
                  </div>
                )}
                
                {/* Navigation Buttons */}
                <div className="flex justify-between space-x-4 mt-6">
                  {registrationStep > 1 && (
                    <Button
                      type="button"
                      onClick={prevStep}
                      className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 hover:border-gray-400 flex items-center justify-center space-x-2 transition-all duration-300 h-11"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span>Previous</span>
                    </Button>
                  )}
                  
                  {registrationStep < (isRegisteringAsAdmin ? 8 : 2) ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="flex-1 bg-hostel-primary hover:bg-hostel-secondary transition-all duration-300 flex items-center justify-center space-x-2 h-11"
                    >
                      <span>Continue</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isLoading || !signupForm.agreeToTerms}
                      className="flex-1 bg-hostel-primary hover:bg-hostel-secondary transition-all duration-300 h-11 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Processing..." : "Create Account"}
                    </Button>
                  )}
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
