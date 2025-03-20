import Link from "next/link";
import Image from "next/image";
import GitHubIcon from "@/assets/images/GitHub.svg";
import BackIcon from "@/assets/images/Back.png";

interface NavigationProps {
  onBackClick: (() => void) | null;
}

export const Navigation = ({ onBackClick }: NavigationProps) => {
  return (
    <nav className="w-full bg-white shadow-sm py-4 px-6 flex items-center justify-between min-h-[72px]">
      <Link
        href="https://github.com/Dintik/quiz"
        className="flex items-center hover:opacity-80 transition-opacity"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src={GitHubIcon} alt="GitHub" width={24} height={24} />
      </Link>

      <div className="flex-1 text-center text-gray-600 font-medium">
        {onBackClick ? "PDF Viewer" : "Text to PDF Converter"}
      </div>

      {onBackClick && (
        <button
          onClick={onBackClick}
          className="flex items-center justify-center px-4 py-2 bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 transition-colors text-white cursor-pointer"
        >
          <Image
            src={BackIcon}
            alt="Back"
            width={20}
            height={20}
            className="brightness-0 invert"
          />
          <span>Back</span>
        </button>
      )}
    </nav>
  );
};
