import { Table } from "./table.model"
import { Graph } from "./graph.model";

export interface Result {
  result_type: "table" | "graph";
  data: Table | Graph;
}
