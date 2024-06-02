import { useEffect, useState } from "react";
import Header from "../components/Header";
import Button from "../components/shared/Button";
import SelectInput from "../components/shared/SelectInput";
import { filterOptions, limitOptions, sortOptions, statusOption } from "../constants";
import data from "../data/data";
import { FaCheck } from "react-icons/fa";
import { IApplicationList } from "../utils/types";
import ChangeInvestment from "../components/modals/ChangeInvestment";
import { useMemeber } from "../context/memberContext";
import Alert from "../components/modals/Alert";
import RefusalForm from "../components/modals/RefusalForm";
import Pagination from "../components/Pagination";

const Home = () => {
	const [filter, setFilter] = useState("승인여부 전체");
	const [sort, setSort] = useState("");
	const {
		applicationList,
		setApplicationList,
		setPages,
		setShowInvestModal,
		setShowRejectionModal,
		alertModalState,
		setAlertModalState,
		selectedData,
		setSelectedData,
		setSizePerPage,
		sizePerPage,
	} = useMemeber();

	useEffect(() => {
		let filteredData = data;

		// Apply filter
		if (filter !== "승인여부 전체") {
			filteredData = data.filter((item) => item.승인여부 === filter);
		}

		// Apply sort
		filteredData = filteredData.sort((a, b) => {
			if (sort === "신청일시") {
				return new Date(b.신청일시).getTime() - new Date(a.신청일시).getTime();
			} else if (sort === "승인일시") {
				const dateA = new Date(a.승인일시).getTime();
				const dateB = new Date(b.승인일시).getTime();

				// Handle invalid dates
				if (isNaN(dateA) && isNaN(dateB)) return 0;
				if (isNaN(dateA)) return 1;
				if (isNaN(dateB)) return -1;

				return dateB - dateA;
			}
			return 0;
		});

		// Apply pagination
		let paginatedData = filteredData.slice(0, sizePerPage) as IApplicationList[];

		setApplicationList(paginatedData);

		let temp = [];
		for (let i = 1; i <= Math.ceil(filteredData.length / sizePerPage); i++) temp.push(i);

		setPages(temp);
	}, [sizePerPage, filter, sort]);

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
			<div className="w-[95%] md:w-[80%] mx-auto my-4">
				<Header />
				<div className="flex flex-col md:flex-row gap-2 justify-between items-center border-b border-[#D7D8DA] py-3 mt-10 ">
					<div className="flex justify-start items-center gap-2">
						<h2 className="font-semibold text-xl text-[#0B101A] ">신청 목록</h2>
						<p className="font-medium text-sm leading-4 text-[#5A616A]">
							(총 {data.length}명 | 승인대기&nbsp;
							<span className="text-[#FF4D4F] underline">{data.filter((item) => item.승인여부 === "승인대기").length}</span>
							건)
						</p>
					</div>
					<div className="flex flex-wrap justify-between md:justify-start items-center gap-1 ">
						<SelectInput
							options={filterOptions}
							onChangeHandler={(e) => {
								setFilter(e.value.toString());
							}}
							style="w-[48%] md:w-[150px]"
						/>
						<SelectInput
							options={sortOptions}
							onChangeHandler={(e) => {
								setSort(e.value.toString());
							}}
							style="w-[48%] md:w-[150px]"
						/>
						<SelectInput
							options={limitOptions}
							onChangeHandler={(e) => {
								setSizePerPage(parseInt(e.value.toString()));
							}}
							style="w-full md:w-[150px]"
						/>
					</div>
				</div>

				<div className="hidden md:flex justify-between items-center py-3 ">
					<Button title="등록" className="w-[100px] text-white" onClick={() => setShowInvestModal(true)} />
					<div className="flex gap-2 justify-end items-center">
						<span className="text-[#5A616A] text-sm mr-4 whitespace-nowrap leading-[16px]">선택한 {selectedData.length}건</span>
						<SelectInput options={statusOption} onChangeHandler={() => console.log("status")} />
						<Button onClick={saveHandle} title="저장" className="w-[100px] text-white" />
					</div>
				</div>
				{/* Mobile view */}
				<div className="flex flex-col items-center gap-4 py-3 md:hidden ">
					<div className="flex justify-between items-center">
						<span className="text-[#5A616A] text-sm mr-4 whitespace-nowrap leading-[16px]">선택한 {selectedData.length}건</span>
						<SelectInput options={statusOption} onChangeHandler={() => console.log("status")} />
					</div>
					<div className="grid grid-cols-2 gap-2 w-full">
						<Button title="등록" className="w-[100%] text-white" onClick={() => setShowInvestModal(true)} />
						<Button title="저장" className="w-[100%] text-white" onClick={saveHandle} />
					</div>
				</div>

				<div className="w-full overflow-x-auto mt-5 md:mt-0">
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

				{applicationList.length > 0 && <Pagination />}
			</div>
		</>
	);
};

export default Home;
