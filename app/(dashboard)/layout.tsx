"use client";

import Search from "../../components/ui/Search";
import Sidebar from "../../components/ui/Sidebar";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
    <div className="wrapper">
    <Search setIsSidebarOpen={setIsSidebarOpen} />
      <div
        className={isSidebarOpen ? "overlay" : "overlay overlay--hidden"}
        onClick={() => setIsSidebarOpen(false)}
      ></div>
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      {children}  
    </div>
    
    </>
  );
}
