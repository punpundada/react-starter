import { axisInstance } from "@/lib/constants";
import * as XLSX from "xlsx";

export type CodeTableOptions = {
    ColumnName: string;
    CodeValue: string;
    Description: string;
};

export async function codeTableService(columnName: string) {
    const res = await axisInstance.get<CodeTableOptions[]>(
        `codetable?column_name=${columnName}`,
    );
    return res.data.map((x) => ({ value: x.CodeValue, label: x.Description }));
}

export type ExcelColumn<T> = {
    header: string;
    key: keyof T;
    width?: number;
};

export async function downloadBlob(blob: Blob, fileName: string) {
    // Feature detection
    const hasFileSystemAccess = "showSaveFilePicker" in window;

    if (hasFileSystemAccess) {
        // Modern API (Chrome, Edge, Opera)
        try {
            const handle = await (window as any).showSaveFilePicker({
                suggestedName: fileName,
                types: [
                    {
                        description: "All files",
                        accept: { "*/*": [".*"] },
                    },
                ],
            });

            const writable = await handle.createWritable();
            await writable.write(blob);
            await writable.close();
        } catch (err) {
            // User probably cancelled the dialog
            console.error("Save cancelled or failed:", err);
        }
    } else {
        // Fallback for other browsers (Firefox, Safari)
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = fileName;
        anchor.click();
        window.URL.revokeObjectURL(url);
    }
}

export function exportToExcel<T>(
    columns: ExcelColumn<T>[],
    data: T[],
    fileName: string,
) {
    const headers = columns.map((col) => col.header);

    const rows: unknown[][] = data.map((item) =>
        columns.map((col) => item[col.key] ?? ""),
    );
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, fileName);

    const excelBuffer: ArrayBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
    });

    const blob: Blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocuments.spreadsheetml.sheet",
    });

    downloadBlob(blob, fileName);
}
