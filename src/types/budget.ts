export type TableRowItemType = {
  readonly id: string;
  name: string;
  value: string | number;
  inputType: string;
};

export type TableRowType = {
  readonly id: string;
  setType: "none" | "biWeekly" | "monthly" | "yearly";
  rowItems: TableRowItemType[];
};

export type TableType = {
  readonly id: string;
  name: string;
  rows: Array<TableRowType>;
};

export type BudgetType = {
  readonly id: string;
  name: string;
  tables: Array<TableType>;
};
