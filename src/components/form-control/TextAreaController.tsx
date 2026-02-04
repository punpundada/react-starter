import React from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface TextAreaControllerProps<T extends FieldValues>
  extends React.HTMLAttributes<HTMLTextAreaElement> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  disabled?: boolean;
  placeholder: string;
  formDescription?: React.ReactNode;
  maxLength?: number;
  max?: number;
  min?: number;
  minLength?: number;
  btnIcon?: React.ReactElement;
  onBtnClick?: () => void;
}

export const TextAreaController = <T extends FieldValues>({
  control,
  disabled,
  name,
  label,
  className,
  placeholder,
  formDescription,
  onChange,
  onBlur,
  ...rest
}: TextAreaControllerProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      render={({ field }) => {
        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
          field.onChange(e);
          if (onChange) onChange(e);
        };
        const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement, Element>) => {
          field.onBlur();
          if (onBlur) onBlur(e);
        };
        return (
          <FormItem className="w-full">
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl className="w-full">
              <div className="relative">
                <Textarea
                  placeholder={placeholder}
                  {...field}
                  {...rest}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={cn("w-full", className)}
                />
                {rest.btnIcon && (
                  <Button
                    variant={"ghost"}
                    className="absolute right-1 top-0"
                    onClick={rest.onBtnClick}
                    type="button"
                  >
                    {rest.btnIcon}
                  </Button>
                )}
              </div>
            </FormControl>
            {formDescription && (
              <FormDescription>{formDescription}</FormDescription>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
