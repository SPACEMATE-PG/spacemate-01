import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Clock, AlertTriangle, User, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ServiceRequest {
  id: string;
  asset: string;
  issue: string;
  requests: number;
  priority: 'High' | 'Medium' | 'Low';
  status: 'pending' | 'acknowledged' | 'in-progress' | 'completed';
  submittedBy: string[];
  description: string;
  submittedAt: string;
}

interface ServiceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: ServiceRequest | null;
  onUpdateStatus: (id: string, status: string, notes?: string) => Promise<void>;
}

const ServiceRequestModal = ({ isOpen, onClose, request, onUpdateStatus }: ServiceRequestModalProps) => {
  const { toast } = useToast();
  const [notes, setNotes] = useState("");
  const [selectedAction, setSelectedAction] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!request) return null;

  const handleActionConfirm = async () => {
    if (!selectedAction) {
      toast({
        title: "No Action Selected",
        description: "Please select an action to perform.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
      await onUpdateStatus(request.id, selectedAction, notes);
      setNotes("");
      setSelectedAction("");
      onClose();
      
      const actionMessages = {
        acknowledged: "Service request acknowledged",
        'in-progress': "Service request marked as in progress", 
        completed: "Service request completed",
        rejected: "Service request rejected"
      };
      
      toast({
        title: "Status Updated",
        description: actionMessages[selectedAction as keyof typeof actionMessages],
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update request status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'acknowledged': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'in-progress': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <Skeleton className="h-6 w-48" />
          </DialogHeader>
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Service Request Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{request.asset}</h3>
            <Badge className={getPriorityColor(request.priority)}>
              {request.priority} Priority
            </Badge>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Issue</p>
            <p>{request.issue}</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-500">Description</p>
            <p>{request.description}</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-500">Submitted By</p>
            <div className="flex flex-wrap gap-2">
              {request.submittedBy.map((user, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {user}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-500">Notes</p>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes..."
              className="min-h-[100px]"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleActionConfirm}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Status"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceRequestModal;
