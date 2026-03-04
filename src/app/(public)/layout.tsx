"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    // Using startsWith in case there are query params or trailing slashes
    const isLoginPage = pathname?.startsWith("/login");
    const isPoliticasPage = pathname?.startsWith("/politicas");

    const hideNavbar = isLoginPage || isPoliticasPage;

    console.log("Current path:", pathname, "hideNavbar:", hideNavbar);

    return (
        <>
            {!hideNavbar && <Navbar />}
            <main>{children}</main>
            {!isLoginPage && <WhatsAppButton />}
        </>
    );
}
