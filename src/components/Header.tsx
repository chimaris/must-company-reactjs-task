import { items } from "../constants";
import dot from "../assets/must.svg";

const Header = () => {
	return (
		<>
			<div className="flex items-center gap-6 w-full py-3 border-b border-[#D7D8DA]  ">
				<h1 className="text-[#0B101A] text-2xl font-bold">회원상세</h1>
				<p className="text-[#FF4D4F] relative font-medium text-sm">
					<img src={dot} alt="dot" className="absolute -top-1 -left-3" />
					필수항목
				</p>
			</div>
			<ul className="flex flex-wrap justify-around items-center bg-[#EBEEF3] rounded-lg mt-3">
				{items.map((item, index) => (
					<li key={index} className={`text-base font-medium p-[10px] ${item.isActive ? "text-white bg-[#2A3958]" : "text-[#B1B4BB]"}`}>
						{item.title}
					</li>
				))}
			</ul>
		</>
	);
};

export default Header;
