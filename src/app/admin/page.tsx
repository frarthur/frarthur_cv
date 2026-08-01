"use client";

import { useEffect, useState } from "react";
import AdminDashboard from "@/components/admin/dashboard";
import LoginScreen from "@/components/admin/login-screen";

export default function AdminPage() {
  const [password, setPassword] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("a_propos");

  useEffect(() => {
    const stored = sessionStorage.getItem("admin_pw");
    if (stored) setPassword(stored);
  }, []);

  if (!password) return <LoginScreen onLogin={setPassword} />;

  return <AdminDashboard password={password} activeTab={activeTab} setActiveTab={setActiveTab} />;
}
