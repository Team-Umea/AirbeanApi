import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderHistory } from "../../store/orderSlice";
import SecondaryButton from "../btn/SecondaryButton";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const profileId = useSelector((state) => state.auth.userID);
  const { orders, status, error } = useSelector((state) => state.order);
  const [visibleOrders, setVisibleOrders] = useState([]);
  const [ordersToShow, setOrdersToShow] = useState(5);
  const [showLoadMore, setShowLoadMore] = useState(false);

  useEffect(() => {
    if (profileId) {
      dispatch(fetchOrderHistory(profileId));
    }
  }, [profileId, dispatch]);

  useEffect(() => {
    if (orders && orders.length > 0) {
      setVisibleOrders(orders.slice(0, ordersToShow));
      setShowLoadMore(orders.length > ordersToShow);
    }
  }, [orders, ordersToShow]);

  const handleLoadMore = () => {
    const newOrdersToShow = ordersToShow + 5;
    setVisibleOrders(orders.slice(0, newOrdersToShow));
    setOrdersToShow(newOrdersToShow);
    setShowLoadMore(orders.length > newOrdersToShow);
  };

  if (!profileId) {
    return <div>Du måste vara inloggad för att se orderhistorik.</div>;
  }

  if (status === "loading") {
    return <div>Laddar orderhistorik...</div>;
  }

  if (error) {
    console.error("Error i OrderHistory:", error);
    return (
      <div className="m-8">
        Fel vid hämtning av orderhistorik:{" "}
        {typeof error === "string"
          ? error
          : error.message || "Ett fel inträffade"}
      </div>
    );
  }

  if (!orders.length) {
    return <div className="m-8">Ingen orderhistorik hittades.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-[#4a2c2a] rounded-lg shadow-lg p-6">
      <h2 className="text-2xl text-white font-bold mb-4 text-center rounded-t-xl p-4">
        Orderhistorik
      </h2>
      <ul className="space-y-4">
        {visibleOrders.map((order, idx) => (
          <li
            key={`${order.id}-${idx}`}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 p-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-semibold">Order #{order.id}</span>
              </div>
              <div className="text-right">
                <span className="text-gray-600">
                  {new Date(order.order_date).toLocaleString("sv-SE", {
                    timeZone: "Europe/Stockholm",
                    hour: "2-digit",
                    minute: "2-digit",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    second: undefined,
                  })}
                </span>
              </div>
            </div>
            <div className="mt-2">
              <span className="font-semibold">Status:</span>{" "}
              <span className="text-blue-500">{order.order_status}</span>
            </div>
            <div className="mt-2">
              <span className="font-semibold">Artiklar:</span>
              <ul className="list-disc list-inside">
                {order.order_items?.map((item, index) => (
                  <li key={`${order.id}-${index}`}>
                    <span className="mr-2">
                      {item.product_name || item.product_id}
                    </span>
                    <span className="text-gray-500">x{item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-2">
              <span className="font-semibold">Totalt:</span>{" "}
              <span className="text-green-600">{order.total_amount} kr</span>
            </div>
          </li>
        ))}
      </ul>
      {showLoadMore && (
        <SecondaryButton
          className="max-w-fit text-white font-bold m-auto py-2 px-4 rounded mt-4"
          onClick={handleLoadMore}
        >
          Ladda fler ordrar
        </SecondaryButton>
      )}
    </div>
  );
};

export default OrderHistory;
