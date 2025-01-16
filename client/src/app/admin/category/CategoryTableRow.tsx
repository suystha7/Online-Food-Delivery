import { Category } from "@/api/category/CategoryTypes";
import { getCapitalizedForm } from "@/utils/helpers";
import { Pencil, Trash2 } from "lucide-react";

interface ICategoryTableRowProps {
  index: number;
  item: Category;
  editBtnClickHandler: (category: Category) => void;
  deleteModalOpenHandler: (id: string) => void;
}

export default function CategoryTableRow(props: ICategoryTableRowProps) {
  const { index, item, editBtnClickHandler, deleteModalOpenHandler } = props;

  const createdDate = new Date(item.createdAt);

  return (
    <>
      <tr>
        <td>{index}.</td>

        <td className="capitalize">
          {getCapitalizedForm({ sentence: item.name })}
        </td>

        <td>
          <img
            src={item.mainImage.url}
            alt={`${item.name} Image`}
            className="w-[64px] h-[64px]"
          />
        </td>

        <td>{createdDate.toDateString()}</td>

        <td>
          <div className="w-full flex justify-center gap-4">
            <button
              onClick={() => {
                editBtnClickHandler(item);
              }}
            >
              <Pencil className="w-5 h-5 text-yellow-500" />
            </button>

            <button
              onClick={() => {
                deleteModalOpenHandler(item._id);
              }}
            >
              <Trash2 className="w-5 h-5" color="red" />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}
