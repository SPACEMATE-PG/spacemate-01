import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Download, 
  IndianRupee, 
  TrendingUp, 
  Receipt, 
  Wallet,
  Filter,
  Calendar,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  BarChart2
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import PGAdminLayout from "@/components/admin/PGAdminLayout";

// Mock data - replace with actual API data
const mockPayments = [
  {
    id: "PAY001",
    guestName: "John Doe",
    room: "101",
    amount: 8000,
    type: "rent",
    status: "paid",
    date: "2024-03-01",
    method: "UPI",
    reference: "UPI123456"
  },
  {
    id: "PAY002",
    guestName: "Jane Smith",
    room: "102",
    amount: 12000,
    type: "rent",
    status: "pending",
    date: "2024-03-05",
    method: "Bank Transfer",
    reference: "BT789012"
  }
];

const mockExpenses = [
  {
    id: "EXP001",
    category: "Maintenance",
    description: "AC repair in room 101",
    amount: 2500,
    date: "2024-03-02",
    status: "paid",
    vendor: "CoolTech Services"
  },
  {
    id: "EXP002",
    category: "Utilities",
    description: "Electricity bill - February",
    amount: 15000,
    date: "2024-03-03",
    status: "pending",
    vendor: "State Electricity Board"
  }
];

const FinancialManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewPayment, setShowNewPayment] = useState(false);
  const [showNewExpense, setShowNewExpense] = useState(false);
  const [dateRange, setDateRange] = useState("month");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [payments, setPayments] = useState(mockPayments);
  const [expenses, setExpenses] = useState(mockExpenses);
  const [newPayment, setNewPayment] = useState({
    guestName: "",
    room: "",
    amount: "",
    type: "rent",
    method: "UPI",
    reference: ""
  });
  const [newExpense, setNewExpense] = useState({
    category: "",
    description: "",
    amount: "",
    vendor: "",
    status: "pending"
  });

  useEffect(() => {
    // Filter and sort payments
    let filteredPayments = [...mockPayments];
    
    // Apply search filter
    if (searchQuery) {
      filteredPayments = filteredPayments.filter(payment => 
        payment.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.reference.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (filterStatus !== "all") {
      filteredPayments = filteredPayments.filter(payment => payment.status === filterStatus);
    }

    // Apply type filter
    if (filterType !== "all") {
      filteredPayments = filteredPayments.filter(payment => payment.type === filterType);
    }

    // Apply sorting
    if (sortConfig) {
      filteredPayments.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    setPayments(filteredPayments);
  }, [searchQuery, filterStatus, filterType, sortConfig]);

  const handleBack = () => {
    navigate("/pg-admin");
  };

  const handleNewPayment = () => {
    setShowNewPayment(true);
  };

  const handleNewExpense = () => {
    setShowNewExpense(true);
  };

  const handleDownloadReport = (type: string) => {
    // TODO: Implement report download
    toast({
      title: "Report Download",
      description: `Downloading ${type} report...`,
    });
  };

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSubmitPayment = () => {
    // Validate payment data
    if (!newPayment.guestName || !newPayment.room || !newPayment.amount) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    setPayments(prev => [...prev, { 
      id: `PAY${String(prev.length + 1).padStart(3, '0')}`,
      guestName: newPayment.guestName,
      room: newPayment.room,
      amount: parseFloat(newPayment.amount),
      type: newPayment.type,
      status: "paid",
      date: format(new Date(), "yyyy-MM-dd"),
      method: newPayment.method,
      reference: newPayment.reference
    }]);
    setNewPayment({
      guestName: "",
      room: "",
      amount: "",
      type: "rent",
      method: "UPI",
      reference: ""
    });
    setShowNewPayment(false);
    toast({
      title: "Payment Added",
      description: "New payment record has been added.",
    });
  };

  const handleSubmitExpense = () => {
    // Validate expense data
    if (!newExpense.category || !newExpense.description || !newExpense.amount || !newExpense.vendor) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    setExpenses(prev => [...prev, {
      id: `EXP${String(prev.length + 1).padStart(3, '0')}`,
      category: newExpense.category,
      description: newExpense.description,
      amount: parseFloat(newExpense.amount),
      date: format(new Date(), "yyyy-MM-dd"),
      status: newExpense.status,
      vendor: newExpense.vendor
    }]);
    setNewExpense({
      category: "",
      description: "",
      amount: "",
      vendor: "",
      status: "pending"
    });
    setShowNewExpense(false);
    toast({
      title: "Expense Added",
      description: "New expense record has been added.",
    });
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge variant="default" className="bg-green-100 text-green-800">Paid</Badge>;
      case "pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getExpenseStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge variant="default" className="bg-green-100 text-green-800">Paid</Badge>;
      case "pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const calculateTotals = () => {
    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const netProfit = totalRevenue - totalExpenses;
    return { totalRevenue, totalExpenses, netProfit };
  };

  const { totalRevenue, totalExpenses, netProfit } = calculateTotals();

  return (
    <PGAdminLayout>
      <div className="space-y-6 p-4 sm:p-6">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Financial Management</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-gray-500">This month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Net Profit</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{netProfit.toLocaleString()}</div>
                  <p className="text-xs text-gray-500">This month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{totalExpenses.toLocaleString()}</div>
                  <p className="text-xs text-gray-500">This month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue & Expense Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Chart component */}
                  <div className="h-[300px] flex items-center justify-center text-gray-400">
                    <BarChart2 className="h-8 w-8" />
                    Revenue/Expense Chart Placeholder
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Financial Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <span>Total Payments:</span>
                      <span className="font-medium">₹{totalRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Expenses:</span>
                      <span className="font-medium">₹{totalExpenses.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                      <span>Net Profit:</span>
                      <span>₹{netProfit.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button onClick={() => handleDownloadReport("financial-summary")}>
                      <Download className="h-4 w-4 mr-2" />
                      Download Summary
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="payments" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search payments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Button
                onClick={handleNewPayment}
                className="bg-hostel-primary hover:bg-hostel-secondary"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Payment
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-medium">Payment Status</CardTitle>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[150px] h-9">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </CardHeader>
                <CardContent>
                  {/* Payment Table */}
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead onClick={() => handleSort('date')} className="cursor-pointer">
                            Date {sortConfig?.key === 'date' && (sortConfig.direction === 'asc' ? <ChevronDown className="inline h-4 w-4 ml-1" /> : <ChevronUp className="inline h-4 w-4 ml-1" />)}
                          </TableHead>
                          <TableHead>Guest</TableHead>
                          <TableHead>Room</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead onClick={() => handleSort('amount')} className="cursor-pointer text-right">
                            Amount {sortConfig?.key === 'amount' && (sortConfig.direction === 'asc' ? <ChevronDown className="inline h-4 w-4 ml-1" /> : <ChevronUp className="inline h-4 w-4 ml-1" />)}
                          </TableHead>
                          <TableHead>Method</TableHead>
                          <TableHead>Reference</TableHead>
                          <TableHead onClick={() => handleSort('status')} className="cursor-pointer text-right">
                            Status {sortConfig?.key === 'status' && (sortConfig.direction === 'asc' ? <ChevronDown className="inline h-4 w-4 ml-1" /> : <ChevronUp className="inline h-4 w-4 ml-1" />)}
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {payments.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} className="h-24 text-center text-gray-500">
                              No payments found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          payments.map((payment) => (
                            <TableRow key={payment.id}>
                              <TableCell>{payment.date}</TableCell>
                              <TableCell className="font-medium">{payment.guestName}</TableCell>
                              <TableCell>{payment.room}</TableCell>
                              <TableCell className="capitalize">{payment.type}</TableCell>
                              <TableCell className="text-right">₹{payment.amount.toLocaleString()}</TableCell>
                              <TableCell>{payment.method}</TableCell>
                              <TableCell>{payment.reference}</TableCell>
                              <TableCell className="text-right">
                                {getPaymentStatusBadge(payment.status)}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-medium">Expense Breakdown</CardTitle>
                  <Button onClick={handleNewExpense} variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    New Expense
                  </Button>
                </CardHeader>
                <CardContent>
                  {/* Expense Table */}
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                          <TableHead>Vendor</TableHead>
                          <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {expenses.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center text-gray-500">
                              No expenses found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          expenses.map((expense) => (
                            <TableRow key={expense.id}>
                              <TableCell>{expense.date}</TableCell>
                              <TableCell className="font-medium">{expense.category}</TableCell>
                              <TableCell>{expense.description}</TableCell>
                              <TableCell className="text-right">₹{expense.amount.toLocaleString()}</TableCell>
                              <TableCell>{expense.vendor}</TableCell>
                              <TableCell className="text-right">
                                {getExpenseStatusBadge(expense.status)}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* New Payment Dialog */}
        <Dialog open={showNewPayment} onOpenChange={setShowNewPayment}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Payment</DialogTitle>
              <DialogDescription>
                Enter the details for the new payment.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="guestName" className="text-right">
                  Guest Name
                </label>
                <Input
                  id="guestName"
                  value={newPayment.guestName}
                  onChange={(e) => setNewPayment({ ...newPayment, guestName: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="room" className="text-right">
                  Room No.
                </label>
                <Input
                  id="room"
                  value={newPayment.room}
                  onChange={(e) => setNewPayment({ ...newPayment, room: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="amount" className="text-right">
                  Amount
                </label>
                <Input
                  id="amount"
                  type="number"
                  value={newPayment.amount}
                  onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="type" className="text-right">
                  Type
                </label>
                <Select
                  value={newPayment.type}
                  onValueChange={(value) => setNewPayment({ ...newPayment, type: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select payment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rent">Rent</SelectItem>
                    <SelectItem value="security_deposit">Security Deposit</SelectItem>
                    <SelectItem value="utility">Utility Bill</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="method" className="text-right">
                  Method
                </label>
                <Select
                  value={newPayment.method}
                  onValueChange={(value) => setNewPayment({ ...newPayment, method: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UPI">UPI</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="reference" className="text-right">
                  Reference
                </label>
                <Input
                  id="reference"
                  value={newPayment.reference}
                  onChange={(e) => setNewPayment({ ...newPayment, reference: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleSubmitPayment}>Add Payment</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* New Expense Dialog */}
        <Dialog open={showNewExpense} onOpenChange={setShowNewExpense}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Expense</DialogTitle>
              <DialogDescription>
                Enter the details for the new expense.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="category" className="text-right">
                  Category
                </label>
                <Select
                  value={newExpense.category}
                  onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="staff">Staff Salaries</SelectItem>
                    <SelectItem value="supplies">Supplies</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="description" className="text-right">
                  Description
                </label>
                <Input
                  id="description"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="amount" className="text-right">
                  Amount
                </label>
                <Input
                  id="amount"
                  type="number"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="vendor" className="text-right">
                  Vendor
                </label>
                <Input
                  id="vendor"
                  value={newExpense.vendor}
                  onChange={(e) => setNewExpense({ ...newExpense, vendor: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="status" className="text-right">
                  Status
                </label>
                <Select
                  value={newExpense.status}
                  onValueChange={(value) => setNewExpense({ ...newExpense, status: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleSubmitExpense}>Add Expense</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </PGAdminLayout>
  );
};

export default FinancialManagement; 