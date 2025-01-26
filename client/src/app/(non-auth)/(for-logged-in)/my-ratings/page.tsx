"use client";

import { useQueryClient } from "@tanstack/react-query";
import PaginatedTable from "../admin/components/PaginatedTable";
import { useEffect, useState } from "react";
import useGetRatings, { getRatings } from "@/api/rating/useGetRatings";
import useDeleteRating from "@/api/rating/useDeleteRating";
import useCustomToast from "@/hooks/useCustomToast";
import { DeleteModal } from "@/components/modals";
import RatingTableRow from "./RatingTableRow";

export default function MyRatings() {
  const [page, setPage] = useState<number>(1);

  const [isModalOpen, toggleModal] = useState<boolean>(false);

  const { data, isPending, isError, error } = useGetRatings({
    page,
    limit: 5,
  });

  const tableHeadingList = ["S.N.", "Food", "Rating"];

  const queryClient = useQueryClient();

  let startIndex: number = 0,
    endIndex: number = 0;

  const [ratingId, setRatingId] = useState<string>("");

  const deleteRating = useDeleteRating();

  useEffect(() => {
    if (data?.hasNextPage) {
      queryClient.prefetchQuery({
        queryKey: ["get-ratings", page + 1],
        queryFn: () => getRatings({ page: page + 1, limit: 5 }),
      });
    }

    // suppose user is on the last pagination and there is only entry in it and deletes that entry then user needs to be navigated to new last pagination
    if (data && data.totalPages < page) {
      setPage(data.totalPages);
    }
  }, [data, page]);

  useEffect(() => {
    if (!isModalOpen) {
      deleteRating.reset();
    }
  }, [isModalOpen]);

  const ratingDeleteSubmitHandler = async () => {
    await deleteRating.mutateAsync({ ratingId });
  };

  const deleteModalOpenHandler = (ratingId: string) => {
    setRatingId(ratingId);
    toggleModal(true);
  };

  useEffect(() => {
    if (deleteRating.isSuccess) {
      toggleModal(false);
    }
  }, [deleteRating.isSuccess]);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{error.errorResponse?.message || error.errorMessage}</span>;
  } else {
    startIndex = data.serialNumber;
    endIndex = Math.min(data.serialNumber + data.limit - 1, data.totalRatings);
  }

  return (
    <>
      {isModalOpen && (
        <DeleteModal
          isLoading={deleteRating.isPending}
          apiError={
            deleteRating.error?.errorResponse?.message ||
            deleteRating.error?.errorMessage
          }
          deleteHandler={ratingDeleteSubmitHandler}
          cancelHandler={() => {
            toggleModal(false);
          }}
        />
      )}
      <div className="p-5 max-w-5xl mx-auto my-24">
        <PaginatedTable
          hasData={data?.ratings.length > 0}
          tableHeadingList={tableHeadingList}
          currentPage={page}
          startIndex={startIndex}
          endIndex={endIndex}
          totalDocs={data.totalRatings}
          totalPages={data.totalPages}
          setPage={setPage}
          tableCaption="Your Ratings"
        >
          {data.ratings.map((rating, idx) => (
            <RatingTableRow
              key={idx}
              index={data.serialNumber + idx}
              item={rating}
              deleteModalOpenHandler={deleteModalOpenHandler}
            />
          ))}
        </PaginatedTable>
      </div>
      ;
    </>
  );
}
