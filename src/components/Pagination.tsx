import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { useSearchParams } from "react-router-dom";
import React from "react";

export type PaginationProps = {
  page: number;
  pageCount: number;
  callBacks?: {
    onFirstClick: () => void;
    onPrevClick: () => void;
    onNextClick: () => void;
    onLastClick: () => void;
  };
};

const Pagination = (props: PaginationProps) => {
  const [_, setSearchParams] = useSearchParams();


  const onFirstClick = React.useCallback(() => {
    setSearchParams((p) => {
      p.set("page", "1");
      return p;
    });
  }, [setSearchParams]);

  const onNextClick = React.useCallback(() => {
    setSearchParams((p) => {
      p.set("page", `${props.page + 1}`);
      return p;
    });
  }, [setSearchParams, props.page]);

  const onPrevClick = React.useCallback(() => {
    setSearchParams((p) => {
      p.set("page", `${props.page - 1}`);
      return p;
    });
  }, [setSearchParams, props.page]);

  const onLastClick = React.useCallback(() => {
    setSearchParams((p) => {
      p.set("page", `${props.pageCount}`);
      return p;
    });
  }, [setSearchParams, props.pageCount]);

  return (
    <div className="flex w-full justify-center items-center gap-4">
      <Button
        variant={"outline"}
        className="w-5 h-6 px-6 py-4"
        onClick={props.callBacks?.onFirstClick ?? onFirstClick}
        disabled={Number(props.page) === 1}
        type="button"
      >
        <ChevronsLeft />
      </Button>
      <Button
        variant={"outline"}
        className="w-5 h-6 px-6 py-4"
        onClick={props.callBacks?.onPrevClick ?? onPrevClick}
        disabled={Number(props.page) === 1}
        type="button"
      >
        <ChevronLeft />
      </Button>
      <Button
        variant={"outline"}
        className="w-28 h-6 px-6 py-4 bg-secondary/50"
        type="button"
      >
        {props.page} of {props.pageCount}
      </Button>
      <Button
        variant={"outline"}
        className="w-5 h-6 px-6 py-4"
        onClick={props.callBacks?.onNextClick ?? onNextClick}
        disabled={props.page >= props.pageCount}
        type="button"
      >
        <ChevronRight />
      </Button>

      <Button
        variant={"outline"}
        className="w-5 h-6 px-6 py-4"
        onClick={props.callBacks?.onFirstClick ?? onLastClick}
        disabled={props.page >= props.pageCount}
        type="button"
      >
        <ChevronsRight />
      </Button>
    </div>
  );
};

export default Pagination;
