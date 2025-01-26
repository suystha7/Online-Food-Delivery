"use client";

import { OrderItem, OrderStatusType } from "@/api/order/OrderTypes";
import useUpdateOrderStatus from "@/api/order/useUpdateOrderStatus";
import useVerifyPayment from "@/api/order/useVerifyPayment";
import { SelectOptionType } from "@/constants";
import { ORDER_STATUS_OPTIONS, PAYMENT_STATUS_OPTIONS } from "@/data";
import useCustomToast from "@/hooks/useCustomToast";
import {
  getAmountWithNepaliCurrency,
  getCapitalizedForm,
} from "@/utils/helpers";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";

interface IOrderTableRowProps {
  index: number;
  order: OrderItem;
  deleteModalOpenHandler: (id: string) => void;
}

export default function OrderTableRow(props: IOrderTableRowProps) {
  const { index, order, deleteModalOpenHandler } = props;

  const [status, setStatus] =
    useState<SingleValue<SelectOptionType<OrderStatusType>>>();

  const [isPaymentDone, setIsPaymentDone] =
    useState<SingleValue<SelectOptionType<boolean>>>();

  const toast = useCustomToast();

  const createdDate = new Date(order.createdAt);

  const updateStatus = useUpdateOrderStatus();

  const verifyPayment = useVerifyPayment();

  useEffect(() => {
    setStatus(
      ORDER_STATUS_OPTIONS.filter((option) => option.value === order.status)[0]
    );

    setIsPaymentDone(
      PAYMENT_STATUS_OPTIONS.filter(
        (option) => option.value === order.isPaymentDone
      )[0]
    );
  }, []);

  const updateStatusHandler = async (
    selected: SingleValue<SelectOptionType<OrderStatusType>>
  ) => {
    setStatus(selected);

    await updateStatus.mutateAsync({
      orderId: order._id,
      status: selected!.value,
    });
  };

  const verifyPaymentHandler = async (
    selected: SingleValue<SelectOptionType<boolean>>
  ) => {
    setIsPaymentDone(selected);

    await verifyPayment.mutateAsync({
      orderId: order._id,
    });
  };

  useEffect(() => {
    if (verifyPayment.isSuccess) {
      toast({
        msg:"Order payment has been verified successfully"
      })
    }
  }, [verifyPayment.isSuccess]);

  
  useEffect(() => {
    if (updateStatus.isSuccess) {
      toast({
        msg:"Order status has been updated successfully"
      })
    }
  }, [updateStatus.isSuccess]);
  

  return (
    <>
      <tr>
        <td>{index}.</td>

        <td className="">{order._id}</td>

        <td>{getCapitalizedForm({ sentence: order.fullName })}</td>

        <td>{getCapitalizedForm({ sentence: order.address })}</td>

        <td>{order.phoneNumber}</td>

        <td>
          <div className="flex flex-col gap-2">
            {order.items.map((item) => (
              <div key={item.foodId} className="flex gap-2 items-center">
                <img
                  src={item.mainImage.url}
                  alt={`${item.name} Image`}
                  className="w-[48px] h-[48px] border border-black rounded-md"
                />
                <div>
                  <span>{getCapitalizedForm({ sentence: item.name })} </span>
                  <span className="block lowercase">(x{item.quantity})</span>
                </div>
              </div>
            ))}
          </div>
        </td>

        <td>{getAmountWithNepaliCurrency({ amount: order.orderPrice })}</td>

        <td>
          <Select
            options={ORDER_STATUS_OPTIONS}
            menuPortalTarget={document.body}
            value={status}
            onChange={updateStatusHandler}
            isDisabled={status?.value !== "PENDING"}
          />
        </td>

        <td>{order.paymentMethod}</td>

        <td>
          <Select
            options={PAYMENT_STATUS_OPTIONS}
            menuPortalTarget={document.body}
            value={isPaymentDone}
            onChange={verifyPaymentHandler}
            isDisabled={isPaymentDone?.value}
          />
        </td>

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
