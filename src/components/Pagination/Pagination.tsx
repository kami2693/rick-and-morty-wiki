import ReactPaginate from 'react-paginate';

interface PaginationProps {
  info: {
    pages: number;
  };
  pageNumber: number;
  setPageNumber: (page: number) => void;
}

const Pagination = ({ info, pageNumber, setPageNumber }: PaginationProps) => {
  const pageCount = info?.pages || 1;

  const handlePageClick = (data: { selected: number }) => {
    setPageNumber(data.selected + 1);
  };

  return (
    <ReactPaginate
      className="pagination"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      nextClassName="page-item"
      previousLinkClassName="page-link"
      nextLinkClassName="page-link"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      activeClassName="active"
      disabledClassName="disabled"
      forcePage={pageNumber - 1}
      pageCount={pageCount}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      onPageChange={handlePageClick}
      previousLabel={<i className="fas fa-chevron-left"></i>}
      nextLabel={<i className="fas fa-chevron-right"></i>}
      breakLabel="..."
    />
  );
};

export default Pagination; 