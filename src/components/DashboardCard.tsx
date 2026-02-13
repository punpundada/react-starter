import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";

export type DashboardCardProps = {
    children: React.ReactNode;
    title: string;
    navigateTo?: string
}
export function DashboardCard(props: DashboardCardProps) {
    const navigate = useNavigate()

    return (
        <Card
            className={cn(`bg-secondary opacity-90 ${props.navigateTo ?? "hover:cursor-pointer"}`)}
            onClick={() => props.navigateTo && navigate(props.navigateTo)}
        >
            <CardHeader>
                <CardTitle>{props.title}</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
                {props.children}
            </CardContent>
        </Card>
    )
}
