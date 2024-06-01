import Header from "../components/Header";
import Button from "../components/shared/Button";
import SelectInput from "../components/shared/SelectInput";
import { filterOptions, limitOptions, sortOptions, statusOption } from "../constants";

const Home = () => {
	return (
		<div className="w-[80%] mx-auto">
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

			<div className="w-full flex flex-col gap-2 justify-end items-end sm:flex-row sm:justify-between py-3 sm:items-center ">
				<Button title="등록" style="w-[100px]" />

				<div className="flex flex-wrap gap-2 justify-end items-center">
					<p className="text-[#5A616A] text-sm mr-4 whitespace-nowrap leading-[16px] ">선택한 0건</p>
					<SelectInput options={statusOption} onChangeHandler={() => console.log("status")} />
					<Button onClick={() => console.log("save")} title="저장" style="w-[100px]" />
				</div>
			</div>
		</div>
	);
};

export default Home;
