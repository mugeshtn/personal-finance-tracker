import { useMemo } from "react";

export const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "long",
        year: "numeric",

    });

    const formattedTime = date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        timeZone: "Asia/Kolkata",
        minute: "2-digit",
        second: "2-digit",
        weekday: "short"
    });

    return [formattedDate, formattedTime];
};

