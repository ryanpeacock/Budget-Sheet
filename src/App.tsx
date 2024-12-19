import { SidebarProvider } from "@/components/ui/sidebar";
import BudgetSheet from "./components/app/Budget/BudgetSheet.container";
import { Toaster } from "@/components/ui/toaster";
import AppSidebar from "./components/app/AppSidebar";

export default function App() {
  return (
    <SidebarProvider>
      <div className="main-container flex w-full">
        <AppSidebar />
        <div className="body-area flex-1 px-5 py-0 bg-green-900">
          <div className="container w-full md:w-11/12 mx-auto bg-white h-full">
            <BudgetSheet />
          </div>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}
