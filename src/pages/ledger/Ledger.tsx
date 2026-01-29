import ComboboxController from "@/components/form-control/ComboboxController";
import { MultiSelect } from "@/components/form-control/multi-select";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

const Ledger = () => {
  const form = useForm({
    defaultValues: {
      name: undefined,
      place: [],
    },
  });
  return (
    <div className="p-8">
      <Form {...form}>
        <form
          className="grid grid-cols-3"
          onSubmit={form.handleSubmit((data) =>
            alert(JSON.stringify(data, null, 2))
          )}
        >
          <ComboboxController
            control={form.control}
            name="name"
            options={[
              { label: "Username", value: "john_doe" },
              { label: "Email", value: "john@example.com" },
              { label: "Phone", value: "+1234567890" },
              { label: "City", value: "New York" },
              { label: "Country", value: "USA" },
              { label: "Age", value: 30 },
              { label: "Occupation", value: "Software Engineer" },
              { label: "Company", value: "Tech Corp" },
              { label: "Membership", value: "Premium" },
              { label: "Status", value: "Active" },
            ]}
            placeHolder="Select Name"
            label="Name"
          />
          <MultiSelect
            control={form.control}
            name="place"
            options={[
              { label: "Username", value: "john_doe" },
              { label: "Email", value: "john@example.com" },
              { label: "Phone", value: "+1234567890" },
              { label: "City", value: "New York" },
              { label: "Country", value: "USA" },
              { label: "Age", value: "AGE" },
              { label: "Occupation", value: "Software Engineer" },
              { label: "Company", value: "Tech Corp" },
              { label: "Membership", value: "Premium" },
              { label: "Status", value: "Active" },
            ]}
            label="Name"
            placeholder="select Name"
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default Ledger;
