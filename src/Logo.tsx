import { Calculator } from "lucide-react";

export default function Logo() {
  return (
    <div className="inline-flex flex-col p-1 text-green-800">
      <div className="flex flex-col font-bold  text-xl">
        <span className="m-0 ml-1">Budget</span>
        <span className="ml-9 -mt-2">App</span>
      </div>
      <Calculator size="35px" className=" -mt-6" />
    </div>
  );
}
