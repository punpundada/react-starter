import z from "zod";

export const DemandFilterSchema = z.object({
  customerCode: z.coerce
    .number({ required_error: "Customer code is required" })
    .int("Customer code cannot be float type")
    .min(1000, { message: "Customer code must be a 4-digit number" })
    .max(9999, { message: "Customer code must be a 4-digit number" })
    // .optional()
    ,
  demandNo: z.string(),
  date: z.coerce.date(),
  dateRequiredBy: z.coerce.date(),
  priorityCode: z.string(),
  DateRegistred: z.coerce.date(),
  urgencyRef: z.string(),
  itemCode: z
    .string({ required_error: "Item code is required" })
    .nonempty({ message: "Item code is required" })
    .toUpperCase(),
  demandQuantity: z.number(),
  desc: z.string(),
  shNo: z.string(),
  eqptItemCode: z.string(),
  authType: z.string(),
  ref: z.string(),
});

export type DemandFilter = z.infer<typeof DemandFilterSchema>;
