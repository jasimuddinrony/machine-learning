import React from 'react';
import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";


const PaginationUtil = ({handlePageClick,
                        totalPages, currentPage}) => {

    return (
        <>
            <ReactPaginate
                breakLabel="..."
                className={"pagination pagination-sm"}
                pageClassName={"page-item"}
                activeClassName={"active"}
                activeLinkClassName={"page-item-active"}
                nextLabel="다음 >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={totalPages}
                previousLabel="< 이전"
                renderOnZeroPageCount={null}
                forcePage = {currentPage}
            />
        </>
    )
}

PaginationUtil.propType = {
    handlePageClick: PropTypes.func,
    totalPages: PropTypes.number
};

export default PaginationUtil;
