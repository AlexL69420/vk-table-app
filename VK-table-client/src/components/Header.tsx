import {
  Navbar,
  NavbarBrand,
  NavbarToggle,
  DarkThemeToggle,
  NavbarCollapse,
} from "flowbite-react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <Navbar
      fluid
      rounded
      className="w-full border-b border-emerald-400/30 bg-emerald-500 backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-900"
    >
      <NavbarBrand href="https://github.com/AlexL69420/scrum">
        <img
          src="https://i.pinimg.com/736x/8b/6b/98/8b6b987316a515a6c4d77684e32cccc7.jpg"
          className="mr-3 h-8 rounded-full object-cover ring-2 ring-emerald-200 sm:h-9 dark:ring-slate-600"
          alt="logo"
        />
        <span className="self-center font-mono text-2xl font-semibold whitespace-nowrap text-emerald-100 transition-colors hover:text-white dark:text-slate-300 dark:hover:text-white">
          Таблица
        </span>
      </NavbarBrand>

      <div className="flex items-center gap-4 md:order-2">
        <div className="hidden items-center gap-8 bg-gradient-to-r from-zinc-50 via-emerald-100 to-zinc-300 bg-clip-text font-mono text-lg font-semibold text-transparent md:flex dark:from-slate-100 dark:via-emerald-200 dark:to-slate-300">
          <Link
            to="/"
            className="transition-colors hover:text-white dark:hover:text-white"
          >
            Главная
          </Link>
          <Link
            to="/add-user"
            className="transition-colors hover:text-white dark:hover:text-white"
          >
            Создать запись
          </Link>
        </div>

        <DarkThemeToggle className="flex size-12 items-center justify-around rounded-full border-2 border-white text-white transition-colors hover:cursor-pointer hover:bg-emerald-400 hover:text-amber-100 dark:border-slate-300 dark:text-slate-300 dark:hover:bg-slate-700" />
        <NavbarToggle className="text-white hover:cursor-pointer dark:text-slate-300" />
      </div>

      <NavbarCollapse className="md:hidden">
        <Link
          to="/"
          className="py-2 text-emerald-100 transition-colors hover:cursor-pointer hover:text-white dark:text-slate-300 dark:hover:text-white"
        >
          Главная
        </Link>
        <Link
          to="/create-field"
          className="py-2 text-emerald-100 transition-colors hover:text-white dark:text-slate-300 dark:hover:text-white"
        >
          Создать запись
        </Link>
      </NavbarCollapse>
    </Navbar>
  );
}
