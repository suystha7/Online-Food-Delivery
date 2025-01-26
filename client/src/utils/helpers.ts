export const getCapitalizedForm = ({
  sentence,
}: {
  sentence: string;
}): string => {
  return sentence
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const getAmountWithNepaliCurrency = ({ amount }: { amount: number }) => {
  return amount.toLocaleString("en-NP", {
    currency: "NPR",
    style: "currency",
    maximumFractionDigits: 0,
  });
};
