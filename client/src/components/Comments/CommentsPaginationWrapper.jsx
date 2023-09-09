import { useEffect, useState } from "react";
import CommentsList from ".";

const COMMENTS_PER_PAGE = 5;

const CommentsPaginationWrapper = (props) => {
  const { comments } = props;
  const [curentPageNo, setCurrentPageNo] = useState(1);
  const pageCountArr = new Array(
    Math.ceil(comments.length / COMMENTS_PER_PAGE)
  ).fill(0);
  const [currentComments, setCurrentComments] = useState(comments.slice(0, 5));

  useEffect(() => {
    const pageNo = curentPageNo;
    setCurrentComments(
      comments.slice(
        (pageNo - 1) * COMMENTS_PER_PAGE,
        COMMENTS_PER_PAGE * pageNo
      )
    );
  }, [curentPageNo, comments]);

  return (
    <>
      <CommentsList comments={currentComments} />
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <div
              className="page-link"
              href="#"
              tabindex="-1"
              onClick={() => setCurrentPageNo((prev) => prev - 1)}
            >
              Previous
            </div>
          </li>
          {pageCountArr.map((_, index) => (
            <li className="page-item">
              <div
                className="page-link"
                onClick={(e) => setCurrentPageNo(Number(e.target.id))}
                id={index + 1}
              >
                {index + 1}
              </div>
            </li>
          ))}
          <li className="page-item">
            <div
              className="page-link"
              href="#"
              onClick={() => setCurrentPageNo((prev) => prev + 1)}
            >
              Next
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default CommentsPaginationWrapper;
