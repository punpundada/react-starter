import React from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { DateTimePicker } from "../ui/DatePicker";

export interface DateController<T extends FieldValues>
  extends React.HTMLAttributes<HTMLInputElement> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder: string;
  formDescription?: React.ReactNode;
  hourCycle?: 12 | 24;
  disabled?: boolean;
  startMonth?: Date;
  endMonth?: Date;
}

const DateController = <T extends FieldValues>(props: DateController<T>) => {
  return (
    <FormField
      control={props.control}
      name={props.name}
      disabled={props.disabled}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{props.label}</FormLabel>
            <DateTimePicker
              hourCycle={props.hourCycle ?? 24}
              {...field}
              placeholder={props.placeholder}
              // displayFormat={{hour24:"dd/mm/yyyy"}}
            />
            {props.formDescription && (
              <FormDescription>Set your date and time.</FormDescription>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default DateController;
