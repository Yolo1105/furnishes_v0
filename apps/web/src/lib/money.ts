/** A price in Singapore dollars, whole dollars only, as "$1,480" (Singapore shows its own dollar plain). */
const SGD = new Intl.NumberFormat("en-SG", { style: "currency", currency: "SGD", maximumFractionDigits: 0 });

export const sgd = (amount: number) => SGD.format(amount);
