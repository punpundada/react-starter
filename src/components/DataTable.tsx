/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Column,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ExtendedColumnDef } from "@/type/utils";
import { CSSProperties } from "react";
import { Pin, PinOff } from "lucide-react";

const getCommonPinningStyles = <TData,>(
  column: Column<TData>
): CSSProperties => {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");

  return {
    boxShadow: isLastLeftPinnedColumn
      ? "-4px 0 4px -4px gray inset"
      : isFirstRightPinnedColumn
      ? "4px 0 4px -4px gray inset"
      : undefined,
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    opacity: isPinned ? 0.95 : 1,
    position: isPinned ? "sticky" : "relative",
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
};

interface DataTableProps<TData, TValue> {
  columns: ExtendedColumnDef<TData, TValue>[];
  data: TData[];
  className?: string;
  getRowClassName?: (row: TData, index: number) => string;
  columnPinning?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  className,
  getRowClassName,
  columnPinning,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="relative border rounded-xl">
      <Table className={cn(" px-4  overflow-auto ", className)}>
        <TableHeader className="">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const colDef = header.column.columnDef as any;
                return (
                  <TableHead
                    key={header.id}
                    className={cn("sticky top-0 left-0", {
                      [colDef.header_className]: !!colDef.header_className,
                    })}
                    style={{ ...getCommonPinningStyles(header.column) }}
                  >
                    <div
                      className={cn("whitespace-nowrap font-semibold", {
                        "flex gap-3 items-center justify-center":
                          !!columnPinning,
                      })}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {!header.isPlaceholder &&
                        header.column.getCanPin() &&
                        columnPinning && (
                          <div className="flex gap-1 justify-center">
                            {header.column.getIsPinned() !== "left" ? (
                              <button
                                className="border rounded px-2"
                                onClick={() => {
                                  header.column.pin("left");
                                }}
                              >
                                <Pin size={16} />
                              </button>
                            ) : null}
                            {header.column.getIsPinned() ? (
                              <button
                                className="border rounded px-2"
                                onClick={() => {
                                  header.column.pin(false);
                                }}
                              >
                                <PinOff size={16} />
                              </button>
                            ) : null}
                          </div>
                        )}
                    </div>
                    <div
                      {...{
                        onDoubleClick: () => header.column.resetSize(),
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        className: `resizer ${
                          header.column.getIsResizing() ? "isResizing" : ""
                        }`,
                      }}
                    />
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, rowIndex) => {
              let rowClassName = "";
              if (getRowClassName) {
                rowClassName = getRowClassName(row.original, rowIndex);
              }
              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(rowClassName)}
                >
                  {row.getVisibleCells().map((cell) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const colDef = cell.column.columnDef as any;
                    return (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          `${colDef?.className ? colDef?.className : ""}`
                        )}
                        onClick={(e) => {
                          if (colDef?.onClick) {
                            colDef?.onClick(e, row);
                          }
                        }}
                        style={{ ...getCommonPinningStyles(cell.column) }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
export default DataTable;
