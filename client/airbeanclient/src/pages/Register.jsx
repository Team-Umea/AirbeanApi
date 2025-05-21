import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "../components/utils/Form";
import FormInput from "../components/utils/FormInput";
import MaxWidthWrapper from "../components/utils/MaxWidthWrapper";
import PrimaryButton from "../components/btn/PrimaryButton";
import { useMutation } from "@tanstack/react-query";
import { register } from "../api/api";
import { toast } from "sonner";
import { ArrowRight, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setEmail,
  setIsAdmin,
  setIsAuthenticated,
  setUserID,
  setUsername,
} from "../store/authSlice";

const registerSchema = z.object({
  username: z.string().nonempty("Användarnamn får inte vara tomt"),
  email: z.string().email("Ogiltig e-postadress"),
  password: z.string().nonempty("Lösenord får inte vara tomt"),
});

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formMehtods = useForm({ resolver: zodResolver(registerSchema) });
  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      dispatch(setIsAuthenticated(true));
      dispatch(setUserID(data.id));
      dispatch(setUsername(data.username));
      dispatch(setEmail(data.email));

      if (data.role && data.role === "admin") {
        dispatch(setIsAdmin(true));
      }

      toast.success("Gratis! Ditt konto har skapats");
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

  const { isPending } = registerMutation;

  const onSubmit = (data) => registerMutation.mutate(data);

  return (
    <MaxWidthWrapper>
      <div className="mt-20! flex flex-col items-center justify-center">
        <h1 className="text-2xl font-medium">
          Skapa ett <span className="text-orange-600 font-bold">konto</span>.
        </h1>
        <Link
          to="/login"
          className="mt-4! font-semibold border-b border-transparent transition-all duration-200 ease hover:border-amber-700 focus:border-amber-700 outline-none">
          <span className="text-amber-700 flex items-center gap-x-1">
            Har du redan ett konto? <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
        <FormProvider {...formMehtods}>
          <Form onSubmit={onSubmit} className="max-w-xl">
            <FormInput name="username" label="Användarnamn" className="mt-2!" />
            <FormInput name="email" label="E-postadress" className="mt-8!" />
            <FormInput name="password" type="password" label="Lösenord" className="mt-8!" />
            <PrimaryButton type="submit" className="mt-12!" disabled={isPending}>
              Skapa konto
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            </PrimaryButton>
          </Form>
        </FormProvider>
      </div>
    </MaxWidthWrapper>
  );
};

export default Register;
