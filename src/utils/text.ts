export const capitalize = (text: string): string => {
    return text
        ?.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase())
        .join(' ');
}

export const formatStartHour = (hour: string) => {
  switch (hour) {
    case "h_8":
      return "8:00";
    case "h_10":
      return "10:00";
    case "h_14":
      return "14:00";
    case "h_16":
      return "16:00";
  }
};

export const formatLevel = (level: string) => {
  switch (level) {
    case "LEVEL_1":
      return "1st Year";
    case "LEVEL_2":
      return "2nd Year";
    case "LEVEL_3":
      return "3rd Year";
  }
};