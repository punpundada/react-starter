import { cn } from "@/lib/utils";

export type MessageProps = {
  className: string;
  text: string;
  by:string
};

function Message(props: MessageProps) {
  return (
    <div className={cn("w-96 rounded-xl border-2 p-2", props.className)}>
        <span className="block">{props.text}</span>
        {/* <span>{props.by}</span> */}
    </div>
  );
}

export default Message;
