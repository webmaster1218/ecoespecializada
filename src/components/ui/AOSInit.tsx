"use client";

import { useEffect } from "react";
import AOS from "aos";

export const AOSInit = () => {
    useEffect(() => {
        AOS.init({
            once: true,
            duration: 800,
            easing: "ease-out-cubic",
            offset: 100,
        });
    }, []);

    return null;
};
