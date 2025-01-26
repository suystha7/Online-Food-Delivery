// import { Box, Text, HStack, Button } from "@chakra-ui/react";
// import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";
// import { PERIOD_FILTER } from "@/constants";

import { Button } from "@/components/basic";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./PaginatedTable.css";
import { Dispatch, SetStateAction } from "react";

interface PaginatedTableProps {
  hasData: boolean;
  children: React.ReactNode;
  tableHeadingList: Array<string>;
  currentPage: number;
  startIndex: number;
  endIndex: number;
  totalDocs: number;
  totalPages: number;
  setPage: Dispatch<SetStateAction<number>>;
  tableCaption?: string;
}

const NumberBox = ({
  idx,
  currentPage,
  onClickHandler,
}: {
  idx: number;
  currentPage: number;
  onClickHandler: (page: number) => void;
}) => {
  return (
    <button
      className={`min-w-8 h-8 text-black font-medium rounded-md px-3 ${
        currentPage === idx ? "bg-blue-700 text-white" : "bg-gray-200"
      }`}
      onClick={() => onClickHandler(idx)}
    >
      <span>{idx}</span>
    </button>
  );
};

export default function PaginatedTable(props: PaginatedTableProps) {
  const {
    hasData,
    children,
    tableHeadingList,
    currentPage,
    startIndex,
    endIndex,
    totalDocs,
    totalPages,
    setPage,
    tableCaption,
  } = props;
  return (
    <div className="">
      <h3 className="p-4 text-2xl text-center font-semibold text-secondary">
        {tableCaption}
      </h3>

      <div className="overflow-x-auto">
        {hasData ? (
          <>
            <table className="table">
              <thead>
                <tr>
                  {tableHeadingList.map((heading) => (
                    <th key={heading}>{heading}</th>
                  ))}
                </tr>
              </thead>

              <tbody>{children}</tbody>
            </table>
          </>
        ) : (
          <span className="block text-center font-medium tracking-wide">There are no entries to be displayed for your request.</span>
        )}
      </div>

      {hasData && (
        <div className="flex justify-between gap-8 mt-6">
          <span className="text-gray-400 text-sm font-medium whitespace-nowrap">
            Showing data {startIndex} to {endIndex}
            &nbsp;of total {totalDocs} entries
          </span>

          <div className="flex gap-4 items-end">
            <button
              className="min-w-8 h-8 rounded-md  bg-gray-200 px-3 disabled:opacity-40"
              onClick={() => setPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-5 h-5 text-black" />
            </button>

            <NumberBox
              idx={1}
              currentPage={currentPage}
              onClickHandler={setPage}
            />

            {currentPage > 5 && (
              <span className="text-2xl">.&nbsp;.&nbsp;.</span>
            )}

            {Array.from({ length: 3 }, (_, idx) => idx)
              .filter((idx) => currentPage - 3 + idx > 1)
              .map((idx) => (
                <NumberBox
                  key={idx}
                  idx={currentPage - 3 + idx}
                  currentPage={currentPage}
                  onClickHandler={setPage}
                />
              ))}

            {![1, totalPages].includes(currentPage) && (
              <NumberBox
                idx={currentPage}
                currentPage={currentPage}
                onClickHandler={setPage}
              />
            )}

            {Array.from({ length: 3 }, (_, idx) => idx)
              .filter((idx) => currentPage + idx + 1 < totalPages)
              .map((idx) => (
                <NumberBox
                  key={idx}
                  idx={currentPage + idx + 1}
                  currentPage={currentPage}
                  onClickHandler={setPage}
                />
              ))}

            {currentPage < totalPages - 4 && (
              <span className="text-2xl">.&nbsp;.&nbsp;.</span>
            )}

            {totalPages !== 1 && (
              <NumberBox
                idx={totalPages}
                currentPage={currentPage}
                onClickHandler={setPage}
              />
            )}

            <button
              className="min-w-8 h-8 rounded-md  bg-gray-200 px-3 disabled:opacity-40"
              onClick={() => setPage(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-5 h-5 text-black" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
