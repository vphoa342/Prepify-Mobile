export const convertTimeToString = (time: Date | string): string => {
    const dateObj = new Date(); // Get the current date and time
    const day = String(dateObj.getDate()).padStart(2, "0"); // Get the day and pad it with a leading zero if necessary
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Get the month (0-based) and pad it with a leading zero if necessary
    const year = dateObj.getFullYear(); // Get the full year

    const formattedDate = `${day}/${month}/${year}`; // Combine the parts into the desired format
    return formattedDate;
};
