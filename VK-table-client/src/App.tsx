import { MyFooter } from "./components/Footer";
import { Header } from "./components/Header";
import Table from "./components/Table";

export default function App() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-br from-emerald-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header />

      <Table />

      <MyFooter />
    </main>
  );
}
