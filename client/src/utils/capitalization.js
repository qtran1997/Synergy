export const properCase = str => {
  if (str !== undefined) return str.charAt(0).toUpperCase() + str.slice(1);
};

export const capitalizeAll = str => {
  if (str !== undefined) return str.toUpperCase();
};

export const uncapitalizeAll = str => {
  if (str !== undefined) return str.toLowerCase();
};
