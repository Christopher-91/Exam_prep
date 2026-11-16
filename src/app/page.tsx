"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { StudentDashboard } from "@/components/dashboards/StudentDashboard";
import { ParentDashboard } from "@/components/dashboards/ParentDashboard";
import { ProfessionalDashboard } from "@/components/dashboards/ProfessionalDashboard";
import { AdminDashboard } from "@/components/dashboards/AdminDashboard";

export default function OverviewPage() {
  const { activeRole } = useApp();

  switch (activeRole) {
    case "parent":
      return <ParentDashboard />;
    case "professional":
      return <ProfessionalDashboard />;
    case "admin":
      return <AdminDashboard />;
    case "student":
    default:
      return <StudentDashboard />;
  }
}

