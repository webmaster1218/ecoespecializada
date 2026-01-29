"use client";

import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Adaptado para Escenarios Clínicos
type Scenario = {
    id: string | number;
    title: string;          // Antes name
    subtitle: string;       // Antes affiliation
    description: string;    // Antes quote
    imageSrc: string;
    thumbnailSrc: string;
};

interface ScenarioSliderProps {
    scenarios: Scenario[];
    className?: string;
}

export const ScenariosSlider = ({ scenarios, className }: ScenarioSliderProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState<"left" | "right">("right");

    const activeScenario = scenarios[currentIndex];

    const handleNext = () => {
        setDirection("right");
        setCurrentIndex((prev) => (prev + 1) % scenarios.length);
    };

    const handlePrev = () => {
        setDirection("left");
        setCurrentIndex((prev) => (prev - 1 + scenarios.length) % scenarios.length);
    };

    const handleThumbnailClick = (index: number) => {
        setDirection(index > currentIndex ? "right" : "left");
        setCurrentIndex(index);
    };

    const thumbnailScenarios = scenarios
        .filter((_, i) => i !== currentIndex)
        .slice(0, 3);

    const imageVariants = {
        enter: (direction: "left" | "right") => ({
            y: direction === "right" ? "100%" : "-100%",
            opacity: 0,
        }),
        center: { y: 0, opacity: 1 },
        exit: (direction: "left" | "right") => ({
            y: direction === "right" ? "-100%" : "100%",
            opacity: 0,
        }),
    };

    const textVariants = {
        enter: (direction: "left" | "right") => ({
            x: direction === "right" ? 50 : -50,
            opacity: 0,
        }),
        center: { x: 0, opacity: 1 },
        exit: (direction: "left" | "right") => ({
            x: direction === "right" ? -50 : 50,
            opacity: 0,
        }),
    };

    return (
        <section className={cn("relative w-full py-16 md:py-24 bg-transparent overflow-hidden text-slate-900", className)}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-full items-center">

                    {/* === Left Column: Meta and Thumbnails === */}
                    <div className="md:col-span-3 flex flex-col justify-between order-2 md:order-1 h-auto md:h-full md:min-h-[300px] gap-6 md:gap-0">
                        <div className="flex flex-row md:flex-col justify-between md:justify-start space-x-4 md:space-x-0 md:space-y-4">
                            <span className="text-sm text-slate-500 font-bold font-mono">
                                {String(currentIndex + 1).padStart(2, "0")} / {String(scenarios.length).padStart(2, "0")}
                            </span>
                        </div>

                        <div className="flex space-x-3 mt-8 md:mt-0">
                            {thumbnailScenarios.map((scenario) => {
                                const originalIndex = scenarios.findIndex((s) => s.id === scenario.id);
                                return (
                                    <button
                                        key={scenario.id}
                                        onClick={() => handleThumbnailClick(originalIndex)}
                                        aria-label={`Ver escenario: ${scenario.title}`}
                                        className="overflow-hidden rounded-lg w-16 h-20 md:w-20 md:h-24 opacity-60 hover:opacity-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-105 shadow-md relative"
                                    >
                                        <Image
                                            src={scenario.thumbnailSrc}
                                            alt={scenario.title}
                                            fill
                                            className="object-cover"
                                            sizes="80px"
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* === Center Column: Main Image === */}
                    <div className="md:col-span-5 relative h-[350px] md:h-[500px] order-1 md:order-2 rounded-2xl overflow-hidden shadow-2xl">
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={currentIndex}
                                className="absolute inset-0"
                                custom={direction}
                                variants={imageVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                            >
                                <Image
                                    src={activeScenario.imageSrc}
                                    alt={activeScenario.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 90vw, 500px"
                                    priority={currentIndex === 0}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* === Right Column: Text === */}
                    <div className="md:col-span-4 flex flex-col justify-center pl-0 md:pl-10 order-3 md:order-3">
                        <div className="relative overflow-hidden min-h-[220px]">
                            <AnimatePresence initial={false} custom={direction} mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    custom={direction}
                                    variants={textVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                >
                                    <p className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">
                                        {activeScenario.subtitle}
                                    </p>
                                    <h3 className="text-3xl md:text-4xl font-extrabold mb-6 text-slate-900 leading-tight">
                                        {activeScenario.title}
                                    </h3>
                                    <p className="text-lg text-slate-600 leading-relaxed">
                                        {activeScenario.description}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="flex items-center gap-4 mt-8">
                            <Button
                                variant="outline"
                                size="icon"
                                aria-label="Escenario anterior"
                                className="rounded-full w-12 h-12 border-slate-200 hover:border-blue-500 hover:text-blue-500 transition-colors"
                                onClick={handlePrev}
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                            <Button
                                variant="default"
                                size="icon"
                                aria-label="Siguiente escenario"
                                className="rounded-full w-12 h-12 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/30"
                                onClick={handleNext}
                            >
                                <ArrowRight className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
