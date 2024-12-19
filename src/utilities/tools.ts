import { BudgetType, TableRowType, TableType } from "@/types/budget";
import { v4 as uuidv4 } from "uuid";

export const generateNewRow = (): TableRowType => {
  return {
    id: uuidv4(),
    setType: "none",
    rowItems: [
      {
        id: uuidv4(),
        name: "name",
        value: "",
        isInput: false,
      },
      {
        id: uuidv4(),
        name: "date",
        value: "",
        isInput: true,
        inputType: "text",
      },
      {
        id: uuidv4(),
        name: "biWeekly",
        value: 0,
        isInput: true,
        inputType: "number",
      },
      {
        id: uuidv4(),
        name: "monthly",
        value: 0,
        isInput: true,
        inputType: "number",
      },
      {
        id: uuidv4(),
        name: "yearly",
        value: 0,
        isInput: true,
        inputType: "number",
      },
    ],
  };
};

export const generateNewTable = (name?: string): TableType => {
  return {
    id: uuidv4(),
    name: name ? name : "A New Budget Category",
    totals: {
      biWeekly: 0,
      monthly: 0,
      yearly: 0,
    },
    rows: [generateNewRow()],
  };
};

export const generateNewBudget = (): BudgetType => {
  return {
    id: uuidv4(),
    name: "",
    incomeTable: generateNewTable("Income"),
    expenseTables: [generateNewTable()],
    budgetTotals: {
      leftToBudget: {
        biWeekly: 0,
        monthly: 0,
        yearly: 0,
      },
      totalExpenses: {
        biWeekly: 0,
        monthly: 0,
        yearly: 0,
      },
    },
  };
};

export const getOtherSetTypes = (
  setType: "biWeekly" | "monthly" | "yearly"
): Array<string> => {
  let types = ["biWeekly", "monthly", "yearly"];
  return types.filter((item) => item !== setType);
};
