import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/react-app/hooks/useTheme";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-accent/10 rounded-lg transition-all duration-200 hover:scale-110"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Sun className="w-5 h-5 text-foreground" />
          ) : (
            <Moon className="w-5 h-5 text-foreground" />
          )}
        </button>

        <a
          href="https://lizadetkova.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 font-heading text-xl font-medium tracking-tight text-foreground hover:opacity-70 transition-opacity duration-200"
        >
          <img
            src="/favicon.svg"
            alt=""
            className="h-9 w-9 rounded-full object-cover shrink-0"
          />
          <span>Liza Detkova</span>
        </a>
      </div>
    </header>
  );
}
