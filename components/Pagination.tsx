import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo, useState } from "react";

const DISPLAYED_LIMIT = 9;

interface PaginationProps {
  pageNumber: number;
  category?: string;
  callBack?: (currentPage: number) => void;
}

const Pagination = ({ pageNumber, callBack, category }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  useEffect(() => {
    setPages(() => {
      const list = Array.from(
        { length: Math.max(pageNumber, 1) },
        (v, k) => k + 1,
      );
      if (pageNumber > DISPLAYED_LIMIT) {
        const start = Math.max(
          1,
          currentPage -
            4 -
            (pageNumber - currentPage > 4 ? 0 : 4 - pageNumber + currentPage),
        );
        const end = Math.min(
          pageNumber,
          currentPage + 4 + (currentPage - 1 > 4 ? 0 : 5 - currentPage),
        );
        return Array.from({ length: end - start + 1 }, (v, k) => k + start);
      }
      return list;
    });
  }, [currentPage, pageNumber]);

  const handleClick = (newCurrentPage: number) => {
    setCurrentPage((prev) => {
      prev !== newCurrentPage && callBack && callBack(newCurrentPage);
      return newCurrentPage;
    });
  };

  return (
    <div className="w-full flex space-x-3 items-center justify-center text-lg">
      <FontAwesomeIcon
        icon={faChevronLeft}
        className="cursor-pointer"
        onClick={() => handleClick(Math.max(currentPage - 1, 1))}
      />
      {pages.map((number) => (
        <span
          className={
            "cursor-pointer w-10 h-10 justify-center select-none items-center flex" +
            (currentPage === number ? " yellow rounded-full" : "")
          }
          onClick={() => handleClick(number)}
          key={number}
        >
          {number}
        </span>
      ))}
      <FontAwesomeIcon
        icon={faChevronRight}
        className="cursor-pointer"
        onClick={() => handleClick(Math.min(currentPage + 1, pageNumber))}
      />
    </div>
  );
};

export default Pagination;
