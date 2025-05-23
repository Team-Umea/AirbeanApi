import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import Form from "../utils/Form";
import FormInput from "../utils/FormInput";
import PrimaryButton from "../btn/PrimaryButton";
import FormTextarea from "../utils/FormTextarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../../api/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Modal from "../utils/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../../store/manageProductSlice";

const updateProductSchema = z.object({
  productName: z
    .string("Produktnamn måste vara en sträng")
    .nonempty("Produktnamn är obligatoriskt"),
  productInfo: z
    .string("Produktinformation måste vara en sträng")
    .min(10, "Produktinformation måste vara minst 10 tecken lång")
    .max(5000, "Produktinformation får inte vara längre än 5000 tecken"),
  cost: z
    .number("Pris måste vara ett nummer")
    .positive("Pris måste vara ett positivt nummer")
    .max(100000, "Pris får inte vara mer än 100 000"),
  stockQuantity: z
    .number("Lagerkvantitet måste vara ett nummer")
    .positive("Lagerkvantitet måste vara ett positivt nummer")
    .max(100000, "Du kan inte ha mer än 100 000 av denna vara i lager"),
});

const UpdateProductForm = () => {
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.manageProduct.product);
  const formMehtods = useForm({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      productName: selectedProduct.product_name,
      productInfo: selectedProduct.product_info,
      cost: selectedProduct.cost,
      stockQuantity: selectedProduct.stock_quantity,
    },
  });

  const queryClient = useQueryClient();

  const { isPending } = formMehtods;

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: (data) => {
      toast.success(`Produkten ${data.product_name} har uppdaterats`);
      Modal.close();
      queryClient.invalidateQueries(["manageProducts"]);
      dispatch(setProduct(null));
    },
    onError: (err) => {
      let errorMessage;

      switch (err.status) {
        case 401:
          errorMessage = "Din session har gått ut, logga in igen för att fortsätta";
          break;
        default:
          errorMessage = "Ett fel uppstod vid uppdatering av produkt, var snäll och försök igen";
          break;
      }

      toast.error(errorMessage);
    },
  });

  const onSubmit = (data) =>
    updateProductMutation.mutate({ ...data, productId: selectedProduct.id });

  return (
    <FormProvider {...formMehtods}>
      <Form onSubmit={onSubmit} className="pt-0!">
        <FormInput name="productName" label="Namn" className="mt-8!" />
        <FormTextarea name="productInfo" label="Beskrivning" className="mt-2!" />
        <FormInput name="cost" type="number" label="Pris (SEK)" className="mt-8!" />
        <FormInput name="stockQuantity" type="number" label="Antal i lager" className="mt-8!" />
        <PrimaryButton type="submit" className="mt-12!" disabled={isPending}>
          Uppdatera
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        </PrimaryButton>
      </Form>
    </FormProvider>
  );
};

export default UpdateProductForm;
