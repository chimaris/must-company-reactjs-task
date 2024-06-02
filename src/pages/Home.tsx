import { useEffect, useState } from "react";
import Header from "../components/Header";
import Button from "../components/shared/Button";
import SelectInput from "../components/shared/SelectInput";
import { filterOptions, limitOptions, sortOptions, statusOption } from "../constants";
import data from "../data/data";
import { FaAngleLeft, FaAngleRight, FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { IApplicationList } from "../utils/types";
import ChangeInvestment from "../components/modals/ChangeInvestment";
import { useMemeber } from "../context/memberContext";
import Alert from "../components/modals/Alert";
import RefusalForm from "../components/modals/RefusalForm";

const Home = () => {
	const [applicationList, setApplicationList] = useState<IApplicationList[]>([]);
	const [pages, setPages] = useState<number[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const { setShowInvestModal, setShowRejectionModal, alertModalState, setAlertModalState, selectedData, setSelectedData } = useMemeber();

	useEffect(() => {
		let initial_data = data.slice(0, 50) as IApplicationList[];
		setApplicationList(initial_data);
		let temp = [];
		for (let i = 1; i <= Math.ceil(data.length / 50); i++) {
			temp.push(i);
		}
		setPages(temp);
	}, []);

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
		let initial_data = data.slice((page - 1) * 50, page * 50) as IApplicationList[];
		setApplicationList(initial_data);
		setCurrentPage(page);
	};

	const saveHandle = () => {
		if (!selectedData.length) {
			setAlertModalState({
				...alertModalState,
				text: "선택된 신청건이 없습니다.",
				type: "warn",
				show: true,
			});
			return;
		}

		const allSelectedData = applicationList.filter((item) => selectedData.includes(item.NO.toString()));
		const hasApprovedMembers = allSelectedData.some((item) => item.승인여부 === "승인완료");
		const hasRejectedMembers = allSelectedData.some((item) => item.승인여부 === "승인거부");

		if (hasApprovedMembers) {
			setAlertModalState({
				...alertModalState,
				text: "이미 승인 완료된 회원입니다.",
				type: "warn",
				show: true,
			});
		} else if (hasRejectedMembers) {
			setAlertModalState({
				...alertModalState,
				text: "이미 승인 거부된 회원입니다.",
				type: "warn",
				show: true,
			});
		} else {
			setShowRejectionModal(true);
		}
	};

	return (
		<>
			<ChangeInvestment />
			<RefusalForm />
			<Alert />
			<div className="w-[80%] mx-auto my-4">
				<Header />
				<div className="flex gap-2 justify-between items-center border-b border-[#D7D8DA] py-3 mt-10 ">
					<div className="flex justify-start items-center gap-2">
						<h2 className="font-semibold text-xl text-[#0B101A] ">신청 목록</h2>
						<p className="font-medium text-sm text-[#5A616A]">
							(총 100명 | 승인대기 <span className="text-[#FF4D4F] underline">50</span>건)
						</p>
					</div>
					<div className="flex flex-wrap justify-start items-center gap-1 ">
						<SelectInput
							options={filterOptions}
							onChangeHandler={(e) => {
								console.log("filter", e.value.toString());
							}}
						/>
						<SelectInput
							options={sortOptions}
							onChangeHandler={(e) => {
								console.log(e.value.toString());
							}}
						/>
						<SelectInput
							options={limitOptions}
							onChangeHandler={(e) => {
								console.log(parseInt(e.value.toString()));
							}}
						/>
					</div>
				</div>

				<div className="w-full flex justify-between items-center py-3 ">
					<Button title="등록" style="w-[100px]" onClick={() => setShowInvestModal(true)} />
					<div className="flex gap-2 justify-end items-center">
						<span className="text-[#5A616A] text-sm mr-4 whitespace-nowrap leading-[16px]">선택한 {selectedData.length}건</span>
						<SelectInput options={statusOption} onChangeHandler={() => console.log("status")} />
						<Button onClick={saveHandle} title="저장" style="w-[100px]" />
					</div>
				</div>

				<div className="w-full overflow-x-auto">
					<table className="border-collapse table-fixed">
						<thead>
							<tr className="h-15">
								<th className="text-base font-semibold p-2.5 bg-gray-200 border-r border-white min-w-[30px]">
									<label htmlFor="markAll" className="relative group">
										<input
											type="checkbox"
											name="markAll"
											checked={selectedData.length === applicationList.length}
											onChange={(e) => {
												if (e.target.checked) {
													setSelectedData(applicationList.map((item) => item.NO.toString()));
												} else {
													setSelectedData([]);
												}
											}}
											className="opacity-0 -z-10 absolute w-0 h-0 peer"
											id="markAll"
										/>
										<span className="w-4 h-4 flex mx-auto rounded bg-white text-white shadow border border-[#D7D8DA] peer-checked:border-[#2A3958] peer-checked:bg-[#2A3958]">
											<FaCheck className="m-auto text-[10px]" />
										</span>
									</label>
								</th>

								<th className="text-base font-semibold p-2.5 bg-gray-200 border-r border-white min-w-[50px]">NO</th>
								<th className="text-base font-semibold p-2.5 bg-gray-200 border-r border-white min-w-[100px]">기존유형</th>
								<th className="text-base font-semibold p-2.5 bg-gray-200 border-r border-white min-w-[100px]">신청유형</th>
								<th className="text-base font-semibold p-2.5 bg-gray-200 border-r border-white min-w-[100px]">제출서류</th>
								<th className="text-base font-semibold p-2.5 bg-gray-200 border-r border-white min-w-[180px]">신청일시</th>
								<th className="text-base font-semibold p-2.5 bg-gray-200 border-r border-white min-w-[100px]">승인여부</th>
								<th className="text-base font-semibold p-2.5 bg-gray-200 border-r border-white min-w-[400px]">승인거부 사유</th>
								<th className="text-base font-semibold p-2.5 bg-gray-200 border-r border-white min-w-[180px]">승인일시</th>
								<th className="text-base font-semibold p-2.5 bg-gray-200 border-r border-white min-w-[100px]">관리자</th>
							</tr>
						</thead>
						<tbody>
							{applicationList.length > 0 ? (
								applicationList.map((application) => (
									<tr key={application.NO} className="h-11 even:bg-gray-100 text-center text-sm font-medium p-2.5">
										<td className="py-2.5 border-r border-white last:border-r-transparent">
											<label htmlFor={`markData-${application.NO}`} className="relative group">
												<input
													type="checkbox"
													name={`markData-${application.NO}`}
													checked={selectedData.includes(application.NO.toString())}
													onChange={(e) => {
														if (e.target.checked) {
															setSelectedData([...selectedData, application.NO.toString()]);
														} else {
															setSelectedData(selectedData.filter((id) => id !== application.NO.toString()));
														}
													}}
													className="opacity-0 -z-10 absolute w-0 h-0 peer"
													id={`markData-${application.NO}`}
												/>
												<span className="w-4 h-4 flex mx-auto rounded bg-white text-white shadow border border-[#D7D8DA] peer-checked:border-[#2A3958] peer-checked:bg-[#2A3958]">
													<FaCheck className="m-auto text-[10px]" />
												</span>
											</label>
										</td>

										<td className="p-2.5">{application.NO}</td>
										<td className="p-2.5">{application.기존유형}</td>
										<td className="p-2.5">{application.신청유형}</td>
										<td className="p-2.5">
											<button className="h-7 bg-gray-200 border border-gray-300 py-1 px-4 rounded-lg">{application.제출서류}</button>
										</td>
										<td className="p-2.5">{application.신청일시}</td>
										<td className="p-2.5">
											<span
												className={`status py-0.5 px-2.5 rounded-full ${
													application.승인여부 === "승인대기"
														? "text-orange-700 bg-orange-100"
														: application.승인여부 === "승인거부"
														? "text-red-700 bg-red-100"
														: "text-green-700 bg-green-100"
												}`}>
												{application.승인여부}
											</span>
										</td>
										<td className="p-2.5 text-left">{application["승인거부 사유"]}</td>
										<td className="p-2.5">{application.승인일시}</td>
										<td className="p-2.5">{application.관리자}</td>
									</tr>
								))
							) : (
								<tr className="h-[400px]">
									<td colSpan={10} className="text-center align-middle text-gray-400 p-2.5">
										조회 결과가 없습니다.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>

				{applicationList.length > 0 && (
					<div className="bg-gray-100 py-2 px-5 flex justify-center">
						<div className="h-10 text-xl flex items-center">
							<button className="text-xl rounded bg-transparent text-gray-400 p-4 flex justify-center items-center" onClick={goToFirstPage}>
								<FaAnglesLeft />
							</button>
							<button className="text-xl rounded bg-transparent text-gray-400 p-4 flex justify-center items-center" onClick={goToPreviousPage}>
								<FaAngleLeft />
							</button>
							{pages.map((page) => (
								<button
									key={page}
									className={`w-10 h-10 border-none mx-2 p-4 rounded text-base font-bold flex justify-center items-center ${
										page === currentPage ? "text-[#F5F5F5] bg-[#2A3958] p-2 text-[20px] " : "text-[#A1A1A1]"
									}`}
									onClick={() => setPage(page)}>
									{page}
								</button>
							))}
							<button className="p-4 text-xl rounded bg-transparent text-gray-400 flex justify-center items-center" onClick={goToNextPage}>
								<FaAngleRight />
							</button>
							<button className="text-xl rounded bg-transparent text-gray-400 p-4 flex justify-center items-center" onClick={goToLastPage}>
								<FaAnglesRight />
							</button>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default Home;
