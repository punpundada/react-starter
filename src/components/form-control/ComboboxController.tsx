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

interface ComboboxController<
  T extends FieldValues,
  O extends FieldValues,
> extends React.HTMLAttributes<HTMLSelectElement> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeHolder?: string;
  options: O[];
  formDescription?: React.ReactNode;
  returnVal?: keyof O;
  listDisplay?: keyof O;
  disabled?: boolean;
  containerClassName?: string;
  inputPlaceholder?: string;
}

const ComboboxController = <T extends FieldValues, O extends FieldValues>(
  props: ComboboxController<T, O>,
) => {
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);

  const form = useFormContext();

  const buttonWidth = `${Number(buttonRef.current?.offsetWidth || 0)}px`;

  return (
    <FormField
      control={props.control}
      name={props.name}
      disabled={props.disabled}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col", props.containerClassName)}>
          <FormLabel>{props.label}</FormLabel>
          <Popover onOpenChange={setOpen} open={open} modal>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between shadow-lg",
                    !field.value && "text-muted-foreground",
                  )}
                  ref={buttonRef}
                  onClick={() => setOpen((p) => !p)}
                  disabled={props.disabled}
                >
                  {field.value
                    ? props.options.find((option) =>
                        option?.value.includes(field.value),
                      )?.label
                    : (props.placeHolder ?? "Select " + props.name)}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className={cn("p-0")}
              style={{ width: `${buttonWidth}` }}
            >
              <Command>
                <CommandInput
                  placeholder={
                    props.inputPlaceholder ??
                    `Search ${props.label ?? props.name}...`
                  }
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>
                    No {props.label ?? props.name} found.
                  </CommandEmpty>
                  <CommandGroup>
                    {props.options.map((option) => (
                      <CommandItem
                        value={option.label}
                        key={option.value}
                        onSelect={() => {
                          if (option.value == field.value) {
                            form.resetField(props.name);
                          } else {
                            form.setValue(props.name, option.value);
                          }
                          form.trigger(props.name);
                          setOpen(false);
                        }}
                      >
                        {option.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            option.value === field.value
                              ? "opacity-100"
                              : "opacity-0",
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
          <FormMessage className="" />
        </FormItem>
      )}
    />
  );
};

export default ComboboxController;
