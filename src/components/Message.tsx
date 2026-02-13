import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/store";
import { parseISO, format } from 'date-fns';

export type MessageProps = {
    text: string;
    byRole: string;
    by: string;
    messageDate: string
};

function Message(props: MessageProps) {
    const selectedRole = useAppSelector(s => s.authReducer.user?.selectedRole);
    const className = props.byRole !== selectedRole ? "bg-secondary" : "bg-blue-400"
    const shouldStickEnd = props.byRole !== selectedRole ? "" : "self-end"

    const dateObj = parseISO(props.messageDate)
    const readableDate = format(dateObj, "MMMM do, yyyy");
    return (
        <div className={`${shouldStickEnd} space-y-1`}>
            <div className={cn("w-96 rounded-xl border-2 p-2", className)}>
                <span className="block">{props.text}</span>
            </div>
            <div
                className={cn(`text-black text-sm ${props.byRole === selectedRole ? "text-end pr-2" : "pl-2"} `)}
            >
                {readableDate}
            </div>
        </div>
    );
}

export default Message;
