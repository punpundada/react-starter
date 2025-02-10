import { InputController } from "@/components/form-control/InputController";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { LoginScehemaType, LoginSchema } from "@/type/auth/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import image from "@/assets/indian-navy-seeklogo.png";
import { Eye } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions, selectUser } from "@/store/slices/auth";
import { InteractiveGridPattern } from "@/components/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [showPassword, setShowPassword] = React.useState(false);
  const form = useForm<LoginScehemaType>({
    defaultValues: {
      password: "",
      username: "",
    },
    shouldFocusError: true,
    mode: "onBlur",
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: LoginScehemaType) => {
    console.log(JSON.stringify(data, null, 2));
    toast.success("Welcome " + data.username);
    dispatch(authActions.setUser(data));
    navigate("/");
  };
  React.useLayoutEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="grid grid-cols-2 w-1/2 h-[55%] rounded-tl-none rounded-bl-2xl bg-blue-700 rounded-r-xl z-10">
        <Card className="h-full rounded-tl-none rounded-bl-none">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Login to your ILMS account</CardDescription>
            <Form {...form}>
              <form
                className="pt-10 space-y-4 "
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <InputController
                  control={form.control}
                  name="username"
                  placeholder="Enter Username/LoginId"
                  label="Username"
                />
                <InputController
                  control={form.control}
                  name="password"
                  placeholder="Enter Password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  btnIcon={<Eye size={36} />}
                  onBtnClick={() => setShowPassword((s) => !s)}
                />
                <Button className="w-full mt-12">Sign In</Button>
              </form>
            </Form>
          </CardHeader>
        </Card>
        <div className="flex justify-center items-center">
          <img src={image} alt="image" className="object-contain w-1/2" />
        </div>
      </div>
      <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
        )}
        width={30}
        height={30}
        squares={[80, 80]}
        squaresClassName="hover:fill-blue-500"
      />
    </div>
  );
};

export default Login;
