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
import { format, getYear } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ScrollArea } from "../ui/scroll-area";

export interface DateController<T extends FieldValues>
  extends React.HTMLAttributes<HTMLInputElement> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder: string;
  formDescription?: React.ReactNode;
  hourCycle: 12 | 24;
  disabled?: boolean;
  startMonth?: Date;
  endMonth?: Date;
}

const DateController = <T extends FieldValues>(props: DateController<T>) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [time, setTime] = React.useState<string>("05:00");
  const [date, setDate] = React.useState<Date | null>(null);
  return (
    <FormField
      control={props.control}
      name={props.name}
      disabled={props.disabled}
      render={({ field }) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handleChange = (e: any) => {
          field.onChange(e);
          if (props.onChange) props.onChange(e);
        };
        return (
          <FormField
          control={props.control}
          name="datetime"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Datetime</FormLabel>
              <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        `${format(field.value, "PPP")}, ${time}`
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 flex items-start"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    captionLayout="dropdown"
                    selected={date || field.value}
                    onSelect={(selectedDate) => {
                      const [hours, minutes] = time?.split(":")!;
                      selectedDate?.setHours(
                        parseInt(hours),
                        parseInt(minutes)
                      );
                      setDate(selectedDate!);
                      field.onChange(selectedDate);
                    }}
                    onDayClick={() => setIsOpen(false)}
                    endMonth={new Date(2500)}
                    startMonth={new Date(1980)}
                    disabled={(date) =>
                      Number(date) < Date.now() - 1000 * 60 * 60 * 24 ||
                      Number(date) > Date.now() + 1000 * 60 * 60 * 24 * 30
                    }
                  />
                  <Select
                    defaultValue={time!}
                    onValueChange={(e) => {
                      setTime(e);
                      if (date) {
                        const [hours, minutes] = e.split(":");
                        const newDate = new Date(date.getTime());
                        newDate.setHours(parseInt(hours), parseInt(minutes));
                        setDate(newDate);
                        field.onChange(newDate);
                      }
                    }}
                    open={true}
                  >
                    <SelectTrigger className="font-normal focus:ring-0 w-[120px] my-4 mr-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-none shadow-none mr-2 fixed top-2 left-0">
                      <ScrollArea className="h-[15rem]">
                        {Array.from({ length: 96 }).map((_, i) => {
                          const hour = Math.floor(i / 4)
                            .toString()
                            .padStart(2, "0");
                          const minute = ((i % 4) * 15)
                            .toString()
                            .padStart(2, "0");
                          return (
                            <SelectItem key={i} value={`${hour}:${minute}`}>
                              {hour}:{minute}
                            </SelectItem>
                          );
                        })}
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                </PopoverContent>
              </Popover>
              <FormDescription>Set your date and time.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        );
      }}
    />
  );
};

export default DateController;

// <FormItem className="w-full">
//   {props.label && <FormLabel>{props.label}</FormLabel>}
//   <FormControl className="w-full">
//     <DateTimePicker
//       hourCycle={12}
//       {...field}
//       onChange={handleChange}
//     />
//   </FormControl>
//   {props.formDescription && (
//     <FormDescription>{props.formDescription}</FormDescription>
//   )}
//   <FormMessage />
// </FormItem>
