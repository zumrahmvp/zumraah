import { Link, useLocation } from "wouter";
import { Home, User, FileText, Menu, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { icon: Home, label: "الرئيسية", path: "/" },
    { icon: User, label: "خدماتي", path: "/services" },
    { icon: FileText, label: "مركباتي", path: "/vehicles" }, // Placeholder
    { icon: Menu, label: "المزيد", path: "/more" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans" dir="rtl">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/images/absher_logo_placeholder.png" alt="Absher" className="h-8 w-auto hidden" /> {/* Placeholder for logo if needed */}
            <h1 className="text-xl font-bold tracking-wide">أبشر</h1>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="w-6 h-6 cursor-pointer hover:text-accent transition-colors" />
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4 pb-24 animate-in fade-in duration-500">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 pb-safe">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = location === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <div className={cn(
                  "flex flex-col items-center justify-center w-full h-full gap-1 transition-all duration-200 cursor-pointer",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-primary/70"
                )}>
                  <item.icon className={cn("w-6 h-6", isActive && "fill-current")} />
                  <span className="text-[10px] font-medium">{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 w-12 h-1 bg-primary rounded-t-full" />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
