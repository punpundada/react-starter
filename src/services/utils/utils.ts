import { axisInstance } from "@/lib/constants";

export type CodeTableOptions = {
  ColumnName: string;
  CodeValue: string;
  Description: string;
};

export async function codeTableService(columnName: string) {
  const res = await axisInstance.get<CodeTableOptions[]>(
    `codetable?column_name=${columnName}`,
  );
  return res.data;
}
