import React from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

const PaginationCustom = ({ page, query, type, pageType }) => {
  return (
    <div className="text-white w-full flex items-center justify-center mt-[50px]">
      <Stack spacing={4}>
        <Pagination
          page={page}
          count={500}
          color="primary"
          renderItem={(item) => (
            <PaginationItem
              {...item}
              component={Link}
              to={
                pageType === "discover"
                  ? `/discover/${type.toLowerCase()}/${query}${item.page === 1 ? "" : `?page=${item.page}`}`
                  : `/search?q=${query}&page=${item.page}`
              }
              style={{ color: "white" }}
            />
          )}
        />
      </Stack>
    </div>
  );
};

export default PaginationCustom;
