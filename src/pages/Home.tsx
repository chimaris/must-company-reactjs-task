import Header from "../components/Header";
import SelectInput from "../components/shared/SelectInput";
import { filterOptions, limitOptions, sortOptions } from "../constants";

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
		</div>
	);
};

export default Home;
