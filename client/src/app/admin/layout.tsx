import { ReactNode } from "react";
import Sidebar from "./components/Sidebar";
import './styles.css'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 mt-5">
        <main>{children}</main>
      </div>
    </div>
  );
}
