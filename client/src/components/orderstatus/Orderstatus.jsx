import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import drone2 from "../../assets/drone2.svg";

const BASE_URL = "http://localhost:3000";
const DELIVERY_SECONDS = 10;

const Orderstatus = () => {
  const [order, setOrder] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [showingLatest, setShowingLatest] = useState(false);
  const profileId = useSelector((state) => state.auth.userID);

  // Format seconds as mm:ss
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  useEffect(() => {
    if (profileId) {
      fetchActiveOrder();
    }
  }, [profileId]);

  useEffect(() => {
    if (order && order.order_date) {
      const deliveryTime =
        new Date(order.order_date).getTime() + DELIVERY_SECONDS * 1000;
      const timeLeft = Math.max(
        0,
        Math.round((deliveryTime - new Date().getTime()) / 1000)
      );
      setSecondsLeft(timeLeft);
      setShowingLatest(false);
    }
  }, [order]);

  useEffect(() => {
    if (secondsLeft > 0) {
      const timer = setInterval(() => {
        setSecondsLeft((prevSeconds) => Math.max(0, prevSeconds - 1));
      }, 1000);
      return () => clearInterval(timer);
    } else if (secondsLeft === 0 && order) {
      // När nedräkningen är klar, uppdatera orderstatus till "Levererad"
      updateOrderStatusToDelivered(order.id);
    }
  }, [secondsLeft, order]);

  const fetchActiveOrder = async () => {
    try {
      if (!profileId) {
        setOrder(null);
        setSecondsLeft(null);
        return;
      }
      const res = await axios.get(`${BASE_URL}/api/orders/active`, {
        withCredentials: true,
      });
      const activeOrder = res.data;

      if (activeOrder) {
        setOrder(activeOrder);
        setShowingLatest(false);
      } else {
        // Om ingen aktiv order hittas, hämta senaste ordern
        fetchLatestOrder();
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Om ingen aktiv order hittas, hämta senaste ordern
        fetchLatestOrder();
      } else {
        console.error("Error fetching order:", error);
        setError(error);
      }
    }
  };

  // Hämta senaste ordern med profileId
  const fetchLatestOrder = async () => {
    try {
      if (!profileId) {
        setOrder(null);
        setSecondsLeft(null);
        return;
      }
      const res = await axios.get(`${BASE_URL}/api/orders/with-items/profile`, {
        withCredentials: true,
      });
      const orders = res.data;

      if (orders && orders.length > 0) {
        setOrder(orders[0]);
        setSecondsLeft(0);
        setShowingLatest(true);
      } else {
        setOrder(null);
        setSecondsLeft(null);
      }
    } catch (error) {
      console.error("Error fetching order history:", error);
      setOrder(null);
      setSecondsLeft(null);
      setError(error);
    }
  };

  const updateOrderStatusToDelivered = async (orderId) => {
    try {
      await axios.patch(
        `${BASE_URL}/api/orders/${orderId}/status`,
        { newStatus: "Levererad" },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error updating order status:", error);
      setError(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start bg-amber-100 mt-6 rounded-lg shadow-lg">
      <style>
        {`
          @keyframes drone-fly {
            0% { transform: translateX(0); }
            25% { transform: translateX(-40px); }
            50% { transform: translateX(0); }
            75% { transform: translateX(40px); }
            100% { transform: translateX(0); }
          }
          .drone-anim {
            display: inline-block;
            animation: drone-fly 2s infinite ease-in-out;
            font-size: 2.5rem;
            margin-bottom: 1rem;
          }
        `}
      </style>
      <div className="bg-white shadow-lg rounded-lg p-9 max-w-md w-full">
        {secondsLeft > 0 && (
          <div className="flex justify-center">
            <img
              src={drone2}
              alt="drönare"
              className="drone-anim"
              style={{ width: "60px", height: "60px" }}
            />
          </div>
        )}
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          {secondsLeft > 0
            ? "Din beställning är på väg!"
            : showingLatest
            ? "Din senaste order"
            : "Ordern är levererad! ☕"}
        </h1>
        {order && (
          <>
            <div className="grid grid-cols-1 gap-2 mb-4">
              <div className="text-lg text-gray-800 text-center">
                Ordernummer: <span className="font-semibold">{order.id}</span>
              </div>
              <div className="text-sm text-gray-500 text-center">
                {new Date(order.order_date).toLocaleString("sv-SE", {
                  timeZone: "Europe/Stockholm",
                  hour: "2-digit",
                  minute: "2-digit",
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  second: undefined,
                })}
              </div>
            </div>
            <div className="flex flex-col items-center mb-4">
              {secondsLeft > 0 ? (
                <span className="text-3xl font-mono text-gray-800">
                  {formatTime(secondsLeft)}
                </span>
              ) : (
                <span className="text-2xl font-bold text-gray-800">
                  Tack för din beställning!
                </span>
              )}
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Artiklar:</h2>
              <ul className="list-disc list-inside">
                {order && order.order_items && order.order_items.length > 0 ? (
                  order.order_items.map((item, idx) => (
                    <li key={`${order.id}-${idx}`}>
                      <span className="mr-2">
                        {item.product_name || item.product_id}
                      </span>
                      <span className="text-gray-500">x {item.quantity}</span>
                    </li>
                  ))
                ) : (
                  <li>Inga artiklar hittades</li>
                )}
              </ul>
            </div>
            <div className="text-sm text-gray-500 mt-2 text-center">
              <span className="font-semibold">Totalt:</span>{" "}
              <span className="text-green-600">{order.total_amount} kr</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Orderstatus;
