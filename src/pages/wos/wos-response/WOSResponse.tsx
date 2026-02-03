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
import { useWOSCorrespondanc } from "@/hooks/wos/wos-hooks";
import PageLayout from "@/layout/PageLayout";
import { RootState, useAppSelector } from "@/store/store";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const message = [
  {
    responseText: "This is a test response message",
    responseBy: "c454545",
    responseRole: "LOGO",
    id: 1,
  },
  {
    responseText: "This is a test response message from NLAO",
    responseBy: "user1",
    responseRole: "NLAO",
    id: 2,
  },
  {
    responseText: "message from LOGO to NLAO about WOS vet quantity",
    responseBy: "c454545",
    responseRole: "LOGO",
    id: 3,
  },
  {
    responseText: `message from LOGO to NLAO about WOS vet quantity. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
     Commodi eos id molestiae nostrum dicta beatae placeat enim numquam suscipit minima cupiditate dolore, 
     veniam similique aliquid quaerat quibusdam,
     voluptas neque illo dolores nam aut error?`,
    responseBy: "c454545",
    responseRole: "LOGO",
    id: 4,
  },
  {
    responseText: `message from LOGO to NLAO about WOS vet quantity. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
     Commodi eos id molestiae nostrum dicta beatae placeat enim numquam suscipit minima cupiditate dolore, 
     veniam similique aliquid quaerat quibusdam,
     voluptas neque illo dolores nam aut error?`,
    responseBy: "c454545",
    responseRole: "LOGO",
    id: 4,
  },
  {
    responseText: `message from LOGO to NLAO about WOS vet quantity. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
     Commodi eos id molestiae nostrum dicta beatae placeat enim numquam suscipit minima cupiditate dolore, 
     veniam similique aliquid quaerat quibusdam,
     voluptas neque illo dolores nam aut error?`,
    responseBy: "c454545",
    responseRole: "LOGO",
    id: 4,
  },
  {
    responseText: `message from LOGO to NLAO about WOS vet quantity. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
     Commodi eos id molestiae nostrum dicta beatae placeat enim numquam suscipit minima cupiditate dolore, 
     veniam similique aliquid quaerat quibusdam,
     voluptas neque illo dolores nam aut error?`,
    responseBy: "c454545",
    responseRole: "LOGO",
    id: 4,
  },
  {
    responseText: `message from LOGO to NLAO about WOS vet quantity. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
     Commodi eos id molestiae nostrum dicta beatae placeat enim numquam suscipit minima cupiditate dolore, 
     veniam similique aliquid quaerat quibusdam,
     voluptas neque illo dolores nam aut error?`,
    responseBy: "c454545",
    responseRole: "LOGO",
    id: 4,
  },
  {
    responseText: `message from LOGO to NLAO about WOS vet quantity. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
     Commodi eos id molestiae nostrum dicta beatae placeat enim numquam suscipit minima cupiditate dolore, 
     veniam similique aliquid quaerat quibusdam,
     voluptas neque illo dolores nam aut error?`,
    responseBy: "c454545",
    responseRole: "LOGO",
    id: 4,
  },
  {
    responseText: "This is a test response message from NLAO",
    responseBy: "user1",
    responseRole: "NLAO",
    id: 5,
  },
  {
    responseText: "This is a test response message from NLAO",
    responseBy: "user1",
    responseRole: "NLAO",
    id: 6,
  },
  {
    responseText:
      "This is a test response message from NLAO. rejecting the proposal",
    responseBy: "user1",
    responseRole: "NLAO",
    id: 7,
  },
];

type WOSResponseType = {
  text: string;
  loginId: string;
  role: string;
};

function WOSResponse() {
  const bottomRef = React.useRef<HTMLDivElement | null>(null);

  const { wosserial } = useParams();
  const userId = useSelector((s: RootState) => s.authReducer.user?.username);
  const selectedRole = useAppSelector(s=>s.authReducer.user?.selectedRole)

  const responseQuery = useWOSCorrespondanc({ wosSerial: Number(wosserial) });

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
  });

  React.useEffect(() => {
    const scrollToBottom = () => {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    };
    const timevar = setTimeout(() => {
      scrollToBottom();
    }, 1000);
    return () => {
      clearTimeout(timevar);
    };
  }, []);

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
                    selectedRole !== m.CorrespondenceToRole
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
              <form className="flex gap-2">
                <InputController
                  control={form.control}
                  name="text"
                  placeholder="Enter Text Here"
                />
                <Button>Send</Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
}

export default WOSResponse;
