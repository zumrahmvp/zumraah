import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye, EyeOff, ShieldAlert, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DigitalID() {
  const [bloodType, setBloodType] = useState<string | null>(null);
  const [showEmergencyQR, setShowEmergencyQR] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const storedType = localStorage.getItem("userBloodType");
    if (storedType) setBloodType(storedType);
  }, []);

  const emergencyData = JSON.stringify({
    type: "EMERGENCY_MEDICAL_DATA",
    bloodType: bloodType,
    lastUpdate: new Date().toISOString().split('T')[0],
    source: "MOH_VERIFIED"
  });

  return (
    <div className="space-y-6 flex flex-col items-center">
      <div className="text-center space-y-1 mb-2">
        <h2 className="text-2xl font-bold text-primary">الهوية الرقمية</h2>
        <p className="text-muted-foreground text-sm">بطاقة الهوية الوطنية</p>
      </div>

      {/* ID Card Container with Flip Effect */}
      <div className="relative w-full max-w-sm aspect-[1.586/1] perspective-1000 group cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={cn(
          "relative w-full h-full transition-all duration-700 transform-style-3d shadow-2xl rounded-2xl",
          isFlipped ? "rotate-y-180" : ""
        )}>
          
          {/* Front Side */}
          <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden bg-white border border-gray-200">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[url('/images/digital_id_card_bg.png')] bg-cover bg-center" />
            
            {/* Header */}
            <div className="flex justify-between items-start p-4 relative z-10">
              <div className="flex flex-col items-start">
                <span className="text-[10px] text-green-700 font-bold">المملكة العربية السعودية</span>
                <span className="text-[10px] text-green-700">وزارة الداخلية</span>
              </div>
              <img src="/images/saudi_emblem_placeholder.png" className="w-8 h-8 opacity-80" alt="Emblem" />
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-green-700 font-bold">Kingdom of Saudi Arabia</span>
                <span className="text-[10px] text-green-700">Ministry of Interior</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex items-center gap-4 px-4 mt-2 relative z-10">
              <div className="w-24 h-28 bg-gray-200 rounded-lg overflow-hidden border border-gray-300 shadow-inner">
                <img src="/images/user_placeholder.png" alt="User" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-2 text-right">
                <div>
                  <p className="text-[10px] text-muted-foreground">الاسم</p>
                  <p className="text-sm font-bold text-gray-800">عبدالله محمد أحمد</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">رقم الهوية</p>
                  <p className="text-sm font-mono text-gray-800">1012345678</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">تاريخ الميلاد</p>
                  <p className="text-sm font-mono text-gray-800">1410/05/15</p>
                </div>
              </div>
            </div>

            {/* Blood Type Badge (New Feature) */}
            {bloodType && (
              <div className="absolute bottom-4 left-4 bg-red-50 border border-red-100 px-3 py-1 rounded-full flex items-center gap-2 shadow-sm z-20 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-red-700">فصيلة الدم: {bloodType}</span>
              </div>
            )}
          </div>

          {/* Back Side (QR Code) */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden bg-white border border-gray-200 flex flex-col items-center justify-center p-6">
             <div className="absolute inset-0 opacity-5 bg-[url('/images/digital_id_card_bg.png')] bg-cover bg-center" />
             <QRCodeSVG value={`ID:1012345678`} size={150} level="H" className="z-10" />
             <p className="mt-4 text-xs text-muted-foreground z-10">امسح الرمز للتحقق من الهوية</p>
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground flex items-center gap-1">
        <Eye className="w-3 h-3" /> اضغط على البطاقة لقلبها
      </p>

      {/* Emergency Mode Button */}
      <Dialog open={showEmergencyQR} onOpenChange={setShowEmergencyQR}>
        <DialogTrigger asChild>
          <Button 
            variant={bloodType ? "destructive" : "secondary"} 
            className="w-full max-w-sm h-14 text-lg gap-2 shadow-lg transition-all mt-4"
            disabled={!bloodType}
          >
            <ShieldAlert className="w-6 h-6" />
            {bloodType ? "إظهار رمز الطوارئ الطبي" : "لم يتم إضافة فصيلة الدم"}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md border-none bg-slate-900 text-white">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="text-red-500 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5" />
              وضع الطوارئ الطبي
            </DialogTitle>
            {/* <DialogClose asChild>
              <Button variant="ghost" size="icon" className="text-white/50 hover:text-white">
                <X className="w-4 h-4" />
              </Button>
            </DialogClose> */}
          </DialogHeader>
          
          <div className="flex flex-col items-center space-y-6 py-6">
            <div className="p-4 bg-white rounded-xl shadow-[0_0_30px_rgba(239,68,68,0.3)]">
              <QRCodeSVG 
                value={emergencyData} 
                size={200} 
                level="H" 
                fgColor="#000000"
                bgColor="#FFFFFF"
              />
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-white">فصيلة الدم: <span className="text-red-500 text-3xl align-middle mx-2">{bloodType}</span></h3>
              <p className="text-slate-400 text-sm">
                يسمح هذا الرمز للمسعفين بالوصول الفوري لبياناتك الطبية الحيوية فقط.
              </p>
            </div>

            <div className="w-full bg-slate-800/50 rounded-lg p-3 text-xs text-slate-500 text-center">
              تم التحديث: {new Date().toLocaleDateString('ar-SA')} • مصدر موثوق (MOH)
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
