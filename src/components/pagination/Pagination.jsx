import ReactPaginate from "react-paginate";
import "./Pagination.css";
import PreviousIcon from "../../assets/icons/pagination/PreviousIcon";
import NextIcon from "../../assets/icons/pagination/NextIcon";

const Pagination = (
    {
        handlePageClick = (() => {
        }),
        numPages = 2
    }) => {
    return (
        <div className="pagination">
            <ReactPaginate
                breakLabel="..."
                nextLabel={<PreviousIcon/>}
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                // forcePage={forcePage}
                marginPagesDisplayed={2}
                pageCount={numPages}
                previousLabel={<NextIcon/>}
                renderOnZeroPageCount={null}
                containerClassName={"pagination__item"}
                previousClassName={"page-item next"}
                nextClassName={"page-item prev"}
                pageClassName={"page-item"}
                breakClassName={"page-item"}
                pageLinkClassName={"page-link"}
                nextLinkClassName={"page-link"}
                previousLinkClassName={"page-link"}
                breakLinkClassName={"page-link"}
                activeClassName={"page-active"}
                disabledClassName={"disabledBtn"}
            />
        </div>
    );
};

export default Pagination;
