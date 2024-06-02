import { Fragment } from "react";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { useMemeber } from "../../context/memberContext";
import Button from "../shared/Button";
import { FaExclamation, FaXmark } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";

const Alert = () => {
	const { alertModalState, setAlertModalState } = useMemeber();
	const { show, text, type, isCancellable, cancelAction, approveAction } = alertModalState;

	const closeModal = () => {
		setAlertModalState({ ...alertModalState, show: false });
	};
	return (
		<Transition appear show={show} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={closeModal}>
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
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<TransitionChild
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95">
							<DialogPanel className="w-[415px] flex flex-col justify-start items-start transform overflow-hidden rounded-xl shadow-[#1018281A]/10 bg-white p-6 text-left align-middle shadow-xl transition-all">
								<div className="w-full flex justify-between items-center ">
									<div
										className={`w-[30px] h-[30px] flex justify-center items-center rounded-full border-4 ${
											type === "success" ? "bg-[#D1FADF] text-[#039855] border-[#D1FADF]/50 " : "bg-[#FEF0C7] text-[#D46B08] border-[#FEF0C7]/50 "
										} `}>
										{type === "success" ? <FaRegCheckCircle /> : <FaExclamation />}
									</div>

									<FaXmark onClick={closeModal} className="text-2xl" />
								</div>
								<div className="w-full flex flex-col gap-8 mt-4 ">
									<p className="text-lg font-semibold text-[#101828] ">{text}</p>
									<div className="flex justify-center gap-3 ">
										<Button
											title="확인"
											onClick={() => {
												approveAction?.();
												closeModal();
											}}
										/>
										{isCancellable ? (
											<Button
												style="bg-[#F7F8FA] text-[#101828] border-[#D1D5DB] hover:bg-[#F0F1F3] hover:border-[#C4C9D2] hover:text-[#101828] "
												title="취소"
												onClick={() => {
													cancelAction?.();
												}}
											/>
										) : (
											""
										)}
									</div>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default Alert;
