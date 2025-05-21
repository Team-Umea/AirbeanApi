import { useEffect, useState } from "react";
import drone2 from "../assets/drone2.svg";

// Exempel på order-prop, byt ut mot riktig data i din app!
const exampleOrder = {
  id: "12345",
  countdownSeconds: 10,
  order_items: [
    { product_name: "Bryggkaffe", quantity: 2 },
    { product_name: "Latte", quantity: 1 },
  ],
};

const Orderstatus = ({ order = exampleOrder }) => {
  const [secondsLeft, setSecondsLeft] = useState(order.countdownSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  // Formatera sekunder som mm:ss
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-amber-100 mt-12">
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
          <ul className="divide-y divide-gray-200">
            {order.order_items.map((item, idx) => (
              <li key={idx} className="py-2 flex justify-between">
                <span>{item.product_name || item.product_id}</span>
                <span>x{item.quantity}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Orderstatus;
