import { Rating } from "@/api/rating/RatingTypes";
import { getCapitalizedForm } from "@/utils/helpers";
import { Pencil, Trash2 } from "lucide-react";
import { Rating as RatingComponent } from "@mui/material";
import React, { useEffect } from "react";
import useCreateUpdateRating from "@/api/rating/useCreateUpdateRating";
import useCustomToast from "@/hooks/useCustomToast";

interface IRatingTableRowProps {
  index: number;
  item: Rating;
  deleteModalOpenHandler: (id: string) => void;
}

export default function RatingTableRow(props: IRatingTableRowProps) {
  const { index, item, deleteModalOpenHandler } = props;

  const { mutateAsync, isPending, isSuccess, isError } =
    useCreateUpdateRating();

  const toast = useCustomToast();

  const ratingChangeHandler = async (
    event: React.ChangeEvent<{}>,
    value: number | null
  ) => {
    await mutateAsync({
      foodId: item.food._id,
      rating: value ?? 0,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        msg: "Rating has been updated successfully",
      });
    }
  }, [isSuccess]);

  return (
    <>
      <tr>
        <td>{index}.</td>

        <td>
          <div className="flex gap-4 items-center">
            <img
              src={item.food?.mainImage.url}
              alt={`${item?.food.name} Image`}
              className="w-[48px] h-[48px] border border-black rounded-md"
            />
            <span>{getCapitalizedForm({ sentence: item.food.name })} </span>
          </div>
        </td>

        <td>
          <RatingComponent
            value={item.rating}
            max={5}
            precision={1}
            onChange={ratingChangeHandler}
            readOnly={item.rating>0}
          />
        </td>

        {/* <td>
          <div className="w-full flex justify-center gap-4">
            <button
              onClick={() => {
                deleteModalOpenHandler(item._id);
              }}
            >
              <Trash2 className="w-5 h-5" color="red" />
            </button>
          </div>
        </td> */}
      </tr>
    </>
  );
}
