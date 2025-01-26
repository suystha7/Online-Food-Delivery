import { useMemo } from "react";
import { BUTTON_TYPES } from "@/constants";
import Spinner from "../icons/Spinner";

interface ButtonProps {
  buttonType?: BUTTON_TYPES;
  children: React.ReactNode;
  className?: string;
  onClickHandler?: () => void;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  isDisabled?: boolean;
}
const Button = (props: ButtonProps) => {
  const {
    buttonType = BUTTON_TYPES.default,
    children,
    className,
    onClickHandler = () => {},
    isLoading = false,
    type = "button",
    isDisabled = false,
  } = props;

  const buttonStyles = useMemo(() => {
    switch (buttonType) {
      case BUTTON_TYPES.primaryButton:
        // return "bg-darkRed text-zinc-50 rounded";
        return "bg-red-500 text-white hover:bg-red-600";
      case BUTTON_TYPES.secondaryButton:
        return "bg-gray-300 text-black hover:bg-gray-200";
      case BUTTON_TYPES.redButton:
        return "bg-accent border-2 border-accent text-white hover:bg-white hover:text-accent py-0 px-4";
      default:
        return "";
    }
  }, [buttonType]);

  return (
    <button
      type={type}
      className={`font-semibold rounded-sm px-4 py-2 disabled:pointer-events-none disabled:opacity-50 ${buttonStyles} ${className}`}
      onClick={onClickHandler}
      disabled={isDisabled}
    >
      {!isLoading ? (
        children
      ) : (
        <Spinner className={"text-background fill-slate-400 mx-auto"} />
      )}
    </button>
  );
};

export default Button;
