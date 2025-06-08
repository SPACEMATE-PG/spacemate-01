import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  Mail,
  MessageSquare,
  Download,
  Upload,
  Trash2,
  CheckCircle,
  AlertCircle,
  Send,
} from "lucide-react";
import { PGAdmin } from "@/hooks/usePGAdmins";
import { useToast } from "@/hooks/use-toast";

interface AdminBulkActionsProps {
  admins: PGAdmin[];
  selectedAdmins: string[];
  onSelectionChange: (adminIds: string[]) => void;
}

const AdminBulkActions = ({ admins, selectedAdmins, onSelectionChange }: AdminBulkActionsProps) => {
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [smsMessage, setSmsMessage] = useState("");
  const [bulkAction, setBulkAction] = useState<string>("");
  const { toast } = useToast();

  const selectedCount = selectedAdmins.length;
  const allSelected = selectedAdmins.length === admins.length;
  const someSelected = selectedAdmins.length > 0;

  const handleSelectAll = () => {
    if (allSelected) {
      onSelectionChange([]);
    } else {
      onSelectionChange(admins.map(admin => admin.id));
    }
  };

  const handleBulkEmail = () => {
    if (!emailSubject || !emailMessage) {
      toast({
        title: "Missing Information",
        description: "Please fill in both subject and message for the email.",
        variant: "destructive",
      });
      return;
    }

    console.log(`Sending email to ${selectedCount} admins:`, {
      subject: emailSubject,
      message: emailMessage,
      recipients: selectedAdmins,
    });

    toast({
      title: "Email Sent",
      description: `Email sent to ${selectedCount} selected admins.`,
    });

    setEmailSubject("");
    setEmailMessage("");
  };

  const handleBulkSMS = () => {
    if (!smsMessage) {
      toast({
        title: "Missing Message",
        description: "Please enter an SMS message.",
        variant: "destructive",
      });
      return;
    }

    console.log(`Sending SMS to ${selectedCount} admins:`, {
      message: smsMessage,
      recipients: selectedAdmins,
    });

    toast({
      title: "SMS Sent",
      description: `SMS sent to ${selectedCount} selected admins.`,
    });

    setSmsMessage("");
  };

  const handleBulkAction = () => {
    if (!bulkAction) {
      toast({
        title: "No Action Selected",
        description: "Please select a bulk action to perform.",
        variant: "destructive",
      });
      return;
    }

    console.log(`Performing bulk action: ${bulkAction} on ${selectedCount} admins`);

    toast({
      title: "Bulk Action Completed",
      description: `${bulkAction} applied to ${selectedCount} selected admins.`,
    });

    setBulkAction("");
  };

  const exportSelectedData = () => {
    const selectedAdminData = admins.filter(admin => selectedAdmins.includes(admin.id));
    console.log("Exporting data for selected admins:", selectedAdminData);
    
    toast({
      title: "Export Started",
      description: `Exporting data for ${selectedCount} selected admins.`,
    });
  };

  return (
    <Card className="border-slate-200">
      <CardHeader className="bg-slate-50 border-b border-slate-100 rounded-t-lg">
        <CardTitle className="text-xl font-semibold text-slate-900 flex items-center justify-between">
          <div className="flex items-center">
            <Users className="h-5 w-5 mr-3 text-indigo-600" />
            Bulk Admin Operations
          </div>
          <Badge variant={someSelected ? "default" : "outline"} className="ml-2">
            {selectedCount} Selected
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Selection Controls */}
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Checkbox
              checked={allSelected}
              onCheckedChange={handleSelectAll}
              className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
            />
            <span className="text-sm font-medium text-slate-700">
              {allSelected ? "Deselect All" : "Select All"} ({admins.length} admins)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={exportSelectedData}
              disabled={!someSelected}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export Selected
            </Button>
          </div>
        </div>

        {/* Bulk Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Email Communication */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-blue-900 flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Bulk Email
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Email Subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                className="border-blue-300 focus:border-blue-500"
              />
              <textarea
                placeholder="Email Message"
                value={emailMessage}
                onChange={(e) => setEmailMessage(e.target.value)}
                className="w-full min-h-[100px] p-3 border border-blue-300 rounded-md focus:border-blue-500 focus:ring-blue-500 resize-none"
              />
              <Button
                onClick={handleBulkEmail}
                disabled={!someSelected}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Email to {selectedCount} Admins
              </Button>
            </CardContent>
          </Card>

          {/* SMS Communication */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-green-900 flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Bulk SMS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <textarea
                placeholder="SMS Message (160 characters max)"
                value={smsMessage}
                onChange={(e) => setSmsMessage(e.target.value)}
                maxLength={160}
                className="w-full min-h-[100px] p-3 border border-green-300 rounded-md focus:border-green-500 focus:ring-green-500 resize-none"
              />
              <div className="text-xs text-green-600">
                {smsMessage.length}/160 characters
              </div>
              <Button
                onClick={handleBulkSMS}
                disabled={!someSelected}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                <Send className="h-4 w-4 mr-2" />
                Send SMS to {selectedCount} Admins
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Other Bulk Actions */}
        <Card className="border-purple-200 bg-purple-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-purple-900 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Bulk Operations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={bulkAction} onValueChange={setBulkAction}>
              <SelectTrigger className="border-purple-300 focus:border-purple-500">
                <SelectValue placeholder="Select bulk action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="upgrade-monthly">Upgrade to Monthly</SelectItem>
                <SelectItem value="upgrade-yearly">Upgrade to Yearly</SelectItem>
                <SelectItem value="extend-trial">Extend Free Trial</SelectItem>
                <SelectItem value="suspend">Suspend Account</SelectItem>
                <SelectItem value="activate">Activate Account</SelectItem>
                <SelectItem value="send-reminder">Send Payment Reminder</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={handleBulkAction}
              disabled={!someSelected || !bulkAction}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Apply to {selectedCount} Admins
            </Button>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default AdminBulkActions;
