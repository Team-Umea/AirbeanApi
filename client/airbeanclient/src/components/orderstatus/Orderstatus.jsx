import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import drone2 from "../../assets/drone2.svg";

const BASE_URL = "http://localhost:3000";
const DELIVERY_SECONDS = 90;

const Orderstatus = () => {
  const [order, setOrder] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(null);
  const [showingLatest, setShowingLatest] = useState(false);
  const [hasAnyOrder, setHasAnyOrder] = useState(true);

  const profileId = useSelector((state) => state.auth.userID);
  const isLoading = useSelector((state) => state.auth.isLoading);

  // Hämta aktiv order och dess items
  const fetchOrder = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/orders/active`, {
        withCredentials: true,
      });
      const data = res.data;
      if (data && data.id) {
        setOrder(data);
        setShowingLatest(false);
        setHasAnyOrder(true);

        // Timer
        const orderTime = new Date(data.order_date).getTime();
        const now = Date.now();
        const elapsed = Math.floor((now - orderTime) / 1000); // Skillnad i sekunder
        const left = Math.max(DELIVERY_SECONDS - elapsed, 0);

        if (left > 0) {
          setSecondsLeft(left);
        } else {
          setSecondsLeft(0);
        }
      } else {
        fetchLatestOrder();
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("Ingen aktiv order hittades.");
        setOrder(null);
        setSecondsLeft(null);
        setHasAnyOrder(false);
      } else {
        console.error("Error fetching order:", error);
        fetchLatestOrder();
      }
    }
  };

  // Hämta senaste ordern med profileId
  const fetchLatestOrder = async () => {
    try {
      if (!profileId) {
        setOrder(null);
        setSecondsLeft(null);
        setHasAnyOrder(false);
        return;
      }
      const res = await axios.get(
        `${BASE_URL}/api/orders/history/${profileId}`,
        { withCredentials: true }
      );
      const orders = res.data;

      if (orders && orders.length > 0) {
        setOrder(orders[0]);
        setSecondsLeft(0);
        setShowingLatest(true);
        setHasAnyOrder(true);
      } else {
        setOrder(null);
        setSecondsLeft(null);
      }
    } catch (error) {
      console.error("Error fetching order history:", error);
      setOrder(null);
      setSecondsLeft(null);
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
    }
  };

  useEffect(() => {
    if (!isLoading && profileId) {
      fetchOrder();
    }
    // eslint-disable-next-line
  }, [isLoading, profileId]);

  useEffect(() => {
    if (secondsLeft === null) return;

    if (secondsLeft > 0) {
      const timer = setInterval(() => {
        setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    } else if (secondsLeft === 0 && order && order.id && !showingLatest) {
      // Uppdatera status endast om timern har räknat ner till 0
      (async () => {
        try {
          await updateOrderStatusToDelivered(order.id);
          fetchOrder(); // Hämta ordern igen efter statusuppdatering
        } catch (error) {
          console.error("Failed to update order status:", error);
        }
      })();
    }
  }, [secondsLeft]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (!hasAnyOrder) {
    return null;
  }

  if (isLoading || !profileId || secondsLeft === null || !order) {
    return <div>Laddar orderstatus...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-start bg-amber-100 mt-12">
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
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
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
            : "Ordern är levererad! 🎉"}
        </h1>
        <p className="text-lg text-gray-800 mb-2 text-center">
          Ordernummer: <span className="font-semibold">{order.id}</span>
        </p>
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
          <ul>
            {order.order_items?.map((item, idx) => (
              <li key={idx}>
                <span>{item.product_name || item.product_id}</span>
                <span> x {item.quantity}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm text-gray-500 mt-2 text-center">
          {order.order_date &&
            new Date(order.order_date).toLocaleString("sv-SE", {
              timeZone: "Europe/Stockholm",
            })}
        </div>
      </div>
    </div>
  );
};

export default Orderstatus;
