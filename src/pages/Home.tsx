import data from "../data/data";
import { Header, Pagination, InvestmentTable, Button, SelectInput, ChangeInvestment, Alert, RefusalForm } from "../components";
import { filterOptions, limitOptions, sortOptions, statusOption } from "../constants";
import { useMemeber } from "../context/memberContext";
import useHome from "../hooks/useHome";

const Home = () => {
	const { saveHandle, setFilter, setSort } = useHome();
	const { applicationList, setShowInvestModal, selectedData, setSizePerPage } = useMemeber();

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
						<span className="text-[#5A616A] font-medium text-sm mr-4 whitespace-nowrap leading-[16px]">선택한 {selectedData.length}건</span>
						<SelectInput options={statusOption} onChangeHandler={() => console.log("status")} />
						<Button onClick={saveHandle} title="저장" className="w-[100px] text-white" />
					</div>
				</div>
				{/* Mobile view */}
				<div className="flex flex-col items-center gap-4 py-3 md:hidden ">
					<div className="flex justify-between items-center">
						<span className="text-[#5A616A] font-medium text-sm mr-4 whitespace-nowrap leading-[16px]">선택한 {selectedData.length}건</span>
						<SelectInput options={statusOption} onChangeHandler={() => console.log(" change status")} />
					</div>
					<div className="grid grid-cols-2 gap-2 w-full">
						<Button title="등록" className="w-[100%] text-white" onClick={() => setShowInvestModal(true)} />
						<Button title="저장" className="w-[100%] text-white" onClick={saveHandle} />
					</div>
				</div>

				<InvestmentTable />

				{applicationList.length > 0 && <Pagination />}
			</div>
		</>
	);
};

export default Home;
