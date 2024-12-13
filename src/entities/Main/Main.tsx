"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation"; // Импортируем useRouter
import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styles from "./Main.module.css";
import { validateToken } from "../../utils/validateToken";
const Main = () => {
  const token = Cookies.get("token");
  const [showText, setShowText] = useState(false);
  const [showAIBlock, setShowAIBlock] = useState(false);
  const [showTariffs, setShowTariffs] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const router = useRouter(); // Инициализируем router

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 500); // Задержка в 0.5 секунды для анимации появления текста
    const aiBlockTimer = setTimeout(() => {
      setShowAIBlock(true);
    }, 2000); // Задержка в 2 секунды для появления блока JustStory AI
    const tariffTimer = setTimeout(() => {
      setShowTariffs(true);
    }, 3000); // Задержка в 3 секунды для появления блока тарифов
    return () => {
      clearTimeout(timer); // Очистка таймера при размонтировании
      clearTimeout(aiBlockTimer); // Очистка таймера для AI блока
      clearTimeout(tariffTimer); // Очистка таймера для тарифов
    };
  }, []);

  const handlePlayClick = () => {
    if (isTokenValid) {
      router.push("/games"); // Перенаправляем на /games, если токен валидный
    } else {
      router.push("/login"); // Перенаправляем на /login, если токен недействителен
    }
  };

  const handleTryClick = () => {
    router.push("/buySub"); // Перенаправляем на /buySub при нажатии на кнопку "Попробовать"
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.justStory}>
          {showText && (
            <h1 className={styles.title}>JustStory Powered by GigaChat AI</h1>
          )}
          {showText && (
            <p className={`${styles.description} ${styles.slideIn}`}>
              Текстовая приключенческая игра, в которой вы возглавляете (и
              играете главную роль), а ИИ воплощает ее в жизнь.
            </p>
          )}
          {showText && (
            <button
              onClick={handlePlayClick}
              className={`${styles.playButton} ${styles.slideIn}`}
            >
              Играть
            </button>
          )}
          {showAIBlock && (
            <div className={styles.aiBlock}>
              <h2 className={styles.aiTitle}>ГЕЙМПЛЕЙ</h2>
              <p className={styles.aiDescription}>
                Никаких правил, никакой цели. Только приключение.
              </p>
              <p className={styles.aiDescription}>
                JustStory — это текстовый фэнтезийный симулятор, созданный
                искусственным интеллектом, с безграничными возможностями. В
                отличие от большинства игр, в которых вы попадаете в миры,
                созданные гейм-дизайнерами, в JustStory вы можете поручить ИИ
                создавать миры, персонажей и сценарии для взаимодействия вашего
                персонажа. Вы можете возглавить армию, отражающую вторжение
                инопланетян, или стать мифическим детективом, расследующим
                попытку убийства королевы фей.
              </p>
              <h3 className={styles.aiSubTitle}>1. Определите свой мир</h3>
              <p className={styles.aiDescription}>
                Выберите персонажа, мир или историю из тысяч сценариев,
                созданных сообществом, или создайте свой собственный! ИИ
                заполнит детали вашего уникального приключения.
              </p>
              <h3 className={styles.aiSubTitle}>2. Примите меры</h3>
              <p className={styles.aiDescription}>
                Вы можете решить, что говорит или делает ваш персонаж. ИИ будет
                генерировать ответы от других персонажей или мировых событий, на
                которые вы сможете реагировать. Каждое приключение уникально и
                неожиданно.
              </p>
              <h3 className={styles.aiSubTitle}>3. Сделайте это своим.</h3>
              <p className={styles.aiDescription}>
                Настройте свое приключение с помощью пользовательских комбинаций
                тем и расширенных настроек искусственного интеллекта. Создавайте
                карты для персонажей, локаций и многого другого!
              </p>
            </div>
          )}
        </div>
        {showText && (
          <>
            <h2 className={`${styles.scenarioTitle} ${styles.slideIn}`}>
              Попробуйте одни из наших сценариев
            </h2>
            <div className={styles.cardContainer}>
              <Card
                title="Побег от стива из Minecraft"
                onPlayClick={handlePlayClick}
              />
              <Card
                title="Драка Pudge на мид линии против Дарт Вейдера"
                onPlayClick={handlePlayClick}
              />
              <Card
                title="Магический мир Гэдрун и путешествие вампира"
                onPlayClick={handlePlayClick}
              />
            </div>
          </>
        )}
        {showTariffs && (
          <>
            <h2 className={`${styles.tariffsTitle} ${styles.slideIn}`}>
              Тарифы
            </h2>
            <div className={styles.tariffContainer}>
              <TariffCard
                title="Бесплатный"
                features={["Все включено", "Реклама"]}
                buttonText="Начать играть"
                onClick={handlePlayClick} // Передаем обработчик клика
              />
              <TariffCard
                title="Полный"
                features={["Все включено", "Без рекламы", "+10 к карме"]}
                price="300 р/мес"
                buttonText="Попробовать"
                priceColor="#6b46c1"
                onClick={handleTryClick} // Передаем обработчик клика
              />
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

const Card = ({
  title,
  onPlayClick,
}: {
  title: string;
  onPlayClick: () => void;
}) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <button className={styles.cardButton} onClick={onPlayClick}>
        Играть
      </button>
    </div>
  );
};

const TariffCard = ({
  title,
  features,
  buttonText,
  price,
  priceColor,
  onClick, // Добавляем обработчик клика
}: {
  title: string;
  features: string[];
  buttonText: string;
  price?: string;
  priceColor?: string;
  onClick?: () => void; // Обработчик клика
}) => {
  return (
    <div className={styles.tariffCard}>
      <h3 className={styles.tariffTitle}>{title}</h3>
      {features.map((feature, index) => (
        <p key={index} className={styles.tariffFeature}>
          {feature}
        </p>
      ))}
      {price && (
        <p className={styles.tariffPrice} style={{ color: priceColor }}>
          {price}
        </p>
      )}
      <button className={styles.tariffButton} onClick={onClick}>
        {buttonText}
      </button>
    </div>
  );
};

export default Main;
