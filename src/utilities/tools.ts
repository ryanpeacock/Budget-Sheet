import { TableRowType, TableType } from "@/types/budget";
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
        inputType: "text",
      },
      {
        id: uuidv4(),
        name: "date",
        value: "",
        inputType: "text",
      },
      {
        id: uuidv4(),
        name: "biWeekly",
        value: 0,
        inputType: "number",
      },
      {
        id: uuidv4(),
        name: "monthly",
        value: 0,
        inputType: "number",
      },
      {
        id: uuidv4(),
        name: "yearly",
        value: 0,
        inputType: "number",
      },
    ],
  };
};

export const generateNewTable = (): TableType => {
  return {
    id: uuidv4(),
    name: "A New Budget Category",
    rows: [generateNewRow()],
  };
};
