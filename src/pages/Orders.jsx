import axios from "axios";
import { useEffect, useState } from "react";

import { Card } from "../components/Card";

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://639cbc2942e3ad69273abfaa.mockapi.io/orders"
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch {
        alert("Ошибка при запросе заказов :(((");
      }
    })();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>My orders</h1>
      </div>

      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(10)] : orders).map((item, idx) => (
          <Card key={idx} loading={isLoading} {...item} />
        ))}
      </div>
    </div>
  );
};
