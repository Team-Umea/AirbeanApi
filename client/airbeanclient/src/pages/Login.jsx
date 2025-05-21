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
import { ArrowRight, Loader2 } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SecondaryButton from "../components/btn/SecondaryButton";
import { getQueryParams } from "../lib/utitls";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setIsAdmin,
  setIsAuthenticated,
  setUserID,
  setUsername,
} from "../store/authSlice";

const loginSchema = z.object({
  username: z.string().nonempty("Användarnamn får inte vara tomt"),
  password: z.string().nonempty("Lösenord får inte vara tomt"),
});

const Login = () => {
  const location = useLocation();
  const role = getQueryParams(location).get("as");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const formMehtods = useForm({ resolver: zodResolver(loginSchema) });
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      dispatch(setIsAuthenticated(true));
      dispatch(setUserID(data.id));
      dispatch(setUsername(data.username));
      dispatch(setEmail(data.email));

      if (role === "admin") {
        dispatch(setIsAdmin(true));
      }

      toast.success("Inloggningen lyckades");

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/profil");
      }
    },
    onError: (err) => {
      let errorMessage = "";

      switch (err.status) {
        case 400:
          errorMessage = "Fel användarnamn eller lösenord";
          break;
        case 401:
          errorMessage = "Du har inte admin behörighet";
          break;
        case 500:
          errorMessage = "Servern svarade med ett fel, var snäll och försök igen";
          break;
        default:
          errorMessage = "Ett oväntat fel inträffade, var snäll och försök igen";
          break;
      }

      toast.error(errorMessage);
    },
  });

  const { isPending } = loginMutation;

  const onSubmit = (data) => loginMutation.mutate({ ...data, role });

  const handleRoleToggle = () => {
    const searchParams = getQueryParams(location);

    if (role === "admin") {
      searchParams.delete("as");
    } else {
      searchParams.set("as", "admin");
    }

    navigate(
      {
        pathname: location.pathname,
        search: searchParams.toString(),
      },
      { replace: false }
    );
  };

  return (
    <MaxWidthWrapper>
      <div className="mt-20! flex flex-col items-center justify-center">
        <h1 className="text-2xl font-medium">
          Logga in med ditt{" "}
          <span className="text-orange-600 font-bold">{role === "admin" ? "admin" : "kund"}</span>{" "}
          konto.
        </h1>
        <Link
          to="/register"
          className="mt-4! font-semibold border-b border-transparent transition-all duration-200 ease hover:border-amber-700 focus:border-amber-700 outline-none">
          <span className="text-amber-700 flex items-center gap-x-1">
            Har du inget konto? <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
        <FormProvider {...formMehtods}>
          <Form onSubmit={onSubmit} className="max-w-xl">
            <FormInput name="username" label="Användarnamn" className="mt-2!" />
            <FormInput name="password" type="password" label="Lösenord" className="mt-8!" />
            <PrimaryButton type="submit" className="mt-12!" disabled={isPending}>
              Logga in
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            </PrimaryButton>
            <div className="relative w-full mt-14!">
              <div aria-hidden="true" className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-amber-100 px-2 relative z-10">eller</span>
              </div>
            </div>
            <SecondaryButton onClick={handleRoleToggle} className="mt-12!" disabled={isPending}>
              {role === "admin" ? "Fortsätt som kund" : "Fortsätt som admin"}
            </SecondaryButton>
          </Form>
        </FormProvider>
      </div>
    </MaxWidthWrapper>
  );
};

export default Login;
