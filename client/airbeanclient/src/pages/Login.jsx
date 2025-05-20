import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "../components/utils/Form";
import FormInput from "../components/utils/FormInput";
import MaxWidthWrapper from "../components/utils/MaxWidthWrapper";
import PrimaryButton from "../components/btn/PrimaryButton";

const loginSchema = z.object({
  username: z.string().nonempty("Användarnamn får inte vara tomt"),
  password: z.string().nonempty("Lösenord får inte vara tomt"),
});

const Login = () => {
  const formMehtods = useForm({ resolver: zodResolver(loginSchema) });

  const {
    formState: { errors },
  } = formMehtods;

  const onSubmit = (data) => {
    console.log("Data: ", data);
  };

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <FormProvider {...formMehtods}>
          <Form onSubmit={onSubmit} className="max-w-xl">
            <FormInput name="username" label="Användarnamn" />
            <FormInput name="password" label="Lösenord" />
            <PrimaryButton buttonText="Logga in" />
          </Form>
        </FormProvider>
      </div>
    </MaxWidthWrapper>
  );
};

export default Login;
