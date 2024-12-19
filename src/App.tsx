import { SidebarProvider } from "@/components/ui/sidebar";
import BudgetSheet from "./components/app/Budget/BudgetSheet.container";
import { Toaster } from "@/components/ui/toaster";

export default function App() {
  return (
    <SidebarProvider>
      <div className="body-area flex-1 px-5 py-0 bg-green-900 w-full">
        <div className="container w-full md:w-4/6 mx-auto bg-white h-full">
          <BudgetSheet />
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}
