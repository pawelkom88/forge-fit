import { Input } from "@/components/ui/input.tsx";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CircleHelp } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DateString } from "@/utils/ts-helpers.ts";
import { Button } from "@/components/ui/button.tsx";

const formSchema = z.object({
  workoutDate: z
    .custom<DateString | "">()
    .refine(
      (date) => {
        const [year] = date.split("-").map(Number);
        return year >= 2025;
      },
      {
        message: "Year must be at least 2025",
      },
    )
    .refine(
      (date) => {
        const [, month] = date.split("-").map(Number);
        return month >= 1 && month <= 12;
      },
      {
        message: "Month must be between 1 and 12",
      },
    )
    .refine(
      (date) => {
        const [year, month, day] = date.split("-").map(Number);
        const lastDayOfMonth = new Date(year, month, 0).getDate();
        return day >= 1 && day <= lastDayOfMonth;
      },
      {
        message:
          "Day must be valid for the given month (e.g., not 31 for February)",
      },
    )
    .refine(
      (date) => /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(date),
      {
        message: "Must be in YYYY-MM-DD format (e.g., 2024-01-25)",
      },
    ),
});

// TODO: add a lot of tests

export function WorkoutDateInput({
  onDateChange,
}: {
  onDateChange: (date: Date) => void;
}) {
  const [overlay, setOverlay] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workoutDate: "",
    },
  });

  const handleInputChange = (value: string) => {
    const cleanedValue = value.replace(/\D/g, "");

    return cleanedValue
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(\d{4}-\d{2})(\d)/, "$1-$2");
  };

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    if (values.workoutDate) {
      onDateChange(new Date(values.workoutDate));
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="workoutDate"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <FormLabel className="text-lg">Workout date</FormLabel>
                  <Alert onShowAlert={() => setOverlay(!overlay)} />
                </div>
                <FormControl>
                  <div className=" flex gap-2">
                    <Input
                      {...field}
                      id="workout-date"
                      type="text"
                      maxLength={10}
                      placeholder="Enter date in YYYY-MM-DD format"
                      className="p-2 focus-visible:bg-focusVisible focus-visible:placeholder:text-black placeholder:text-sm sm:basis-72"
                      value={field.value}
                      onChange={(e) => {
                        const formattedValue = handleInputChange(
                          e.target.value,
                        );
                        field.onChange(formattedValue);
                      }}
                    />
                    <Button
                      onClick={() => onDateChange(new Date())}
                      className="text-white hover:bg-teriary focus:text-black text-sm focus-visible:bg-focusVisible sm:basis-28"
                      type="reset"
                    >
                      Reset to current date
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="text-lg" />
                <br />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
}

function Alert({ onShowAlert }: { onShowAlert: () => void }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        aria-label="Open popover with more information"
        onClick={onShowAlert}
      >
        <CircleHelp className="ml-2" size={18} />
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[350px] rounded sm:max-w-[500px]">
        <AlertDialogHeader>
          <AlertDialogTitle>How it works ?</AlertDialogTitle>
          <AlertDialogDescription className="text-black text-lg text-pretty">
            Enter the date in YYYY-MM-DD format. After inputting the date, press{" "}
            <kbd className="bg-gray-200 rounded px-1 py-0.5 text-sm font-mono border border-gray-400 shadow-sm">
              Enter
            </kbd>{" "}
            key and the date will be searched in the calendar below. Dashes are
            applied automatically.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:bg-teriary bg-black hover:text-white text-white">
            Close
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
