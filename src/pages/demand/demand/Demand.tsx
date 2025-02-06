import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { InputController } from "@/components/form-control/InputController";
import { Button } from "@/components/ui/button";
import PageLayout from "@/layout/PageLayout";
import { DemandFilter, DemandFilterSchema } from "@/type/demand/demand";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { MultiSelect } from "@/components/form-control/multi-select";
import DateController from "@/components/form-control/DateController";
import SelectController from "@/components/form-control/SelectController";

const breadcrumList = [
  {
    name: "Dashboard",
    path: "/",
  },
  {
    name: "_Demand",
    path: "/demand/demand",
  },
  {
    name: "Demand List",
    path: "/demand/demand",
  },
];

const Demand = () => {
  const navigate = useNavigate();
  const form = useForm<DemandFilter>({
    defaultValues: {
      authType: "",
      customerCode: "",
      date: new Date(),
      DateRegistred: null,
      dateRequiredBy: new Date(),
      demandNo: "",
      demandQuantity: 0,
      desc: "",
      eqptItemCode: "",
      itemCode: "",
      priorityCode: "",
      ref: "",
      shNo: "",
      urgencyRef: "",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
    mode: "onChange",
    shouldFocusError: true,
    resolver: zodResolver(DemandFilterSchema),
  });

  const onSubmit = (data: DemandFilter) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <PageLayout breadcrumList={breadcrumList} title={"ILMS | Demand"}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Demand List</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <InputController
                control={form.control}
                name="customerCode"
                placeholder="Customer Code"
                label="Customer Code"
                type="number"
                maxLength={4}
              />
              <InputController
                control={form.control}
                name="demandNo"
                placeholder="Enter Demand Number"
                label="Demand Number"
              />
              <DateController
                control={form.control}
                hourCycle={24}
                name="date"
                placeholder="Enter Date"
                label="Date"
              />
              <InputController
                control={form.control}
                name="dateRequiredBy"
                placeholder="Date Rquired By"
                label="Date Required By"
              />
              <DateController
                name="DateRegistred"
                control={form.control}
                placeholder="Enter Date Time Registred"
                label="Date Time Registred"
                hourCycle={24}
              />
              <InputController
                control={form.control}
                name="urgencyRef"
                placeholder="Urgency Ref"
                label="Urgency Ref"
              />
              <InputController
                control={form.control}
                name="itemCode"
                placeholder="Item Code"
                label="Item Code"
                onChange={(e) => {
                  form.setValue(
                    "itemCode",
                    e?.currentTarget?.value?.toUpperCase()
                  );
                }}
              />
              <div className="h-10">
                <MultiSelect
                  onValueChange={(e) => {
                    console.log(e);
                  }}
                  options={[
                    { label: "akjdnakn akndkan aksjdnas", value: "1" },
                    { label: "2asndas anda ad", value: "2" },
                    { label: "3", value: "3" },
                    { label: "4", value: "4" },
                    { label: "5", value: "5" },
                    { label: "6", value: "6" },
                    { label: "7", value: "7" },
                    { label: "8", value: "8" },
                    { label: "9", value: "9" },
                    { label: "10", value: "10" },
                  ]}
                  control={form.control}
                  name="users"
                  label="Users"
                  placeholder="Select users"
                />
              </div>
              <SelectController
                control={form.control}
                name="users"
                options={[
                  { label: "akjdnakn akndkan aksjdnas", value: "1" },
                  { label: "2asndas anda ad", value: "2" },
                  { label: "3", value: "3" },
                  { label: "4", value: "4" },
                  { label: "5", value: "5" },
                  { label: "6", value: "6" },
                  { label: "7", value: "7" },
                  { label: "8", value: "8" },
                  { label: "9", value: "9" },
                ]}
                label="Users"
                placeHolder="Select user"
              />
              {/* <DateController
                control={form.control}
                name="date"
                placeholder="Date"
                hourCycle={12}
                label="Date"
                endMonth={new Date(2500)}
                startMonth={new Date(1980)}
              /> */}
              <div className="space-x-4 col-span-full flex justify-end pt-10">
                <Button
                  type="button"
                  onClick={() => form.reset()}
                  variant={"outline"}
                >
                  Reset
                </Button>
                <Button
                  type="button"
                  variant={"secondary"}
                  onClick={() => navigate("../..")}
                >
                  Back
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default Demand;
