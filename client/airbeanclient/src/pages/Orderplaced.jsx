import { useEffect, useState } from "react";

const Orderplaced = ({ order }) => {
  // order: { id, order_items, countdownSeconds }
  const [secondsLeft, setSecondsLeft] = useState(order.countdownSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  // Format seconds as mm:ss
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-green-700 mb-4 text-center">
          Din beställning är på väg!
        </h1>
        <p className="text-lg text-gray-700 mb-2 text-center">
          Ordernummer: <span className="font-semibold">{order.id}</span>
        </p>
        <div className="flex flex-col items-center mb-4">
          <span className="text-3xl font-mono text-green-600">
            {formatTime(secondsLeft)}
          </span>
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

export default Orderplaced;
