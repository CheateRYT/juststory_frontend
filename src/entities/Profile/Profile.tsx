"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../../lib/entities/user/userSlice";
import { RootState } from "../../../lib/store";
import { updateSubscription } from "../../../lib/entities/subscription/subscritpionSlice";
import Cookies from "js-cookie";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styles from "./Profile.module.css";
import { validateToken } from "../../utils/validateToken";
const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  const [subscriptionData, setSubscriptionData] = useState({
    id: 1,
    name: "",
    price: "",
    daysPeriod: 30,
    description: "",
  });

  // Новые состояния для отслеживания успешности обновления
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      validateToken(token).then((valid) => {
        if (!valid) {
          router.push("/login");
        }
      });
    } else {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    } else {
      dispatch(getUserProfile());
    }
  }, [dispatch, router]);

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSubscriptionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateSubscription = async () => {
    if (user && user.role === "Admin") {
      try {
        await dispatch(
          updateSubscription({
            id: subscriptionData.id,
            data: subscriptionData,
          })
        ).unwrap(); // Используем unwrap для обработки успешного выполнения
        setUpdateSuccess(true);
        setUpdateError(false);
      } catch (err) {
        setUpdateSuccess(false);
        setUpdateError(true);
      }
    }
  };

  if (loading) {
    return <p>Загрузка...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.profileContent}>
        <h1 className={styles.header}>Профиль</h1>
        {user && (
          <div className={styles.profileInfo}>
            <p>Имя: {user.name}</p>
            <p>Подписка: {user.subscription ? "Имеется" : "Отсутствует"}</p>
            <p>
              Дата приобретения:{" "}
              {user.subBuyTime
                ? new Date(user.subBuyTime).toLocaleDateString()
                : "Не указана"}
            </p>
            <p>
              Дата окончания:{" "}
              {user.subEndTime
                ? new Date(user.subEndTime).toLocaleDateString()
                : "Не указана"}
            </p>
            {user.role === "Admin" && <p>Роль: Администратор</p>}
            {user.role === "Admin" && (
              <div>
                <h2>Обновление подписки</h2>
                <input
                  type="number"
                  name="id"
                  value={subscriptionData.id}
                  onChange={handleInputChange}
                  placeholder="Айди подписки"
                  className={`${styles.input} ${
                    updateSuccess
                      ? styles.success
                      : updateError
                      ? styles.error
                      : ""
                  }`}
                />
                <input
                  type="text"
                  name="name"
                  value={subscriptionData.name}
                  onChange={handleInputChange}
                  placeholder="Название подписки"
                  className={`${styles.input} ${
                    updateSuccess
                      ? styles.success
                      : updateError
                      ? styles.error
                      : ""
                  }`}
                />
                <input
                  type="text"
                  name="price"
                  value={subscriptionData.price}
                  onChange={handleInputChange}
                  placeholder="Цена подписки"
                  className={`${styles.input} ${
                    updateSuccess
                      ? styles.success
                      : updateError
                      ? styles.error
                      : ""
                  }`}
                />
                <input
                  type="number"
                  name="daysPeriod"
                  value={subscriptionData.daysPeriod}
                  onChange={handleInputChange}
                  placeholder="Период (дни)"
                  className={`${styles.input} ${
                    updateSuccess
                      ? styles.success
                      : updateError
                      ? styles.error
                      : ""
                  }`}
                />
                <textarea
                  name="description"
                  value={subscriptionData.description}
                  onChange={handleInputChange}
                  placeholder="Описание подписки"
                  className={`${styles.textarea} ${
                    updateSuccess
                      ? styles.success
                      : updateError
                      ? styles.error
                      : ""
                  }`}
                />
                <button
                  onClick={handleUpdateSubscription}
                  className={styles.updateButton}
                >
                  Обновить подписку
                </button>
              </div>
            )}
            <button className={styles.logoutButton} onClick={handleLogout}>
              Выйти
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
