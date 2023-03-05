export class DateTime {
  static nthNumber(number) {
    if (number > 3 && number < 21) return "th";
    switch (number % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  static formatTime(date) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  }

  static verbalDate(date) {

  }

  static formatDate(date) {
    const year = date.getFullYear();
    const month = date.toLocaleString("en-US", {
      month: "long",
    });
    const day = date.getDate();

    if (
      new Date().getDate() === day &&
      new Date().getMonth() === date.getMonth() &&
      new Date().getFullYear() === year
    ) {
      return "Today";
    }

    const thisYear = new Date().getFullYear();
    if (year === thisYear) {
      return `${day}${DateTime.nthNumber(day)} ${month}`;
    } else {
      return `${day}${DateTime.nthNumber(day)} ${month}, ${year}`;
    }
  }
}
