import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "../components/utils/Form";
import FormInput from "../components/utils/FormInput";
import MaxWidthWrapper from "../components/utils/MaxWidthWrapper";
import PrimaryButton from "../components/btn/PrimaryButton";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
  username: z.string().nonempty("Användarnamn får inte vara tomt"),
  password: z.string().nonempty("Lösenord får inte vara tomt"),
});

const Login = () => {
  const navigate = useNavigate();
  const formMehtods = useForm({ resolver: zodResolver(loginSchema) });
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      //store user data in redux
      toast.success("Logged in successfully");
      navigate("/");
    },
    onError: (err) => {
      const errorMessage =
        err.response?.data?.issues?.[0]?.message ||
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "An unknown error occurred";

      toast.error(errorMessage);
    },
  });

  const { isPending } = loginMutation;

  const onSubmit = (data) => loginMutation.mutate(data);

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <FormProvider {...formMehtods}>
          <Form onSubmit={onSubmit} className="max-w-xl">
            <FormInput name="username" label="Användarnamn" />
            <FormInput name="password" label="Lösenord" />
            <PrimaryButton>
              Logga in
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            </PrimaryButton>
          </Form>
        </FormProvider>
      </div>
    </MaxWidthWrapper>
  );
};

export default Login;
