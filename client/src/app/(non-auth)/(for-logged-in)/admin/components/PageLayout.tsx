import { Button } from "@/components/basic";
import { BUTTON_TYPES } from "@/constants";

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  addBtnText?: string;
  addBtnClickHandler?: () => void;
}

export default function PageLayout(props: PageLayoutProps) {
  const { children, title, addBtnText, addBtnClickHandler } = props;

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl text-secondary font-bold">{title}</h1>
        {addBtnText && (
          <Button
            buttonType={BUTTON_TYPES.primaryButton}
            onClickHandler={addBtnClickHandler}
          >
            {addBtnText}
          </Button>
        )}
      </div>

      <div>{children}</div>
    </div>
  );
}
