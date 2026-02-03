import { InputController } from "@/components/form-control/InputController";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { LoginScehemaType, LoginSchema } from "@/type/auth/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, ShipWheel, EyeOff } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "@/store/slices/auth";
import { toast } from "sonner";
import navyLogo from "@/assets/Indian_Navy_Insignia2.svg.png";
import { useLogin } from "@/hooks/auth-hooks";
import { Spinner } from "@/components/ui/spinner";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = React.useState(false);
  const { mutateAsync, isPending } = useLogin();
  const form = useForm<LoginScehemaType>({
    defaultValues: {
      password: "",
      username: "",
    },
    shouldFocusError: true,
    mode: "onBlur",
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginScehemaType) => {
    const response = await mutateAsync(data);
    dispatch(
      authActions.setUser({
        department: response.department,
        name: response.name,
        rank: response.rank,
        roles: response.roles,
        stationCode: response.stationCode,
        username: response.username,
        selectedRole: response.roles[0],
      }),
    );
    toast.success(`Welcome ${response.rank} ${response.name}`);
    navigate("/");
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <ShipWheel className="size-4" />
            </div>
            Indian Navy
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <p className="text-2xl font-semibold text-center uppercase">
              Login to Audit Module
            </p>
            <p className="text-2xl font-semibold text-center">DOCKYARD</p>
            <Form {...form}>
              <form
                className="pt-10 space-y-4 "
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <InputController
                  control={form.control}
                  name="username"
                  placeholder="Enter LoginId"
                  label="Username"
                />
                <InputController
                  control={form.control}
                  name="password"
                  placeholder="Enter Password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  btnIcon={!showPassword ? <Eye size={36} /> : <EyeOff />}
                  onBtnClick={() => setShowPassword((s) => !s)}
                />
                <Button className="w-full mt-12" disabled={isPending}>
                  {isPending ? (
                    <span className="flex justify-center gap-3 items-center">
                      <Spinner /> Please Wait
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <div className="bg-muted shadow-2xl hidden lg:flex justify-center items-center ">
        <img
          src={navyLogo}
          alt="Image"
          className=" w-1/2 h-2/3 object-contain dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default Login;
/*
      <div className="grid grid-cols-2 w-1/2 h-[55%] rounded-tl-none rounded-br-2xl bg-accent rounded-r-xl z-10">
        <Card className="h-full rounded-tl-none rounded-bl-none">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle> 
            <CardDescription>Login to your account...</CardDescription>
            
          </CardHeader>
        </Card>
        <div className="flex justify-center items-center gap-3 flex-col">
          
          <img src={image} alt="image" className="object-contain w-1/2" />
        </div>
      </div>
*/
