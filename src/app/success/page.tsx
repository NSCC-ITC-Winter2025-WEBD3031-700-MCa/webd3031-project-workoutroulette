"use client"; // ✅ Required for useEffect in Next.js App Router
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // ✅ Redirect to Home after 5 seconds
    const timer = setTimeout(() => {
      router.push("/"); // Changed from "/dashboard" to "/"
    }, 5000);

    return () => clearTimeout(timer); // Cleanup timeout
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold text-green-500">🎉 Payment Successful!</h1>
      <p className="mt-4 text-lg">Thank you for subscribing to Premium! 🚀</p>
      <p className="mt-2 text-gray-500">Redirecting you to the Home page in 5 seconds...</p>
      <a href="/" className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-md">
        Go to Home Now
      </a>
    </div>
  );
}
