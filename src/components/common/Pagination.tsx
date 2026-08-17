import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

const PAGES_UNIT = 5;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const minPage = Math.floor((currentPage - 1) / PAGES_UNIT) * PAGES_UNIT + 1;

  const handleClickPage = (newPage: number) => {
    if (newPage < 1) {
      return;
    }
    if (newPage > totalPages) {
      return;
    }

    onPageChange(newPage);
  };

  return (
    <span className="flex items-center gap-2">
      <span className="flex gap-0.5">
        <button
          className="cursor-pointer h-8 w-6 flex items-center justify-center"
          onClick={() => handleClickPage(1)}
        >
          <FirstPageIcon fontSize="medium" className="relative top-0.5" />
        </button>
        <button
          className="cursor-pointer h-8 w-6 flex items-center justify-center"
          onClick={() => handleClickPage(currentPage - 1)}
        >
          <KeyboardArrowLeftIcon
            fontSize="medium"
            className="relative top-0.5"
          />
        </button>
      </span>
      <span className="flex gap-2">
        {[0, 1, 2, 3, 4].map((index) => {
          const pageValue = index + minPage;
          return (
            <button
              key={pageValue}
              className={`cursor-pointer h-8 w-6 flex items-center justify-center ${currentPage === pageValue ? 'text-emerald-700' : ''}`}
              onClick={() => handleClickPage(pageValue)}
            >
              {pageValue}
            </button>
          );
        })}
      </span>
      <span className="flex gap-0.5">
        <button
          className="cursor-pointer h-8 w-6 flex items-center justify-center"
          onClick={() => handleClickPage(currentPage + 1)}
        >
          <KeyboardArrowRightIcon
            fontSize="medium"
            className="relative top-0.5"
          />
        </button>
        <button
          className="cursor-pointer h-8 w-6 flex items-center justify-center"
          onClick={() => handleClickPage(totalPages)}
        >
          <LastPageIcon fontSize="medium" className="relative top-0.5" />
        </button>
      </span>
    </span>
  );
};
