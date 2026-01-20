"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginScreen from "@/components/admin/LoginScreen";

export default function LoginPage() {
    const router = useRouter();

    useEffect(() => {
        // Check if already authenticated
        const auth = sessionStorage.getItem("admin_auth");
        if (auth === "true") {
            router.push("/calendario");
        }
    }, [router]);

    const handleLoginSuccess = () => {
        router.push("/calendario");
    };

    return <LoginScreen onLogin={handleLoginSuccess} />;
}
