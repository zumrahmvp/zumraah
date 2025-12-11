import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, CheckCircle2, ShieldCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function Verification() {
  const [, setLocation] = useLocation();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"verifying" | "success">("verifying");

  useEffect(() => {
    // Simulate verification process
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setStatus("success");
          localStorage.setItem("verificationStatus", "verified");
          return 100;
        }
        return prev + 2; // 5 seconds total approx
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] max-w-md mx-auto text-center space-y-8">
      
      {status === "verifying" ? (
        <div className="space-y-8 w-full animate-in fade-in zoom-in duration-500">
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 border-4 border-muted rounded-full"></div>
            <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <ShieldCheck className="absolute inset-0 m-auto w-12 h-12 text-primary animate-pulse" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-primary">جاري التحقق من البيانات</h2>
            <p className="text-muted-foreground">يتم الآن مطابقة التقرير مع السجلات الصحية المركزية...</p>
          </div>

          <div className="w-full space-y-2">
            <Progress value={progress} className="h-3" />
            <p className="text-xs text-muted-foreground text-left dir-ltr">{progress}%</p>
          </div>
        </div>
      ) : (
        <Card className="w-full border-none shadow-xl animate-in fade-in zoom-in duration-500 overflow-hidden">
          <div className="bg-green-50 p-8 flex flex-col items-center gap-4 border-b border-green-100">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-800">تم التحقق بنجاح!</h2>
          </div>
          
          <CardContent className="p-6 space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              تم اعتماد فصيلة الدم وإضافتها إلى هويتك الرقمية بنجاح. يمكنك الآن استخدامها في حالات الطوارئ.
            </p>
            
            <div className="bg-muted/30 rounded-lg p-4 flex justify-between items-center border border-muted">
              <span className="text-sm text-muted-foreground">فصيلة الدم المعتمدة</span>
              <span className="text-xl font-bold text-primary bg-white px-4 py-1 rounded shadow-sm">
                {localStorage.getItem("userBloodType")}
              </span>
            </div>

            <Button 
              className="w-full h-12 text-lg shadow-md hover:shadow-lg transition-all"
              onClick={() => setLocation("/digital-id")}
            >
              الذهاب للهوية الرقمية
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
