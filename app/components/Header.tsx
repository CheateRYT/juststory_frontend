"use client"; // Добавьте эту строку в начале файла
import Link from "next/link";
import { useState } from "react";
import Themes from "./Themes";

const Header = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true); // Начинаем с тёмной темы
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Состояние для мобильного меню
  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header
      className={`${
        isDarkTheme ? "bg-black text-white" : "bg-white text-black"
      } p-4 flex flex-col md:flex-row items-center justify-between gap-4`}
    >
      <div className="flex items-center flex-1 justify-between">
        <div className="flex items-center justify-center p-1 mr-10">
          <div className="text-5xl font-bold text-center md:text-6xl">
            JustStory
          </div>
        </div>
        <button
          className="md:hidden text-gray-300 focus:outline-none"
          onClick={toggleMenu}
        >
          {/* Иконка меню */}
          {isMenuOpen ? "✖" : "☰"}
        </button>
        {/* Значок смены темы с фиксированным размером */}
        <div
          className="hidden md:block"
          style={{ width: "40px", height: "40px" }}
        >
          <Themes toggleTheme={toggleTheme} />
        </div>
      </div>
      <nav
        className={`flex-col md:flex md:flex-row items-center gap-2 ${
          isMenuOpen ? "flex" : "hidden md:flex"
        }`}
      >
        <Link
          href="/selectStory"
          className={`hover:bg-gray-300 text-center ${
            isDarkTheme
              ? "text-gray-300 hover:text-black"
              : "text-gray-700 hover:text-black"
          } transition duration-200 rounded-lg px-1 py-1 text-sm md:text-base`}
        >
          Выбрать историю
        </Link>
        <Link
          href="/profile"
          className={`hover:bg-gray-300 text-center ${
            isDarkTheme
              ? "text-gray-300 hover:text-black"
              : "text-gray-700 hover:text-black"
          } transition duration-200 rounded-lg px-1 py-1 text-sm md:text-base`}
        >
          Профиль
        </Link>
        <Link
          href="/instructions"
          className={`hover:bg-gray-300 text-center ${
            isDarkTheme
              ? "text-gray-300 hover:text-black"
              : "text-gray-700 hover:text-black"
          } transition duration-200 rounded-lg px-1 py-1 text-sm md:text-base`}
        >
          Инструкция
        </Link>
        <Link
          href="/questions"
          className={`hover:bg-gray-300 text-center ${
            isDarkTheme
              ? "text-gray-300 hover:text-black"
              : "text-gray-700 hover:text-black"
          } transition duration-200 rounded-lg px-1 py-1 text-sm md:text-base`}
        >
          Вопросы
        </Link>
        <Link
          href="/aboutProject"
          className={`hover:bg-gray-300 text-center ${
            isDarkTheme
              ? "text-gray-300 hover:text-black"
              : "text-gray-700 hover:text-black"
          } transition duration-200 rounded-lg px-1 py-1 text-sm md:text-base`}
        >
          О проекте
        </Link>
        <Link
          href="/donations"
          className={`hover:bg-gray-300 text-center ${
            isDarkTheme
              ? "text-gray-300 hover:text-black"
              : "text-gray-700 hover:text-black"
          } transition duration-200 rounded-lg px-1 py-1 text-sm md:text-base`}
        >
          Пожертвования
        </Link>
      </nav>
      <div className="flex flex-col md:flex-row gap-2">
        <Link
          href="/login"
          className={`text-center ${
            isDarkTheme ? "bg-white text-black" : "bg-black text-white"
          } transition duration-200 rounded-full px-2 py-1 text-sm md:px-4 md:py-2 md:text-base hover:bg-gray-500`}
        >
          Войти
        </Link>
        <Link
          href="/register"
          className={`text-center ${
            isDarkTheme ? "bg-white text-black" : "bg-black text-white"
          } transition duration-200 rounded-full px-2 py-1 text-sm md:px-4 md:py-2 md:text-base hover:bg-gray-500`}
        >
          Зарегистрироваться
        </Link>
      </div>
    </header>
  );
};

export default Header;
