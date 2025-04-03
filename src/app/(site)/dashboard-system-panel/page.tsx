'use client'

// src/app/(site)/dashboard-system-panel/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/auth";
import { notFound } from "next/navigation";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.isAdmin) notFound();

  return (
    <div className="p-6 text-gray-800 dark:text-gray-100">
      Welcome to the Admin Dashboard
    </div>
  );
}
