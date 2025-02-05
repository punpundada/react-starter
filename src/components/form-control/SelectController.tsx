import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues, Path, Control } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface SelectControllerProps<T extends FieldValues, O extends FieldValues>
  extends React.HTMLAttributes<HTMLSelectElement> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeHolder?: string;
  options: O[];
  formDescription?: React.ReactNode;
  returnVal?: keyof O;
  listDisplay?: keyof O;
}

const SelectController = <T extends FieldValues, O extends FieldValues>({
  name,
  control,
  label,
  placeHolder,
  options,
  formDescription,
  returnVal,
  listDisplay,
}: SelectControllerProps<T, O>) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeHolder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((x) => {
                return (
                  <SelectItem key={x.id} value={returnVal ? returnVal : x.id}>
                    {listDisplay ? x[listDisplay] : x.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          {formDescription && (
            <FormDescription>{formDescription}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectController;
