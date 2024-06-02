import { FaAngleLeft, FaAngleRight, FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { useMemeber } from "../context/memberContext";
import data from "../data/data";
import { IApplicationList } from "../utils/types";

const NUM_PER_PAGE = 50;

const Pagination = () => {
	const { setApplicationList, pages, currentPage, setCurrentPage } = useMemeber();

	const goToPreviousPage = () => {
		if (currentPage > 1) {
			setPage(currentPage - 1);
		}
	};

	const goToNextPage = () => {
		if (currentPage < pages.length) {
			setPage(currentPage + 1);
		}
	};

	const goToFirstPage = () => {
		setPage(1);
	};

	const goToLastPage = () => {
		setPage(pages.length);
	};
	const setPage = (page: number) => {
		let initial_data = data.slice((page - 1) * NUM_PER_PAGE, page * NUM_PER_PAGE) as IApplicationList[];
		setApplicationList(initial_data);
		setCurrentPage(page);
	};
	return (
		<div className="bg-gray-100 py-2 px-1 md:px-5 flex justify-center w-full">
			<div className="text-sm md:text-xl flex items-center flex-wrap h-auto">
				<button
					className="text-base md:text-xl rounded bg-transparent text-gray-400 p-2 md:p-4 flex justify-center items-center"
					onClick={goToFirstPage}>
					<FaAnglesLeft />
				</button>
				<button
					className="text-base md:text-xl rounded bg-transparent text-gray-400 p-2 md:p-4 flex justify-center items-center"
					onClick={goToPreviousPage}>
					<FaAngleLeft />
				</button>
				{pages.map((page) => (
					<button
						key={page}
						className={`w-8 h-8 md:w-10 md:h-10 border-none mx-1 md:mx-2 p-2 md:p-4 rounded text-xs md:text-base font-bold flex justify-center items-center ${
							page === currentPage ? "text-white bg-[#2A3958]" : "text-gray-400"
						}`}
						onClick={() => setPage(page)}>
						{page}
					</button>
				))}
				<button
					className="text-base md:text-xl rounded bg-transparent text-gray-400 p-2 md:p-4 flex justify-center items-center"
					onClick={goToNextPage}>
					<FaAngleRight />
				</button>
				<button
					className="text-base md:text-xl rounded bg-transparent text-gray-400 p-2 md:p-4 flex justify-center items-center"
					onClick={goToLastPage}>
					<FaAnglesRight />
				</button>
			</div>
		</div>
	);
};

export default Pagination;
