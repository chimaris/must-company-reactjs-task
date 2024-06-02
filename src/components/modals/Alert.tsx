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
					<div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
						<TransitionChild
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95">
							<DialogPanel
								className="w-full max-w-[400px] sm:max-w-[400px] flex flex-col justify-start items-start transform rounded-xl bg-white p-4 md:p-4.9 text-left align-middle shadow-xl transition-all"
								style={{
									boxShadow: "0px 8px 8px -4px #1018280A, 0px 20px 24px -4px #1018281A",
								}}>
								<div className="w-full flex justify-between items-center mb-4">
									<div
										className={`w-[30px] h-[30px] flex justify-center items-center rounded-full border-4 ${
											type === "success" ? "bg-[#D1FADF] text-[#039855] border-[#ECFDF3] " : "bg-[#FEF0C7] text-[#D46B08] border-[#FFFAEB] "
										} `}>
										{type === "success" ? <FaRegCheckCircle /> : <FaExclamation />}
									</div>
									<FaXmark onClick={closeModal} className="text-2xl cursor-pointer" />
								</div>
								<div className="w-full flex flex-col gap-4 sm:gap-8 mt-2">
									<p className="text-base sm:text-lg font-semibold text-[#101828]">{text}</p>
									<div className="flex justify-center gap-3">
										<Button
											title="확인"
											onClick={() => {
												approveAction?.();
												closeModal();
											}}
											className="w-[160px] text-white"
										/>
										{isCancellable ? (
											<Button
												className="bg-transparent border border-[#2A3958] text-[#2A3958] w-[160px]"
												title="취소"
												onClick={() => {
													cancelAction?.();
												}}
											/>
										) : null}
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
