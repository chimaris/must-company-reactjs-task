import { Fragment, useState } from "react";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useMemeber } from "../../context/memberContext";
import Button from "../shared/Button";
import dot from "../../assets/must.svg";
import { reasons } from "../../constants";

const RefusalForm = () => {
	const [checkedValue, setCheckedValue] = useState<string[]>([]);
	const [reasonText, setReasonText] = useState<string>("");
	const { setAlertModalState, selectedData, setSelectedData, setShowRejectionModal, showRejectionModal } = useMemeber();

	const closeModal = () => {
		setShowRejectionModal(false);
	};

	const handleCheckboxChange = (value: string) => {
		setCheckedValue((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
	};

	const handleSubmit = () => {
		if ((checkedValue.includes("직접입력") && reasonText) || checkedValue.length) {
			setAlertModalState({
				text: `선택된 ${selectedData.length}명의 승인상태를 변경하시겠습니까?`,
				isCancellable: true,
				cancelAction: () => {
					setSelectedData([]);
					setAlertModalState({ show: false, text: "" });
					setShowRejectionModal(false);
				},
				approveAction: () => {
					setSelectedData([]);
					setShowRejectionModal(false);
					setTimeout(() => {
						setAlertModalState({
							type: "success",
							text: "저장되었습니다.",
							show: true,
						});
					}, 300);
				},
				show: true,
			});
		} else {
			setAlertModalState({
				text: "필수입력항목을 입력해주세요.",
				show: true,
			});
		}
	};

	return (
		<Transition appear show={showRejectionModal} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={() => {}}>
				<TransitionChild
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0">
					<div className="fixed inset-0 bg-black bg-opacity-25" />
				</TransitionChild>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center text-center">
						<TransitionChild
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95">
							<DialogPanel
								className="w-[800px] flex flex-col justify-start items-start transform rounded-xl bg-white text-left align-middle shadow-xl transition-all"
								style={{
									boxShadow: "0px 8px 8px -4px #1018280A, 0px 20px 24px -4px #1018281A",
								}}>
								<div className="w-full flex justify-between items-center p-6 pb-5 ">
									<h4 className="">승인거부 사유 입력</h4>

									<FaXmark onClick={closeModal} className="text-2xl cursor-pointer" />
								</div>
								<div className="px-2 md:px-6 py-5 w-full border-y border-[#D7D8DA] ">
									<div className="w-full border border-[#D7D8DA] mb-3 flex flex-col justify-start items-start ">
										<div className="w-full flex flex-row justify-start items-start text-[#0B101A] ">
											<p className="w-[21.27%] text-sm md:text-base leading-none font-medium py-4 px-2 md:px-4 bg-[#EEF0F4] border-b border-b-white ">
												회원번호
											</p>
											<p className="text-xs md:text-sm leading-4 w-[78.72%] flex flex-row flex-wrap py-4 px-5 bg-white border-b border-b-[#D7D8DA] ">
												abc111, abc111, abc111, abc111, abc111
											</p>
										</div>{" "}
										<div className="w-full flex flex-row justify-start items-start text-[#0B101A] ">
											<p className="w-[21.27%] text-base leading-none font-medium py-4 px-2 md:px-4 bg-[#EEF0F4] border-b border-b-white ">
												회원명/법인명
											</p>
											<p className="text-sm leading-4 w-[78.72%] flex flex-row flex-wrap py-4 px-5 bg-white border-b border-b-[#D7D8DA] ">
												김길동, ㈜가나다라투자
											</p>
										</div>
										<div className="w-full flex flex-row justify-start relative items-start text-[#0B101A] ">
											<div className="w-[21.27%] flex items-center absolute h-full inset-y-0 justify-left text-base leading-none font-medium py-4 px-2 md:px-4 bg-[#EEF0F4] ">
												<p>승인거부 사유</p>
												<img src={dot} alt="dot" className="-mt-8 md:-mt-4 md:ml-1" />
											</div>
											<div className="w-[78.72%] ml-auto gap-2 flex flex-col justify-start items-start flex-wrap px-5 py-4 bg-white">
												{reasons.map(({ id, label }) => (
													<label key={id} htmlFor={id} className="flex items-center gap-2">
														<input
															type="checkbox"
															id={id}
															value={id}
															checked={checkedValue.includes(id)}
															onChange={() => handleCheckboxChange(id)}
															className="opacity-0 absolute w-0 h-0 peer"
														/>
														<span className="min-w-5 min-h-5 flex mx-auto rounded-md bg-white text-white shadow border border-[#D7D8DA] peer-checked:border-[#2A3958] peer-checked:bg-[#2A3958]">
															<FaCheck className="m-auto text-[10px]" />
														</span>
														<p className="text-xs md:text-sm text-[#0B101A]">{label}</p>
													</label>
												))}
												<textarea
													rows={6}
													value={reasonText}
													onChange={(e) => setReasonText(e.target.value)}
													className="resize-none w-full p-3 rounded-lg border border-[#D7D8DA] disabled:bg-[#DDE0E5] disabled:text-[#B1B4BB] "
													disabled={!checkedValue.includes("직접입력")}
													placeholder="사유 입력"></textarea>
											</div>
										</div>
									</div>
								</div>
								<div className="flex w-full py-6 justify-center gap-3 ">
									<Button title="확인" onClick={handleSubmit} className="w-[160px] text-white" />
									<Button title="취소" onClick={closeModal} className="bg-transparent border border-[#2A3958] text-[#2A3958] w-[160px]" />
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
			ß
		</Transition>
	);
};

export default RefusalForm;
