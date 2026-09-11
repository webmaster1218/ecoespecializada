"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import ChatWidget from "@/components/ui/ChatWidget";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isPoliticasPage = pathname?.startsWith("/politicas");
    const isZ60Page = pathname?.startsWith("/ecografo-z60");
    const isZ6Page = pathname?.startsWith("/ecografo-z6");
    const isM7Page = pathname?.startsWith("/ecografo-m7");
    const isMx3Page = pathname?.startsWith("/ecografo-mx3");

    const hideNavbar = isPoliticasPage || isZ60Page || isZ6Page || isM7Page || isMx3Page;

    return (
        <>
            {!hideNavbar && <Navbar />}
            <main>{children}</main>
            {/* Chat widget for visitor support */}
            <ChatWidget />
        </>
    );
}
