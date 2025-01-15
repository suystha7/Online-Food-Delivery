import ErrorIcon from "@mui/icons-material/Error";

interface ErrorMessageProps {
  message: string;
  className?: string;
  isErrorIconShown?: boolean;
}
const ErrorMessage = (props: ErrorMessageProps) => {
  const {
    message,
    className,
    isErrorIconShown = true,
  } = props;

  return (
    <div className={`flex items-center text-red-500 ${className}`}>
      {isErrorIconShown && <ErrorIcon color="error" fontSize="small" />}
      <span className={"text-xs ml-1"}>{message}</span>
    </div>
  );
};

export default ErrorMessage;
