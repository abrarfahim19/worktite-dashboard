export const timezoneToDDMMYYYY = (timezone: string) => {
  const date = new Date(timezone);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
  const year = date.getFullYear();
  const formattedDate = `${month}/${day}/${year}`;
  return formattedDate;
};

export const timezoneToHHMM = (timezone: string) => {
  const date = new Date(timezone);
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const formattedTime = `${hours > 12 ? hours - 12 : hours}:${minutes} ${hours >= 12 ? "PM" : "AM"}`;
  return formattedTime;
};

export const timezoneToYYYYMMDD = (timezone: string) => {
  const date = new Date(timezone);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
  const year = date.getFullYear();

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};
