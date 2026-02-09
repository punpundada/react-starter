import { ColumnDef, Row } from "@tanstack/react-table";

export type ExtendedColumnDef<T, K = unknown> = ColumnDef<T, K> & {
    header_className?: string;
    className?: string;
    onClick?: (
        e: React.MouseEvent<HTMLTableCellElement, MouseEvent>,
        row: Row<T>
    ) => void;
};
