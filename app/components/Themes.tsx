import Image from "next/image";
import themasImage from "../../public/images/thema.png";

interface ThemesProps {
  toggleTheme: () => void;
}

const Themes: React.FC<ThemesProps> = ({ toggleTheme }) => {
  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      onClick={toggleTheme}
    >
      <Image src={themasImage} alt="Темы" width={35} height={35} />{" "}
    </div>
  );
};

export default Themes;
