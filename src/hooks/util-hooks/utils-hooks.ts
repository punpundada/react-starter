import { codeTableService } from "@/services/utils/utils";
import { useQuery } from "@tanstack/react-query";

export function useCodeTable(columnName: string) {
  return useQuery({
    queryKey: ["util", "code-table", columnName],
    queryFn: () => codeTableService(columnName),
    enabled: !!columnName,
    staleTime: Infinity,
  });
}
