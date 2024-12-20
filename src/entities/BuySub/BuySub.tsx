"use client";
import { useEffect, useState } from "react";
import axios from "axios"; // Импортируем Axios
import styles from "./BuySub.module.css"; // Импортируем стили
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { backendApiUrl } from "@/src/utils/backendApiUrl";
import Header from "../Header/Header";

interface Subscription {
  id: number;
  name: string;
  price: number;
  description: string;
}

const BuySub: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<
    number | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true); // Состояние загрузки
  const router = useRouter();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get<Subscription[]>(
          `${backendApiUrl}/subscription`
        );
        setSubscriptions(response.data);
      } catch (error) {
        console.error("Ошибка при получении подписок:", error);
      } finally {
        setLoading(false); // Устанавливаем состояние загрузки в false после завершения
      }
    };
    fetchSubscriptions();
  }, []);

  const handleCheckboxChange = (id: number) => {
    setSelectedSubscriptionId(id);
  };

  const handlePurchase = async () => {
    const token = Cookies.get("token");
    if (!token || selectedSubscriptionId === null) {
      return alert("Пожалуйста, выберите подписку и войдите в систему.");
    }
    try {
      const response = await axios.post(
        `${backendApiUrl}/subscription/purchase/${selectedSubscriptionId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 201) {
        alert("Подписка успешно приобретена!");
        router.push("/profile"); // Перенаправление на страницу профиля
      } else {
        alert("Ошибка при покупке подписки: " + response.data.message);
      }
    } catch (error: any) {
      // Указываем тип error как any
      alert(
        "Ошибка при покупке подписки: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>Загрузка подписок...</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.header}>Выберите подписку</h1>
        <div className={styles.subscriptionList}>
          {subscriptions.map((subscription) => (
            <div key={subscription.id} className={styles.subscriptionItem}>
              <input
                type="checkbox"
                id={`subscription-${subscription.id}`}
                name="subscription"
                value={subscription.id}
                onChange={() => handleCheckboxChange(subscription.id)}
              />
              <label htmlFor={`subscription-${subscription.id}`}>
                <h2>{subscription.name}</h2>
                <p>Цена: {subscription.price} руб.</p>
                <p>Описание: {subscription.description}</p>
              </label>
            </div>
          ))}
        </div>
        <button className={styles.purchaseButton} onClick={handlePurchase}>
          Купить подписку
        </button>
      </div>
    </div>
  );
};

export default BuySub;
