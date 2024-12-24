import {
  BudgetType,
  RowItemsType,
  RowItemType,
  RowType,
  TableType,
} from "@/types/budget";
import { v4 as uuidv4 } from "uuid";

export const generateNewRow = (tableId: string): RowType => {
  const rowId = uuidv4();

  const createRowItem = (
    name: string,
    value: string | number,
    isInput: boolean,
    inputType?: string
  ): RowItemType => ({
    id: uuidv4(),
    rowId,
    name,
    value,
    isInput,
    inputType,
  });

  return {
    id: rowId,
    tableId,
    setType: "none",
    rowItems: {
      name: createRowItem("name", "", false),
      date: createRowItem("date", "", true, "text"),
      biWeekly: createRowItem("biWeekly", 0, true, "number"),
      monthly: createRowItem("monthly", 0, true, "number"),
      yearly: createRowItem("yearly", 0, true, "number"),
    },
  };
};

export const generateNewTable = (
  budgetId: string,
  name?: string
): TableType => {
  const tableId = uuidv4();
  return {
    id: tableId,
    budgetId,
    name: name ? name : "A New Budget Category",
    totals: {
      biWeekly: 0,
      monthly: 0,
      yearly: 0,
    },
    rows: [generateNewRow(tableId)],
  };
};

export const generateNewBudget = (): BudgetType => {
  const budgetId = uuidv4();
  return {
    id: budgetId,
    name: "",
    incomeTable: generateNewTable(budgetId, "Income"),
    expenseTables: [generateNewTable(budgetId)],
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

export const getLockMultipledRowItems = (
  setType: "biWeekly" | "monthly" | "yearly",
  rowItems: RowItemsType
): RowItemsType => {
  const updatedRowItems = { ...rowItems };

  const biWeeklyItem = updatedRowItems["biWeekly"];
  const monthlyItem = updatedRowItems["monthly"];
  const yearlyItem = updatedRowItems["yearly"];
  if (setType === "biWeekly") {
    monthlyItem.value = Math.ceil(
      parseFloat(`${biWeeklyItem.value}`) * 2
    ).toFixed(2);
    yearlyItem.value = Math.ceil(
      parseFloat(`${biWeeklyItem.value}`) * 24
    ).toFixed(2);
  }
  if (setType === "monthly") {
    biWeeklyItem.value = Math.ceil(
      parseFloat(`${monthlyItem.value}`) / 2
    ).toFixed(2);
    yearlyItem.value = Math.ceil(
      parseFloat(`${monthlyItem.value}`) * 12
    ).toFixed(2);
  }
  if (setType === "yearly") {
    biWeeklyItem.value = Math.ceil(
      parseFloat(`${yearlyItem.value}`) / 24
    ).toFixed(2);
    monthlyItem.value = Math.ceil(
      parseFloat(`${yearlyItem.value}`) / 12
    ).toFixed(2);
  }
  return updatedRowItems;
};
