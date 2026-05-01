"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ChatWidget from "@/components/ui/ChatWidget";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    // Using startsWith in case there are query params or trailing slashes
    const isLoginPage = pathname?.startsWith("/login");
    const isPoliticasPage = pathname?.startsWith("/politicas");
    const isZ60Page = pathname?.startsWith("/ecografo-z60");
    const isZ6Page = pathname?.startsWith("/ecografo-z6");
    const isM7Page = pathname?.startsWith("/ecografo-m7");

    const hideNavbar = isLoginPage || isPoliticasPage || isZ60Page || isZ6Page || isM7Page;

    return (
        <>
            {!hideNavbar && <Navbar />}
            <main>{children}</main>
            {!isLoginPage && <WhatsAppButton />}
            {!isLoginPage && <ChatWidget />}
        </>
    );
}
