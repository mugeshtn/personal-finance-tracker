export const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "short",
        year: "2-digit"
    });

    const formattedTime = date.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        weekday: "short"
    });

    return [formattedDate, formattedTime];
};

export const incomeDateTime = (dateString: string) => {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).replace(/\//g, "-");

    const weekday = date.toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata",
        weekday: "short",
    })
    return `${formattedDate} (${weekday})`;
};

export const todayInputFormat = new Date().toISOString().split("T")[0];

