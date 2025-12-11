import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Upload, CheckCircle2, AlertCircle, FileText } from "lucide-react";
import { toast } from "sonner";

export default function BloodTypeEntry() {
  const [, setLocation] = useLocation();
  const [bloodType, setBloodType] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bloodType || !file) {
      toast.error("يرجى تعبئة جميع الحقول المطلوبة");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      // Save data to local storage for demo purposes
      localStorage.setItem("userBloodType", bloodType);
      localStorage.setItem("verificationStatus", "pending");
      
      toast.success("تم إرسال الطلب بنجاح");
      setLocation("/verification");
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl font-bold text-primary">إضافة فصيلة الدم</h2>
        <p className="text-muted-foreground text-sm">
          أضف فصيلة دمك لتعزيز ملفك الصحي والمساعدة في حالات الطوارئ
        </p>
      </div>

      <Card className="border-none shadow-lg overflow-hidden">
        <div className="h-2 bg-primary w-full" />
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="w-5 h-5 text-primary" />
            بيانات الفصيلة
          </CardTitle>
          <CardDescription>
            يجب إرفاق تقرير طبي معتمد أو شهادة من تطبيق صحتي
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="blood-type">فصيلة الدم</Label>
              <Select onValueChange={setBloodType} value={bloodType}>
                <SelectTrigger id="blood-type" className="h-12 text-right dir-rtl">
                  <SelectValue placeholder="اختر فصيلة الدم" />
                </SelectTrigger>
                <SelectContent dir="rtl">
                  {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>المرفقات (تقرير طبي / QR)</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer relative">
                <input 
                  type="file" 
                  accept="image/*,.pdf" 
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center gap-2">
                  {file ? (
                    <>
                      <CheckCircle2 className="w-10 h-10 text-green-500" />
                      <span className="text-sm font-medium text-green-700">{file.name}</span>
                      <span className="text-xs text-muted-foreground">انقر للتغيير</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-10 h-10 text-muted-foreground" />
                      <span className="text-sm font-medium text-primary">اضغط لرفع الملف</span>
                      <span className="text-xs text-muted-foreground">PNG, JPG, PDF (الحد الأقصى 5MB)</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3 items-start">
              <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-800 leading-relaxed">
                بإرسال هذا الطلب، أنت تقر بصحة البيانات المرفقة وتوافق على مشاركتها مع الجهات الصحية والأمنية في حالات الطوارئ فقط.
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-medium shadow-md hover:shadow-lg transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? "جاري الإرسال..." : "حفظ وإرسال للتحقق"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
