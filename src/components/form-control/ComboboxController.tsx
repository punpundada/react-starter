import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Control, FieldValues, Path, useFormContext } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

interface ComboboxController<T extends FieldValues, O extends FieldValues>
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

const ComboboxController = <T extends FieldValues, O extends FieldValues>(
  props: ComboboxController<T, O>
) => {
  const form = useFormContext();
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Language</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-[200px] justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? props.options.find(
                        (option) => option.value === field.value
                      )?.label
                    : props.placeHolder ?? "Select " + props.name}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search framework..."
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {props.options.map((option) => (
                      <CommandItem
                        value={option.label}
                        key={option.value}
                        onSelect={() => {
                          form.setValue(props.name, option.value);
                        }}
                      >
                        {option.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            option.value === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormDescription>{props.formDescription}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ComboboxController;
