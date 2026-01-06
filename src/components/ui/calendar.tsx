"use client"

import * as React from "react"
import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "lucide-react"
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    captionLayout = "label",
    buttonVariant = "ghost",
    formatters,
    components,
    ...props
}: React.ComponentProps<typeof DayPicker> & {
    buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
    const defaultClassNames = getDefaultClassNames()

    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            fixedWeeks
            className={cn(
                "bg-white group/calendar p-3 [--cell-size:2.5rem] rounded-3xl border border-slate-100 shadow-xl",
                className
            )}
            captionLayout={captionLayout}
            formatters={{
                ...formatters,
            }}
            classNames={{
                root: cn("w-fit", defaultClassNames.root),
                months: cn(
                    "relative flex flex-col gap-4 md:flex-row",
                    defaultClassNames.months
                ),
                month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
                nav: cn(
                    "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
                    defaultClassNames.nav
                ),
                button_previous: cn(
                    buttonVariants({ variant: buttonVariant }),
                    "h-9 w-9 p-0 opacity-50 hover:opacity-100 transition-opacity",
                    defaultClassNames.button_previous
                ),
                button_next: cn(
                    buttonVariants({ variant: buttonVariant }),
                    "h-9 w-9 p-0 opacity-50 hover:opacity-100 transition-opacity",
                    defaultClassNames.button_next
                ),
                month_caption: cn(
                    "flex h-9 w-full items-center justify-center px-10",
                    defaultClassNames.month_caption
                ),
                caption_label: cn(
                    "text-sm font-bold text-slate-900 capitalize"
                ),
                table: "w-full border-collapse",
                weekdays: cn("flex mb-2", defaultClassNames.weekdays),
                weekday: cn(
                    "text-slate-400 flex-1 select-none rounded-md text-[10px] font-bold uppercase tracking-wider text-center",
                    defaultClassNames.weekday
                ),
                week: cn("mt-1 flex w-full", defaultClassNames.week),
                day: cn(
                    "relative w-full h-full p-0 text-center group/day aspect-square select-none",
                    defaultClassNames.day
                ),
                range_start: cn(
                    "bg-blue-600 text-white rounded-l-2xl",
                    defaultClassNames.range_start
                ),
                range_middle: cn("bg-blue-50 text-blue-600 rounded-none", defaultClassNames.range_middle),
                range_end: cn("bg-blue-600 text-white rounded-r-2xl", defaultClassNames.range_end),
                today: cn(
                    "bg-slate-100 text-slate-900 font-bold rounded-xl",
                    defaultClassNames.today
                ),
                outside: cn(
                    "text-slate-300 aria-selected:text-slate-300",
                    defaultClassNames.outside
                ),
                disabled: cn(
                    "text-slate-100 opacity-50",
                    defaultClassNames.disabled
                ),
                hidden: cn("invisible", defaultClassNames.hidden),
                ...classNames,
            }}
            components={{
                Chevron: ({ className, orientation, ...props }) => {
                    if (orientation === "left") {
                        return (
                            <ChevronLeftIcon className={cn("size-4", className)} {...props} />
                        )
                    }

                    if (orientation === "right") {
                        return (
                            <ChevronRightIcon
                                className={cn("size-4", className)}
                                {...props}
                            />
                        )
                    }

                    return (
                        <ChevronDownIcon className={cn("size-4", className)} {...props} />
                    )
                },
                DayButton: CalendarDayButton,
                ...components,
            }}
            {...props}
        />
    )
}

function CalendarDayButton({
    className,
    day,
    modifiers,
    ...props
}: React.ComponentProps<typeof DayButton>) {
    const defaultClassNames = getDefaultClassNames()

    const ref = React.useRef<HTMLButtonElement>(null)
    React.useEffect(() => {
        if (modifiers.focused) ref.current?.focus()
    }, [modifiers.focused])

    return (
        <Button
            ref={ref}
            variant="ghost"
            size="icon"
            data-day={day.date.toLocaleDateString()}
            data-selected-single={
                modifiers.selected &&
                !modifiers.range_start &&
                !modifiers.range_end &&
                !modifiers.range_middle
            }
            data-range-start={modifiers.range_start}
            data-range-end={modifiers.range_end}
            data-range-middle={modifiers.range_middle}
            className={cn(
                "h-10 w-10 p-0 font-medium transition-all rounded-xl",
                "data-[selected-single=true]:bg-blue-600 data-[selected-single=true]:text-white data-[selected-single=true]:shadow-lg data-[selected-single=true]:shadow-blue-500/30",
                "data-[range-start=true]:bg-blue-600 data-[range-start=true]:text-white data-[range-start=true]:rounded-l-xl",
                "data-[range-end=true]:bg-blue-600 data-[range-end=true]:text-white data-[range-end=true]:rounded-r-xl",
                "data-[range-middle=true]:bg-blue-50 data-[range-middle=true]:text-blue-600 data-[range-middle=true]:rounded-none",
                "hover:bg-blue-50 hover:text-blue-600",
                defaultClassNames.day,
                className
            )}
            {...props}
        />
    )
}

export { Calendar, CalendarDayButton }
