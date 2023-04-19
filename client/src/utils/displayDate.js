export const displayDate = (data) => {
    const formatDate = (month, day, year = 0) => {
        const date = new Date(year, month, day);
        return date.toLocaleString("default", {
            month: "long",
            day: "numeric"
        });
    };
    const comment = Date.parse(data.created_at);
    const msComDate = +comment;
    const comDate = new Date(comment.createdAt);
    let message;
    if (Date.now() - msComDate < 60000) {
        message = " 1 минуту назад";
    } else if (Date.now() - msComDate < 60000 * 5) {
        message = " 5 минут назад";
    } else if (Date.now() - msComDate < 60000 * 10) {
        message = " 10 минут назад";
    } else if (Date.now() - msComDate < 60000 * 30) {
        message = " 30 минут назад";
    } else if (Date.now() - msComDate > 60000 * 60 * 24 * 31) {
        const day = comDate.getDate();
        const month = comDate.getMonth();
        const year = comDate.getFullYear();
        message = ` ${formatDate(month, day, year)}`;
    } else if (Date.now() - msComDate > 60000 * 60 * 24) {
        const day = comDate.getDate();
        const month = comDate.getMonth();
        message = ` ${formatDate(month, day)}`;
    } else if (Date.now() - msComDate > 60000 * 60) {
        const min = comDate.getMinutes();
        const hours = comDate.getHours();
        message = ` в ${hours > 10 ? hours : "0" + hours}:${
            min > 10 ? min : "0" + min
        }`;
    }
    return message;
};
