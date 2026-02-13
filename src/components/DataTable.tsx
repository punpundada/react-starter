
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    SortingState,
    getPaginationRowModel,
    getSortedRowModel,
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
import { Spinner } from "./ui/spinner";
import React from "react";

interface DataTableProps<TData, TValue> {
    columns: ExtendedColumnDef<TData, TValue>[];
    data: TData[];
    className?: string;
    getRowClassName?: (row: TData, index: number) => string;
    columnPinning?: boolean;
    loading?: boolean;
    maxHeight: string;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    className,
    getRowClassName,
    loading,
    maxHeight,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    });

    return (
        <div
            className={cn(
                `overflow-y-auto rounded-md border relative h-[380px]`,
            )}
        >
            <Table className="">
                <TableHeader className="text-sm">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                const colDef = header.column.columnDef as any;
                                return (
                                    <TableHead
                                        key={header.id}
                                        className={cn("sticky top-0 z-10", {
                                            [colDef.header_className]: !!colDef.header_className,
                                        })}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
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
                                        const colDef = cell.column.columnDef as any;
                                        return (
                                            <TableCell
                                                key={cell.id}
                                                className={cn("", { [colDef?.className]: !!colDef?.className })}
                                                onClick={(e) => {
                                                    if (colDef?.onClick) {
                                                        colDef?.onClick(e, row);
                                                    }
                                                }}

                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })
                    ) : loading ? (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24">
                                <div className="flex justify-center items-center">
                                    <Spinner />
                                </div>
                            </TableCell>
                        </TableRow>
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

/*
    <div className="w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
      <div className="relative border rounded-xl overflow-hidden">
        <div className="overflow-x-auto overscroll-x-contain scrollbar-thin">
          <Table className={cn(" px-4", className)}>
            <TableHeader className="">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const colDef = header.column.columnDef as any;
                    return (
                      <TableHead
                        key={header.id}
                        className={cn("sticky top-0 z-10", {
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
                                header.getContext(),
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
                              `${colDef?.className ? colDef?.className : ""}`,
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
                              cell.getContext(),
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              ) : loading ? (
                <>
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 flex justify-center items-center"
                    >
                      <Spinner />
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
*/
