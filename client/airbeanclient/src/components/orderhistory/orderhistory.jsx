import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderHistory } from "../../store/orderSlice";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const profileId = useSelector((state) => state.auth.userID);
  const { orders, status, error } = useSelector((state) => state.order);

  useEffect(() => {
    if (profileId) {
      dispatch(fetchOrderHistory(profileId));
    }
  }, [profileId, dispatch]);

  if (!profileId) {
    return <div>Du måste vara inloggad för att se orderhistorik.</div>;
  }

  if (status === "loading") {
    return <div>Laddar orderhistorik...</div>;
  }

  if (error) {
    return (
      <div className="m-8">Fel vid hämtning av orderhistorik: {error}</div>
    );
  }

  if (!orders.length) {
    return <div className="m-8">Ingen orderhistorik hittades.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Orderhistorik</h2>
      <ul>
        {orders.map((order, idx) => (
          <li
            key={`${order.id}-${idx}`}
            className="mb-6 p-4 bg-white rounded shadow"
          >
            <span className="font-semibold m-2">
              Order #{order.id} -{" "}
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
            <span>Status: {order.order_status}</span>
            <ul>
              {(order.items || order.order_items)?.map((item, index) => (
                <li key={`${item.product_id}-${index}`}>
                  <span className="m-2">
                    {item.product_name || item.product_id}
                  </span>
                  <span className="m-1">x{item.quantity}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
