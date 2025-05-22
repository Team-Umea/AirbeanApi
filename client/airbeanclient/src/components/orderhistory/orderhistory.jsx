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
        setOrders(Array.isArray(res.data) ? res.data.slice(0, 10) : []);
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
      <h2 className="text-2xl font-bold mb-4">Orderhistorik</h2>
      {orders.map((order) => (
        <div key={order.id} className="mb-6 p-4 bg-white rounded shadow">
          <div className="font-semibold mb-2">
            Order #{order.id} - {new Date(order.createdAt).toLocaleString()}
          </div>
          <div>Status: {order.order_status}</div>
          <ul className="mt-2">
            {order.order_items?.map((item, idx) => (
              <li key={idx} className="flex justify-between border-b py-1">
                <span>{item.product_name || item.product_id}</span>
                <span>x{item.quantity}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
