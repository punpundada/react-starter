import ComboboxController from "@/components/form-control/ComboboxController";
import { InputController } from "@/components/form-control/InputController";
import Message from "@/components/Message";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useCodeTable } from "@/hooks/util-hooks/utils-hooks";
import { useSaveWOSReplay, useWOSCorrespondanc } from "@/hooks/wos/wos-hooks";
import PageLayout from "@/layout/PageLayout";
import { RootState, useAppSelector } from "@/store/store";
import {
  WOSCorrespondanceReplayTYpe,
  WOSResponseSchema,
  WOSResponseType,
} from "@/type/wos/wos-types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

function WOSResponse() {
  const bottomRef = React.useRef<HTMLDivElement | null>(null);

  const { wosserial } = useParams();
  const userId = useAppSelector((s: RootState) => s.authReducer.user?.username);
  const selectedRole = useAppSelector((s) => s.authReducer.user?.selectedRole);
  const stationcode = useAppSelector((s) => s.authReducer.user?.stationCode);

  const responseQuery = useWOSCorrespondanc({ wosSerial: Number(wosserial) });
  const mutaion = useSaveWOSReplay(Number(wosserial));
  const correspondanceTYpeQuery = useCodeTable("CorrespondenceType");

  const breadcrumList = React.useMemo(
    () => [
      { name: "Dashboard", path: "/" },
      { name: "WOS", path: "/wos" },
      { name: `Response : ${wosserial}`, path: "/wos/res" },
    ],
    [wosserial],
  );

  const form = useForm<WOSResponseType>({
    defaultValues: {
      loginId: userId as string,
      role: "NLAO",
      text: "",
    },
    resolver: zodResolver(WOSResponseSchema),
  });

  const scrollToBottom = React.useCallback(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, []);

  const onSubmit = async (data: WOSResponseType) => {
    const d: WOSCorrespondanceReplayTYpe = {
      CorrespondenceBy: userId!,
      CorrespondenceChoice: "A",
      CorrespondenceToRole: "LOGO",
      CorrespondenceType: "",
      DocumentType: null,
      PrimaryKeyValue: String(wosserial),
      Remarks: data.text,
      RoleName: "NLAO",
      StationCode: stationcode!,
    };
    await mutaion.mutateAsync(d);
    form.reset();
    scrollToBottom();
  };

  React.useEffect(() => {
    const timevar = setTimeout(() => {
      scrollToBottom();
    }, 1000);
    return () => {
      clearTimeout(timevar);
    };
  }, [scrollToBottom]);

  return (
    <PageLayout breadcrumList={breadcrumList} title="ILMS">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>WOS</CardTitle>
          <CardDescription>Response</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 h-[80%] relative">
          <div className="flex flex-col gap-4 px-8 h-[90%] overflow-y-auto scroll-shadow border-b-2 pb-10">
            {responseQuery.data?.map((m) => {
              return (
                <Message
                  className={
                    selectedRole !== m.RoleName
                      ? "bg-secondary"
                      : "bg-blue-400 self-end"
                  }
                  text={m.Remarks}
                  key={m.LineNo}
                  by={m.CorrespondenceBy}
                />
              );
            })}
            <div ref={bottomRef} />
          </div>
          <div className="absolute bottom-0 w-[95%]">
            <Form {...form}>
              <form
                className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="col-span-2">
                  <InputController
                    control={form.control}
                    name="text"
                    placeholder="Enter Text Here"
                    label="Response Text"
                    className="mb-2"
                  />
                </div>
                <ComboboxController
                  control={form.control}
                  name="correspondenceType"
                  options={correspondanceTYpeQuery.data ?? []}
                  label="Correspondence Type"
                />
                <Button disabled={mutaion.isPending} className="mb-2">
                  Send
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
}

export default WOSResponse;
