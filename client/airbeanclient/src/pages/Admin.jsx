import { useQuery } from "@tanstack/react-query";
import { getProductOverview } from "../api/api";
import { Loader2 } from "lucide-react";
import ProductOverviewTable from "../components/products/ProductOverviewTable";

const AdminPage = () => {
  const {
    data: products,
    isPending,
    error,
  } = useQuery({
    queryFn: getProductOverview,
    queryKey: ["productOverview"],
  });

  if (isPending) {
    return (
      <div className="p-10! flex justify-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <h2 className="p-8 text-xl font-bold text-red-500">
        Ett fel uppstod vid hämtning av produkter
      </h2>
    );
  }

  return (
    <div>
      <h2 className="mt-8 p-8 text-xl text-gray-700">Totala försäljningar och intäkter</h2>
      <div className="p-4 md:px-20">
        <ProductOverviewTable products={products} />
      </div>
    </div>
  );
};

export default AdminPage;
