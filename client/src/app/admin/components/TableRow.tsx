import { HStack } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@/components/icons";
import { Income } from "@/api/income/IncomeTypes";
import { getCapitalizedForm } from "@/utils/helpers";

interface IIncomeTableRowProps {
  index: number;
  item: Income;
  editBtnClickHandler: (income: Income) => void;
  deleteModalOpenHandler: (id: string) => void;
}

export default function IncomeTableRow(props: IIncomeTableRowProps) {
  const { index, item, editBtnClickHandler, deleteModalOpenHandler } = props;

  return (
    <>
      <tr>
        <td>{index + 1}.</td>

        <td>{getCapitalizedForm({ sentence: item.category })}</td>

        <td>
          {item.amount.toLocaleString("hi-IN", {
            currency: item.currency,
            style: "currency",
            maximumFractionDigits: 2,
          })}
        </td>

        <td>{new Date(item.receivedDate).toDateString()}</td>

        <td>
          <div className="w-full flex justify-center gap-4">
            <button
              onClick={() => {
                editBtnClickHandler(item);
              }}
            >
              {/* <EditIcon /> */}E
            </button>

            <button
              onClick={() => {
                deleteModalOpenHandler(item._id);
              }}
            >
              D{/* <DeleteIcon /> */}
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}
