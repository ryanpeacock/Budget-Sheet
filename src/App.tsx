import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./components/app/AppSidebar";
import BudgetSheet from "./components/app/BudgetSheet";
import { Toaster } from "@/components/ui/toaster";

export default function App() {
  return (
    <SidebarProvider>
      <div className="main-container flex w-full">
        <AppSidebar />
        <div className="body-area flex-1 px-5 py-0 bg-green-900">
          <div className="container w-full lg:w-5/6 mx-auto bg-yellow-400 h-full p-3">
            <BudgetSheet />
          </div>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}
