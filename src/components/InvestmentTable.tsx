import { FaCheck } from "react-icons/fa6";
import { useMemeber } from "../context/memberContext";

const InvestmentTable = () => {
	const { applicationList, selectedData, setSelectedData } = useMemeber();

	return (
		<div className="w-full mt-5 md:mt-0 overflow-x-scroll">
			<table className="border-collapse table-fixed">
				<thead>
					<tr className="h-15 text-[#222] text-base font-semibold">
						<th className="text-base font-semibold p-2.5 bg-gray-200 border-r border-white min-w-[30px]">
							<label htmlFor="checkAll" className="relative group">
								<input
									type="checkbox"
									name="checkAll"
									checked={selectedData.length === applicationList.length}
									onChange={(e) => {
										if (e.target.checked) {
											setSelectedData(applicationList.map((item) => item.NO.toString()));
										} else {
											setSelectedData([]);
										}
									}}
									className="opacity-0 -z-10 absolute w-0 h-0 peer"
									id="checkAll"
								/>
								<span className="w-4 h-4 flex mx-auto rounded bg-white text-white shadow border border-[#D7D8DA] peer-checked:border-[#2A3958] peer-checked:bg-[#2A3958]">
									<FaCheck className="m-auto text-[10px]" />
								</span>
							</label>
						</th>

						<th className="p-2.5 bg-gray-200 border-r border-white min-w-[50px]">NO</th>
						<th className="p-2.5 bg-gray-200 border-r border-white min-w-[100px]">기존유형</th>
						<th className="p-2.5 bg-gray-200 border-r border-white min-w-[100px]">신청유형</th>
						<th className="p-2.5 bg-gray-200 border-r border-white min-w-[100px]">제출서류</th>
						<th className="p-2.5 bg-gray-200 border-r border-white min-w-[180px]">신청일시</th>
						<th className="p-2.5 bg-gray-200 border-r border-white min-w-[100px]">승인여부</th>
						<th className="p-2.5 bg-gray-200 border-r border-white min-w-[400px]">승인거부 사유</th>
						<th className="p-2.5 bg-gray-200 border-r border-white min-w-[180px]">승인일시</th>
						<th className="p-2.5 bg-gray-200 border-r border-white min-w-[100px]">관리자</th>
					</tr>
				</thead>
				<tbody>
					{applicationList.length > 0 ? (
						applicationList.map((application) => (
							<tr key={application.NO} className="h-11 even:bg-gray-100 text-center text-sm font-medium text-[#222] p-2.5">
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
												? "text-[#9A3412] bg-[#FFEDD5]"
												: application.승인여부 === "승인거부"
												? "text-[#991B1B] bg-[#FEE2E2]"
												: "text-[#166534] bg-[#DCFCE7]"
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
							<td colSpan={10} className="text-center font-medium text-lg align-middle text-[#A1A1A1] p-2.5">
								조회 결과가 없습니다.
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default InvestmentTable;
