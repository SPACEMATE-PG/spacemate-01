
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Filter, Download, BarChart3 } from "lucide-react";

interface AnalyticsHeaderProps {
  onExportData: (type: string) => void;
}

const AnalyticsHeader = ({ onExportData }: AnalyticsHeaderProps) => {
  return (
    <Card className="border-slate-200">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-slate-100 rounded-t-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-semibold text-slate-900 flex items-center">
              <BarChart3 className="h-5 w-5 mr-3 text-indigo-600" />
              Analytics Dashboard
            </CardTitle>
            <p className="text-slate-600 text-sm mt-1">Comprehensive business insights and trends</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Last 6 Months
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button 
              size="sm" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2"
              onClick={() => onExportData('analytics')}
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default AnalyticsHeader;
