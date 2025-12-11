import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, FileText, Car, HeartPulse, ChevronLeft, AlertTriangle } from "lucide-react";

export default function Home() {
  const bloodType = localStorage.getItem("userBloodType");
  const services = [
    { title: "خدماتي", icon: User, color: "text-green-600", bg: "bg-green-50" },
    { title: "مركباتي", icon: Car, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "أفراد الأسرة", icon: User, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "عمالتي", icon: FileText, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-l from-primary to-green-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/images/absher_login_bg.png')] bg-cover bg-center" />
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-1">مرحباً، عبدالله</h2>
          <p className="text-green-100 text-sm opacity-90">آخر دخول: اليوم 09:41 ص</p>
        </div>
      </div>

      {/* New Feature Alert */}
      {!bloodType ? (
        <Link href="/blood-type-entry">
          <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:bg-red-100 transition-colors shadow-sm group">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <HeartPulse className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-red-900">تحديث البيانات الصحية</h3>
              <p className="text-xs text-red-700 mt-1">أضف فصيلة دمك الآن لتعزيز سلامتك في حالات الطوارئ</p>
            </div>
            <ChevronLeft className="w-5 h-5 text-red-400" />
          </div>
        </Link>
      ) : (
        <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <HeartPulse className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-green-900">البيانات الصحية محدثة</h3>
            <p className="text-xs text-green-700 mt-1">فصيلة الدم ({bloodType}) مضافة للهوية الرقمية</p>
          </div>
        </div>
      )}

      {/* Digital ID Shortcut */}
      <Link href="/digital-id">
        <Card className="border-none shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden group">
          <CardContent className="p-0 flex h-24">
            <div className="w-2 bg-primary h-full" />
            <div className="flex-1 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">الهوية الرقمية</h3>
                  <p className="text-xs text-muted-foreground">عرض بطاقة الهوية ورمز QR</p>
                </div>
              </div>
              <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:-translate-x-1 transition-transform" />
            </div>
          </CardContent>
        </Card>
      </Link>

      {/* Services Grid */}
      <div>
        <h3 className="font-bold text-lg mb-4 text-gray-800">الخدمات الإلكترونية</h3>
        <div className="grid grid-cols-2 gap-4">
          {services.map((service, idx) => (
            <Card key={idx} className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 flex flex-col items-center justify-center gap-3 text-center h-32">
                <div className={`w-12 h-12 ${service.bg} rounded-full flex items-center justify-center`}>
                  <service.icon className={`w-6 h-6 ${service.color}`} />
                </div>
                <span className="font-medium text-sm text-gray-700">{service.title}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
