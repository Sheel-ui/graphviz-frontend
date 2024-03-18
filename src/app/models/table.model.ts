export interface Table {
  columns: string[];
  rows: Row[];
}

interface Row {
  [key: string]: any;
}
