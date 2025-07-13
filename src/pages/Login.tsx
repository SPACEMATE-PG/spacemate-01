import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Shield, 
  KeyRound, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  Users, 
  UserCheck,
  ChevronRight, 
  Building, 
  Calendar, 
  Phone,
  FileCheck,
  Home,
  BedDouble,
  CreditCard,
  Check,
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { UserRole, AdminSubRole } from "@/types";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdminSubRoleSelection from "@/components/AdminSubRoleSelection";

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
  const [signupRole, setSignupRole] = useState<UserRole | null>(null);
  const [signupForm, setSignupForm] = useState({
    // Personal & Authentication
    fullName: "",
    mobile: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    profilePicture: null as File | null,
    
    // PG/Hostel Details (Admin only)
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
    
    // Government and Legal Documents (Admin only)
    idProofType: "",
    idProofFile: null as File | null,
    propertyProofType: "",
    propertyProofFile: null as File | null,
    gstin: "",
    
    // Initial PG Setup (Admin only)
    roomCount: "",
    bedCapacity: "",
    hasAC: false,
    facilities: [] as string[],
    monthlyRent: "",
    securityDeposit: "",
    hasMeals: false,
    
    // Subscription Plan (Admin only)
    planType: "monthly",
    pgCount: "1",
    
    // Staff Details (Admin only)
    wardenName: "",
    wardenContact: "",
    emergencyContact: "",
    
    // Asset Inventory (Admin only)
    assetBeds: "",
    assetFans: "",
    enableServiceRequests: true,
    
    // Guest Details (Guest only)
    guestRoomNumber: "",
    guestJoinDate: "",
    guestEndDate: "",
    guestPgName: "",
    guestIdProof: "",
    guestEmergencyContact: "",
    
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
    
    try {
      if (!userRole) {
        toast({
          title: "Error",
          description: "Please select a user role first",
          variant: "destructive",
        });
        return;
      }
      
      console.log("Attempting login with:", { email, userRole, selectedAdminSubRole });
      
      await login(email, password, userRole, selectedAdminSubRole || undefined);
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      
      // Route based on user role and sub-role
      if (userRole === UserRole.ADMIN) {
        switch (selectedAdminSubRole) {
          case AdminSubRole.SUPER_ADMIN:
            navigate("/super-admin", { replace: true });
            break;
          case AdminSubRole.PG_ADMIN:
            navigate("/pg-admin", { replace: true });
            break;
          case AdminSubRole.WARDEN:
            navigate("/warden", { replace: true });
            break;
          default:
            navigate("/admin", { replace: true });
        }
      } else if (userRole === UserRole.PG_GUEST) {
        navigate("/guest", { replace: true });
      } else {
        navigate("/public", { replace: true });
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

  const handleRoleSelect = (role: UserRole) => {
    setSignupRole(role);
    setRegistrationStep(2); // Move to next step after selecting role
  };
  
  const handleNextStep = () => {
    // Validate current step before proceeding
    if (registrationStep === 1) {
      // Role selection validation is handled in handleRoleSelect
      return;
    }
    
    if (registrationStep === 2) {
      // Validate personal information
      if (!signupForm.fullName || !signupForm.emailAddress || !signupForm.password || !signupForm.confirmPassword) {
        toast({
          title: "Missing Information",
          description: "Please fill out all required fields",
          variant: "destructive",
        });
        return;
      }
      
      if (signupForm.password !== signupForm.confirmPassword) {
        toast({
          title: "Password Error",
          description: "Passwords do not match",
          variant: "destructive",
        });
        return;
      }
    }
    
    // Increment step
    setRegistrationStep(prevStep => prevStep + 1);
  };
  
  const handlePrevStep = () => {
    if (registrationStep === 2 && signupRole) {
      // Go back to role selection
      setSignupRole(null);
    }
    
    setRegistrationStep(prevStep => Math.max(1, prevStep - 1));
  };
  
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For demonstration purpose, just show success and go to login
    toast({
      title: "Account created successfully",
      description: "You can now login with your credentials",
    });
    
    // Reset form and go to login tab
    setRegistrationStep(1);
    setSignupRole(null);
    setActiveTab("login");
  };
  
  // Render based on the admin sub-role selection state
  if (userRole === UserRole.ADMIN && !selectedAdminSubRole) {
    return (
      <AdminSubRoleSelection
        onSubRoleSelect={handleAdminSubRoleSelect}
        onBack={() => navigate("/role-selection")}
      />
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md animate-fade-in shadow-xl border-hostel-accent/30">
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
                        <KeyRound size={16} className="text-gray-500" />
                      </div>
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-9 pr-9 bg-white text-sm h-11"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center">
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="p-2 focus:outline-none"
                        >
                          {showPassword ? (
                            <EyeOff size={16} className="text-gray-500" />
                          ) : (
                            <Eye size={16} className="text-gray-500" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Remember password checkbox */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberPassword"
                    checked={rememberPassword}
                    onCheckedChange={(checked) => 
                      setRememberPassword(checked === true)
                    }
                  />
                  <label
                    htmlFor="rememberPassword"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember password
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-hostel-primary hover:bg-hostel-secondary text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>

                <div className="text-center mt-4">
                  <button
                    type="button"
                    onClick={() => navigate('/role-selection')}
                    className="text-sm text-hostel-primary hover:text-hostel-secondary flex items-center mx-auto"
                  >
                    <ArrowLeft size={14} className="mr-1" /> Change User Role
                  </button>
                </div>
                
                {userRole === UserRole.ADMIN && selectedAdminSubRole && (
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleBackToRoleSelection}
                      className="text-sm text-hostel-primary hover:text-hostel-secondary"
                    >
                      Change Admin Role
                    </button>
                  </div>
                )}
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                {/* Step 1 - Select account type */}
                {registrationStep === 1 && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <User className="h-5 w-5 text-hostel-primary" />
                      <h2 className="text-lg font-medium">Select Account Type</h2>
                    </div>
                    
                    <div className="space-y-3">
                      {/* Admin Role */}
                      <div 
                        className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex items-center"
                        onClick={() => handleRoleSelect(UserRole.ADMIN)}
                      >
                        <div className="w-10 h-10 rounded-full bg-hostel-accent flex items-center justify-center mr-3">
                          <Shield className="text-hostel-primary w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">Admin</h3>
                          <p className="text-sm text-gray-600">Register as a PG/Hostel administrator</p>
                        </div>
                      </div>
                      
                      {/* PG Guest Role */}
                      <div 
                        className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex items-center"
                        onClick={() => handleRoleSelect(UserRole.PG_GUEST)}
                      >
                        <div className="w-10 h-10 rounded-full bg-hostel-accent flex items-center justify-center mr-3">
                          <Home className="text-hostel-primary w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">PG Guest</h3>
                          <p className="text-sm text-gray-600">Register as a PG/Hostel resident</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2 - Personal Info (Common for all roles) */}
                {registrationStep === 2 && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <User className="h-5 w-5 text-hostel-primary" />
                      <h2 className="text-lg font-medium">Personal Information</h2>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={signupForm.fullName}
                          onChange={handleSignupInputChange}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="mobile">Mobile Number</Label>
                        <Input
                          id="mobile"
                          name="mobile"
                          type="tel"
                          value={signupForm.mobile}
                          onChange={handleSignupInputChange}
                          placeholder="Enter your mobile number"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="emailAddress">Email Address</Label>
                        <Input
                          id="emailAddress"
                          name="emailAddress"
                          type="email"
                          value={signupForm.emailAddress}
                          onChange={handleSignupInputChange}
                          placeholder="Enter your email address"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          value={signupForm.password}
                          onChange={handleSignupInputChange}
                          placeholder="Create a password"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={signupForm.confirmPassword}
                          onChange={handleSignupInputChange}
                          placeholder="Confirm your password"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3 - Role-specific details */}
                {registrationStep === 3 && signupRole === UserRole.ADMIN && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <Building className="h-5 w-5 text-hostel-primary" />
                      <h2 className="text-lg font-medium">PG/Hostel Details</h2>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="pgName">PG/Hostel Name</Label>
                        <Input
                          id="pgName"
                          name="pgName"
                          value={signupForm.pgName}
                          onChange={handleSignupInputChange}
                          placeholder="Enter your PG/Hostel name"
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
                          placeholder="Enter your PG/Hostel address"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
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
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input
                          id="pincode"
                          name="pincode"
                          value={signupForm.pincode}
                          onChange={handleSignupInputChange}
                          placeholder="Pincode"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {registrationStep === 3 && signupRole === UserRole.PG_GUEST && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <BedDouble className="h-5 w-5 text-hostel-primary" />
                      <h2 className="text-lg font-medium">Guest Details</h2>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="guestPgName">PG/Hostel Name</Label>
                        <Input
                          id="guestPgName"
                          name="guestPgName"
                          value={signupForm.guestPgName}
                          onChange={handleSignupInputChange}
                          placeholder="Enter your PG/Hostel name"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="guestRoomNumber">Room Number</Label>
                        <Input
                          id="guestRoomNumber"
                          name="guestRoomNumber"
                          value={signupForm.guestRoomNumber}
                          onChange={handleSignupInputChange}
                          placeholder="Your room number"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                          <Label htmlFor="guestJoinDate">Join Date</Label>
                          <Input
                            id="guestJoinDate"
                            name="guestJoinDate"
                            type="date"
                            value={signupForm.guestJoinDate}
                            onChange={handleSignupInputChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="guestEndDate">End Date</Label>
                          <Input
                            id="guestEndDate"
                            name="guestEndDate"
                            type="date"
                            value={signupForm.guestEndDate}
                            onChange={handleSignupInputChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="guestEmergencyContact">Emergency Contact</Label>
                        <Input
                          id="guestEmergencyContact"
                          name="guestEmergencyContact"
                          value={signupForm.guestEmergencyContact}
                          onChange={handleSignupInputChange}
                          placeholder="Emergency contact number"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Final step - Terms and Conditions (Common) */}
                {registrationStep === 4 && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <FileCheck className="h-5 w-5 text-hostel-primary" />
                      <h2 className="text-lg font-medium">Terms & Conditions</h2>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600 max-h-40 overflow-y-auto">
                      <p className="mb-2">By creating an account, you agree to our Terms of Service and Privacy Policy. 
                      You consent to the collection and processing of your personal information as described in our policies.</p>
                      <p>You also confirm that all the information provided is accurate and complete.</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="agreeToTerms"
                        checked={signupForm.agreeToTerms}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange("agreeToTerms", checked === true)
                        }
                        required
                      />
                      <label
                        htmlFor="agreeToTerms"
                        className="text-sm font-medium leading-none"
                      >
                        I agree to the terms and conditions
                      </label>
                    </div>
                  </div>
                )}
                
                {/* Navigation buttons */}
                <div className="flex justify-between pt-4">
                  {registrationStep > 1 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handlePrevStep}
                      className="flex items-center"
                    >
                      <ArrowLeft size={16} className="mr-1" /> Back
                    </Button>
                  )}
                  
                  {registrationStep < 4 ? (
                    <Button 
                      type="button" 
                      onClick={handleNextStep}
                      className="ml-auto flex items-center bg-hostel-primary hover:bg-hostel-secondary text-white"
                    >
                      Next <ChevronRight size={16} className="ml-1" />
                    </Button>
                  ) : (
                    <Button 
                      type="submit"
                      disabled={!signupForm.agreeToTerms}
                      className="ml-auto flex items-center bg-hostel-primary hover:bg-hostel-secondary text-white"
                    >
                      Complete Registration <Check size={16} className="ml-1" />
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
