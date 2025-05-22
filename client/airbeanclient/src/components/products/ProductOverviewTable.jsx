const ProductOverviewTable = ({ products }) => {
  if (!products || products.length === 0) {
    return <div className="text-center text-gray-500 p-6">Inga produkter att visa.</div>;
  }
  const totalStock = products.reduce((sum, p) => sum + Number(p.stock_quantity), 0);
  const totalOrders = products.reduce((sum, p) => sum + Number(p.total_orders), 0);
  const totalEarnings = products.reduce((sum, p) => sum + Number(p.total_earnings), 0);

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full border0 shadow-md rounded-lg">
        <thead className="bg-amber-500">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-sm text-gray-700">Produktnamn</th>
            <th className="px-4 py-3 text-left font-semibold text-sm text-gray-700">
              Antal i lager
            </th>
            <th className="px-4 py-3 text-left font-semibold text-sm text-gray-700">
              Totala beställningar
            </th>
            <th className="px-4 py-3 text-left font-semibold text-sm text-gray-700">
              Totala intäkter (SEK)
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t hover:bg-amber-200">
              <td className="px-4 py-3">{product.product_name}</td>
              <td className="px-4 py-3">{product.stock_quantity}</td>
              <td className="px-4 py-3">{product.total_orders}</td>
              <td className="px-4 py-3">{Number(product.total_earnings).toFixed(2)}</td>
            </tr>
          ))}

          <tr className="border-t bg-amber-500 font-semibold">
            <td className="px-4 py-3 text-right text-gray-700">Totalt:</td>
            <td className="px-4 py-3">{totalStock}</td>
            <td className="px-4 py-3">{totalOrders}</td>
            <td className="px-4 py-3">{totalEarnings.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductOverviewTable;
