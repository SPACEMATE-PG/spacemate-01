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

    // Add new payment
    const payment = {
      id: `PAY${String(mockPayments.length + 1).padStart(3, '0')}`,
      ...newPayment,
      amount: Number(newPayment.amount),
      status: "pending",
      date: format(new Date(), "yyyy-MM-dd")
    };

    setPayments([...payments, payment]);
    setShowNewPayment(false);
    setNewPayment({
      guestName: "",
      room: "",
      amount: "",
      type: "rent",
      method: "UPI",
      reference: ""
    });

    toast({
      title: "Payment Added",
      description: "New payment has been added successfully",
    });
  };

  const handleSubmitExpense = () => {
    // Validate expense data
    if (!newExpense.category || !newExpense.description || !newExpense.amount) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Add new expense
    const expense = {
      id: `EXP${String(mockExpenses.length + 1).padStart(3, '0')}`,
      ...newExpense,
      amount: Number(newExpense.amount),
      date: format(new Date(), "yyyy-MM-dd")
    };

    setExpenses([...expenses, expense]);
    setShowNewExpense(false);
    setNewExpense({
      category: "",
      description: "",
      amount: "",
      vendor: "",
      status: "pending"
    });

    toast({
      title: "Expense Added",
      description: "New expense has been added successfully",
    });
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Paid</Badge>;
      case "pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const calculateTotals = () => {
    const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const pendingPayments = payments
      .filter(payment => payment.status === "pending")
      .reduce((sum, payment) => sum + payment.amount, 0);

    return {
      totalRevenue,
      totalExpenses,
      pendingPayments,
      netIncome: totalRevenue - totalExpenses
    };
  };

  const totals = calculateTotals();

  return (
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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{totals.totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-gray-500">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Pending Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{totals.pendingPayments.toLocaleString()}</div>
                <p className="text-xs text-gray-500">From {payments.filter(p => p.status === "pending").length} guests</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{totals.totalExpenses.toLocaleString()}</div>
                <p className="text-xs text-gray-500">This month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payments.slice(0, 3).map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{payment.guestName}</h3>
                        <p className="text-sm text-gray-500">Room {payment.room}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">₹{payment.amount.toLocaleString()}</div>
                        {getPaymentStatusBadge(payment.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expenses.slice(0, 3).map((expense) => (
                    <div key={expense.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{expense.category}</h3>
                        <p className="text-sm text-gray-500">{expense.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">₹{expense.amount.toLocaleString()}</div>
                        {getPaymentStatusBadge(expense.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search payments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="rent">Rent</SelectItem>
                  <SelectItem value="deposit">Deposit</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleNewPayment}
              className="bg-hostel-primary hover:bg-hostel-secondary"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Payment
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead onClick={() => handleSort('id')} className="cursor-pointer">
                      ID {sortConfig?.key === 'id' && (sortConfig.direction === 'asc' ? <ChevronUp className="inline h-4 w-4" /> : <ChevronDown className="inline h-4 w-4" />)}
                    </TableHead>
                    <TableHead onClick={() => handleSort('guestName')} className="cursor-pointer">
                      Guest {sortConfig?.key === 'guestName' && (sortConfig.direction === 'asc' ? <ChevronUp className="inline h-4 w-4" /> : <ChevronDown className="inline h-4 w-4" />)}
                    </TableHead>
                    <TableHead onClick={() => handleSort('room')} className="cursor-pointer">
                      Room {sortConfig?.key === 'room' && (sortConfig.direction === 'asc' ? <ChevronUp className="inline h-4 w-4" /> : <ChevronDown className="inline h-4 w-4" />)}
                    </TableHead>
                    <TableHead onClick={() => handleSort('amount')} className="cursor-pointer">
                      Amount {sortConfig?.key === 'amount' && (sortConfig.direction === 'asc' ? <ChevronUp className="inline h-4 w-4" /> : <ChevronDown className="inline h-4 w-4" />)}
                    </TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>{payment.guestName}</TableCell>
                      <TableCell>{payment.room}</TableCell>
                      <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                      <TableCell>{payment.type}</TableCell>
                      <TableCell>{getPaymentStatusBadge(payment.status)}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadReport(payment.id)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Receipt
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search expenses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button
              onClick={handleNewExpense}
              className="bg-hostel-primary hover:bg-hostel-secondary"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Expense
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell className="font-medium">{expense.id}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell>₹{expense.amount.toLocaleString()}</TableCell>
                      <TableCell>{expense.date}</TableCell>
                      <TableCell>{getPaymentStatusBadge(expense.status)}</TableCell>
                      <TableCell>{expense.vendor}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadReport(expense.id)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Bill
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Financial Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleDownloadReport("revenue")}
                  >
                    <Receipt className="h-4 w-4 mr-2" />
                    Revenue Report
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleDownloadReport("expenses")}
                  >
                    <Wallet className="h-4 w-4 mr-2" />
                    Expense Report
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleDownloadReport("profit")}
                  >
                    <BarChart2 className="h-4 w-4 mr-2" />
                    Profit & Loss Statement
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleDownloadReport("pending")}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Pending Payments
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleDownloadReport("overdue")}
                  >
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Overdue Payments
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleDownloadReport("collection")}
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Collection Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* New Payment Dialog */}
      <Dialog open={showNewPayment} onOpenChange={setShowNewPayment}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record New Payment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Guest</label>
                <Select
                  value={newPayment.guestName}
                  onValueChange={(value) => setNewPayment({ ...newPayment, guestName: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select guest" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="John Doe">John Doe (Room 101)</SelectItem>
                    <SelectItem value="Jane Smith">Jane Smith (Room 102)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Payment Type</label>
                <Select
                  value={newPayment.type}
                  onValueChange={(value) => setNewPayment({ ...newPayment, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rent">Rent</SelectItem>
                    <SelectItem value="deposit">Deposit</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount</label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={newPayment.amount}
                onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Payment Method</label>
              <Select
                value={newPayment.method}
                onValueChange={(value) => setNewPayment({ ...newPayment, method: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UPI">UPI</SelectItem>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Reference Number</label>
              <Input
                placeholder="Enter reference number"
                value={newPayment.reference}
                onChange={(e) => setNewPayment({ ...newPayment, reference: e.target.value })}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowNewPayment(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-hostel-primary hover:bg-hostel-secondary"
                onClick={handleSubmitPayment}
              >
                Record Payment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Expense Dialog */}
      <Dialog open={showNewExpense} onOpenChange={setShowNewExpense}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record New Expense</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select
                  value={newExpense.category}
                  onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Utilities">Utilities</SelectItem>
                    <SelectItem value="Supplies">Supplies</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount</label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input
                placeholder="Enter description"
                value={newExpense.description}
                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Vendor</label>
              <Input
                placeholder="Enter vendor name"
                value={newExpense.vendor}
                onChange={(e) => setNewExpense({ ...newExpense, vendor: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Payment Status</label>
              <Select
                value={newExpense.status}
                onValueChange={(value) => setNewExpense({ ...newExpense, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowNewExpense(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-hostel-primary hover:bg-hostel-secondary"
                onClick={handleSubmitExpense}
              >
                Record Expense
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FinancialManagement; 