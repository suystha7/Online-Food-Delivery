import useGetAllCategories from "@/api/category/useGetAllCategories";
import { Food } from "@/api/food/FoodTypes";
import { SelectOptionType } from "@/constants";
import {
  getAmountWithNepaliCurrency,
  getCapitalizedForm,
} from "@/utils/helpers";
import { Pencil, Trash2 } from "lucide-react";

interface IFoodTableRowProps {
  index: number;
  item: Food;
  editBtnClickHandler: (food: Food) => void;
  deleteModalOpenHandler: (id: string) => void;
}

export default function FoodTableRow(props: IFoodTableRowProps) {
  const { index, item, editBtnClickHandler, deleteModalOpenHandler } = props;

  const createdDate = new Date(item.createdAt);

  const { data } = useGetAllCategories({ page: 1, limit: 0 });

  const categoryDataObject = (data?.categories ?? []).reduce<
    Record<string, string>
  >((res, { _id, name }) => {
    res[_id] = name;
    return res;
  }, {} as Record<string, string>);

  return (
    <>
      <tr>
        <td>{index}.</td>

        <td>{getCapitalizedForm({ sentence: item.name })}</td>

        <td>
          {getCapitalizedForm({
            sentence: categoryDataObject[item.category] || "",
          })}
        </td>

        <td>
          <img
            src={item.mainImage.url}
            alt={`${item.name} Image`}
            className="w-[64px] h-[64px] rounded-md object-cover"
          />
        </td>

        <td>{getAmountWithNepaliCurrency({ amount: item.price })}</td>

        <td>{item.stock}</td>

        <td className="truncate">
          {getCapitalizedForm({ sentence: item.description })}
        </td>

        <td>{item.discount}</td>

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
