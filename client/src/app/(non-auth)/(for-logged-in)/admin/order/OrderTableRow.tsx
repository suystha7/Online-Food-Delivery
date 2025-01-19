import { Category } from "@/api/category/CategoryTypes";
import { OrderItem } from "@/api/order/OrderTypes";
import {
  getAmountWithNepaliCurrency,
  getCapitalizedForm,
} from "@/utils/helpers";
import { Pencil, Trash2 } from "lucide-react";

interface IOrderTableRowProps {
  index: number;
  order: OrderItem;
  deleteModalOpenHandler: (id: string) => void;
}

export default function OrderTableRow(props: IOrderTableRowProps) {
  const { index, order, deleteModalOpenHandler } = props;

  const createdDate = new Date(order.createdAt);

  return (
    <>
      <tr>
        <td>{index}.</td>

        <td>{order._id}</td>

        <td>{getCapitalizedForm({ sentence: order.fullName })}</td>

        <td>{getCapitalizedForm({ sentence: order.address })}</td>

        <td>{order.phoneNumber}</td>

        <td>
          <div className="flex flex-col gap-2">
            {order.items.map((item) => (
              <div key={item.foodId} className="flex gap-2 items-center">
                <span>
                  {getCapitalizedForm({ sentence: item.name })}{" "}
                  <span className="lowercase text-sm">(x{item.quantity})</span>
                </span>
              </div>
            ))}
          </div>
        </td>

        <td>{getAmountWithNepaliCurrency({ amount: order.orderPrice })}</td>

        <td>{order.status}</td>

        <td>{order.paymentMethod}</td>

        <td>{order.isPaymentDone ? "Paid" : "Remaining"}</td>

        <td>{createdDate.toDateString()}</td>

        <td>
          <div className="w-full flex justify-center gap-4">
            <button
              onClick={() => {
                deleteModalOpenHandler(order._id);
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
