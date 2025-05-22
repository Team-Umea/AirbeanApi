import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const profileId = useSelector((state) => state.auth.userID);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      if (!profileId) return;
      try {
        const res = await axios.get(
          `${BASE_URL}/api/orders/history/${profileId}`,
          {
            withCredentials: true,
          }
        );
        const uniqueOrders = Array.isArray(res.data)
          ? res.data.filter(
              (order, index, self) =>
                index === self.findIndex((o) => o.id === order.id)
            )
          : [];
        setOrders(uniqueOrders.slice(0, 10));
      } catch (error) {
        console.error("Error fetching order history:", error);
        setOrders([]);
      }
    };
    fetchOrderHistory();
  }, [profileId]);

  if (!profileId) {
    return <div>Du måste vara inloggad för att se orderhistorik.</div>;
  }

  if (!Array.isArray(orders) || !orders.length) {
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
