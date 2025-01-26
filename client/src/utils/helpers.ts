/**
 * Utility to capitalize the first letter of each word in a sentence.
 * If the input is not a valid string, it will return an empty string.
 */
export const getCapitalizedForm = ({
  sentence,
}: {
  sentence: string;
}): string => {
  if (typeof sentence !== "string" || !sentence.trim()) {
    return ""; 
  }

  return sentence
    .split(" ")
    .map((word) => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ");
};

/**
 * Utility to format a number as a Nepali currency (NPR).
 * Example: 123456 -> "NPR 1,23,456.00"
 */
export const getAmountWithNepaliCurrency = ({
  amount,
}: {
  amount: number;
}): string => {
  if (typeof amount !== "number" || isNaN(amount)) {
    throw new Error("Invalid amount provided");
  }

  return amount.toLocaleString("en-NP", {
    style: "currency",
    maximumFractionDigits: 0,
    currency: "NPR",
  });
};
