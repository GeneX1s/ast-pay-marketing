"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import styles from "./MainLayout.module.css";

export default function MainLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  // Close sidebar on window resize > 768px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className={styles.container}>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <div
        className={`${styles.mainContent} ${
          isSidebarOpen ? styles.shifted : ""
        }`}
      >
        <Header onMenuClick={toggleSidebar} />
        <main className={styles.contentWrapper}>{children}</main>
      </div>

      {isSidebarOpen && (
        <div className={styles.overlay} onClick={closeSidebar} />
      )}
    </div>
  );
}
