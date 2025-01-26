"use client";

import PaginatedTable from "../components/PaginatedTable";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { DeleteModal } from "@/components/modals";
import uesGetAllOrders, { getAllOrders } from "@/api/order/useGetAllOrders";
import useDeleteOrder from "@/api/order/useDeleteOrder";
import OrderTableRow from "./OrderTableRow";
import useCustomToast from "@/hooks/useCustomToast";

export default function OrderTable() {
  const [page, setPage] = useState<number>(1);

  const [isModalOpen, toggleModal] = useState<boolean>(false);

  const { data, isPending, isError, error } = uesGetAllOrders({
    page,
    limit: 5,
  });

  const tableHeadingList = [
    "S.N.",
    "Order ID",
    "Full Name",
    "Address",
    "Phone Number",
    "Order",
    "Total Price",
    "Order Status",
    "Payment Method",
    "Payment Status",
    "Created At",
    "Actions",
  ];

  const toast = useCustomToast();

  const queryClient = useQueryClient();

  let startIndex: number = 0,
    endIndex: number = 0;

  const [orderId, setOrderId] = useState<string>("");

  const deleteOrder = useDeleteOrder();

  useEffect(() => {
    if (data?.hasNextPage) {
      queryClient.prefetchQuery({
        queryKey: ["get-orders", "all", page + 1],
        queryFn: () => getAllOrders({ page: page + 1, limit: 5 }),
      });
    }

    // suppose user is on the last pagination and there is only entry in it and deletes that entry then user needs to be navigated to new last pagination
    if (data && data.totalPages < page) {
      setPage(data.totalPages);
    }
  }, [data, page]);

  useEffect(() => {
    if (!isModalOpen) {
      deleteOrder.reset();
    }
  }, [isModalOpen]);

  const orderDeleteSubmitHandler = async () => {
    await deleteOrder.mutateAsync({ orderId });
  };

  const deleteModalOpenHandler = (orderId: string) => {
    setOrderId(orderId);
    toggleModal(true);
  };

  useEffect(() => {
    if (deleteOrder.isSuccess) {
      toast({
        msg: "Order has been deleted successfully",
      });
      toggleModal(false);
    }
  }, [deleteOrder.isSuccess]);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{error.errorResponse?.message || error.errorMessage}</span>;
  } else {
    startIndex = data.serialNumber;
    endIndex = Math.min(data.serialNumber + data.limit - 1, data.totalOrders);
  }

  return (
    <>
      {isModalOpen && (
        <DeleteModal
          isLoading={deleteOrder.isPending}
          apiError={
            deleteOrder.error?.errorResponse?.message ||
            deleteOrder.error?.errorMessage
          }
          deleteHandler={orderDeleteSubmitHandler}
          cancelHandler={() => {
            toggleModal(false);
          }}
        />
      )}

      <PaginatedTable
        hasData={data?.orders.length > 0}
        tableHeadingList={tableHeadingList}
        currentPage={page}
        startIndex={startIndex}
        endIndex={endIndex}
        totalDocs={data.totalOrders}
        totalPages={data.totalPages}
        setPage={setPage}
        tableCaption="List of all orders"
      >
        {data.orders.map((order, idx) => (
          <OrderTableRow
            key={idx}
            index={data.serialNumber + idx}
            order={order}
            deleteModalOpenHandler={deleteModalOpenHandler}
          />
        ))}
      </PaginatedTable>
    </>
  );
}
