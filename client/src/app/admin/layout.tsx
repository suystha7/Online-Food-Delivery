import { ReactNode } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import './styles.css'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main>{children}</main>
      </div>
    </div>
  );
}
