"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Dialog, Transition } from "@headlessui/react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styles from "./Main.module.css";
import { validateToken } from "../../utils/validateToken";
import { CheckIcon, SparklesIcon } from "@heroicons/react/24/outline";

const Main = () => {
  const router = useRouter();
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      setIsTokenValid(false);
      return;
    }
    validateToken(token).then((valid) => setIsTokenValid(Boolean(valid)));
  }, []);

  const handlePlayClick = () => {
    if (isTokenValid) {
      router.push("/games");
    } else {
      setIsDialogOpen(true);
    }
  };

  const handleTryClick = () => {
    router.push("/buySub");
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerCard = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1 },
    }),
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.content}>
          <section className={styles.section}>
            <motion.div
              className={styles.hero}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className={styles.title}>JustStory — текстовые приключения на ИИ</h1>
              <p className={styles.subtitle}>
                Создавайте миры, выбирайте роли и играйте истории, рожденные ИИ
              </p>
              <div className={styles.actions}>
                <button className={styles.primaryButton} onClick={handlePlayClick}>
              Играть
            </button>
                <button className={styles.secondaryButton} onClick={handleTryClick}>
                  Тарифы
                </button>
              </div>
            </motion.div>
          </section>

          

          <section className={styles.section}>
            <motion.div
              className={styles.gameplaySection}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <h2 className={styles.gameplayTitle}>ГЕЙМПЛЕЙ</h2>
              <p className={styles.gameplaySubtitle}>
                Никаких правил, никакой цели. Только приключение.
              </p>
              <p className={styles.gameplayDescription}>
                JustStory — это текстовый фэнтезийный симулятор, созданный искусственным интеллектом, с безграничными возможностями. В отличие от большинства игр, в которых вы попадаете в миры, созданные гейм-дизайнерами, в JustStory вы можете поручить ИИ создавать миры, персонажей и сценарии для взаимодействия вашего персонажа. Вы можете возглавить армию, отражающую вторжение инопланетян, или стать мифическим детективом, расследующим попытку убийства королевы фей.
              </p>
              <div className={styles.gameplayCards}>
                <motion.div
                  className={styles.gameplayCard}
                  variants={staggerCard}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={0}
                  whileHover={{ scale: 1.02, y: -4 }}
                >
                  <div className={styles.cardNumber}>1</div>
                  <h3 className={styles.gameplayCardTitle}>Определите свой мир</h3>
                  <p className={styles.gameplayCardDescription}>
                    Выберите персонажа, мир или историю из тысяч сценариев, созданных сообществом, или создайте свой собственный! ИИ заполнит детали вашего уникального приключения.
                  </p>
                </motion.div>
                <motion.div
                  className={styles.gameplayCard}
                  variants={staggerCard}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={1}
                  whileHover={{ scale: 1.02, y: -4 }}
                >
                  <div className={styles.cardNumber}>2</div>
                  <h3 className={styles.gameplayCardTitle}>Примите меры</h3>
                  <p className={styles.gameplayCardDescription}>
                    Вы можете решить, что говорит или делает ваш персонаж. ИИ будет генерировать ответы от других персонажей или мировых событий, на которые вы сможете реагировать. Каждое приключение уникально и неожиданно.
                  </p>
                </motion.div>
                <motion.div
                  className={styles.gameplayCard}
                  variants={staggerCard}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={2}
                  whileHover={{ scale: 1.02, y: -4 }}
                >
                  <div className={styles.cardNumber}>3</div>
                  <h3 className={styles.gameplayCardTitle}>Сделайте это своим</h3>
                  <p className={styles.gameplayCardDescription}>
                    Настройте свое приключение с помощью пользовательских комбинаций тем и расширенных настроек искусственного интеллекта. Создавайте карты для персонажей, локаций и многого другого!
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </section>

          <div className={styles.divider} />

          <section className={`${styles.section} ${styles.sectionTight}`}>
            <motion.h2
              className={styles.sectionTitle}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              Попробуйте сценарии
            </motion.h2>

            <div className={styles.cardsGrid}>
              {["Побег от Стива из Minecraft", "Pudge vs Дарт Вейдер на миду", "Мир Гэдрун: путешествие вампира"].map(
                (title, i) => (
                  <motion.div
                    key={title}
                    className={styles.card}
                    variants={staggerCard}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    custom={i}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h3 className={styles.cardTitle}>{title}</h3>
                    <p className={styles.cardDescription}>
                      Динамичное приключение с открытой развилкой действий
                    </p>
                    <button className={styles.cardButton} onClick={handlePlayClick}>
                      Играть
                    </button>
                  </motion.div>
                )
              )}
            </div>
          </section>

          <div className={styles.divider} />

          <section className={styles.sectionCompact}>
            <motion.div
              className={styles.behindSection}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <h2 className={styles.behindTitle}>ЗА ИИ</h2>
              <p className={styles.behindSubtitle}>
                Опыт, возможный только благодаря искусственному интеллекту.
              </p>
              <p className={styles.behindDescription}>
                Генерация целых миров, персонажей и сценариев с глубиной и сложностью, с которыми вы можете взаимодействовать, требует огромных вычислительных мощностей и интеллекта.
              </p>
              <div className={styles.behindActions}>
                <button className={styles.primaryButton} onClick={handlePlayClick}>
                  Попробовать бесплатно
                </button>
                <p className={styles.behindNote}>Часть игры. Часть повествования. Всё веселье.</p>
              </div>
            </motion.div>
          </section>

          <section className={styles.section}>
            <motion.h2
              className={styles.sectionTitle}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              Тарифы
            </motion.h2>

            <div className={styles.pricingNote}>Гибкие планы для любого стиля игры</div>

            <div className={styles.tariffGrid}>
              <motion.div
                className={styles.tariffCard}
                variants={staggerCard}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={0}
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <div className={styles.tariffHeader}>
                  <h3 className={styles.tariffTitle}>Бесплатный</h3>
                  <div className={styles.tariffPrice}>0 ₽</div>
                </div>
                <ul className={styles.features}>
                  <li><CheckIcon className={styles.featureIcon} /> Все включено</li>
                  <li><CheckIcon className={styles.featureIcon} /> Реклама</li>
                </ul>
                <button className={styles.tariffButton} onClick={handlePlayClick}>
                  Начать играть
                </button>
              </motion.div>

              <motion.div
                className={`${styles.tariffCard} ${styles.tariffCardAccent}`}
                variants={staggerCard}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={1}
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <div className={styles.popularBadge}><SparklesIcon className={styles.badgeIcon} /> Популярный</div>
                <div className={styles.tariffHeader}>
                  <h3 className={styles.tariffTitle}>Полный</h3>
                </div>
                <ul className={styles.features}>
                  <li><CheckIcon className={styles.featureIcon} /> Все включено</li>
                  <li><CheckIcon className={styles.featureIcon} /> Без рекламы</li>
                  <li><CheckIcon className={styles.featureIcon} /> +10 к карме</li>
                </ul>
                <button className={styles.tariffButtonPrimary} onClick={handleTryClick}>
                  Попробовать
                </button>
              </motion.div>
            </div>
          </section>

          <section className={styles.sectionCompact}>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statValue}>10k+</div>
                <div className={styles.statLabel}>историй создано</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statValue}>1k+</div>
                <div className={styles.statLabel}>сценариев</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statValue}>99.9%</div>
                <div className={styles.statLabel}>вовлечённости</div>
        </div>
            </div>
          </section>

          
            </div>
      </div>
      <Footer />
      <Transition show={isDialogOpen} as={undefined}>
        <Dialog onClose={() => setIsDialogOpen(false)} className={styles.dialogRoot}>
          <div className={styles.dialogBackdrop} aria-hidden="true" />
          <div className={styles.dialogContainer}>
            <Transition.Child
              enter=""
              leave=""
              as={undefined}
            >
              <Dialog.Panel className={styles.dialogPanel}>
                <Dialog.Title className={styles.dialogTitle}>Войти, чтобы играть</Dialog.Title>
                <Dialog.Description className={styles.dialogDescription}>
                  Авторизуйтесь, чтобы начать приключение и сохранять прогресс
                </Dialog.Description>
                <div className={styles.dialogActions}>
                  <button className={styles.secondaryButton} onClick={() => setIsDialogOpen(false)}>Позже</button>
                  <button className={styles.primaryButton} onClick={() => router.push("/login")}>Войти</button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Main;
