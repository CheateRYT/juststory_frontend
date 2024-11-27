const Header = () => {
  return (
    <header className="bg-black text-white p-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center flex-1 gap-2 justify-around">
        <div className="flex items-center justify-center p-1 mr-10">
          <div className="text-5xl font-bold">JustStory</div>
        </div>
        <nav className="flex justify-center gap-2">
          <a
            href="/select-story"
            className="hover:bg-gray-500 text-gray-300 transition duration-200 rounded-lg px-1 py-1"
          >
            Выбрать историю
          </a>
          <a
            href="/instructions"
            className="hover:bg-gray-500 text-gray-300 transition duration-200 rounded-lg px-1 py-1"
          >
            Инструкция
          </a>
          <a
            href="/questions"
            className="hover:bg-gray-500 text-gray-300 transition duration-200 rounded-lg px-1 py-1"
          >
            Вопросы
          </a>
          <a
            href="/about-project"
            className="hover:bg-gray-500 text-gray-300 transition duration-200 rounded-lg px-1 py-1"
          >
            О проекте
          </a>
          <a
            href="/contacts"
            className="hover:bg-gray-700 text-gray-300 transition duration-200 rounded-lg px-1 py-1"
          >
            Пожертвования
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
