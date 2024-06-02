import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { Fragment, useRef } from "react";
import SelectInput from "../shared/SelectInput";
import { useMemeber } from "../../context/memberContext";
import { FaXmark } from "react-icons/fa6";
import Button from "../shared/Button";
import dot from "../../assets/must.svg";

const FILE_SIZE_LIMIT = 10000000; // 10MB
const MAX_FILE_COUNT = 10;
const VALID_FILE_TYPES = ["image/jpeg", "image/jpg", "image/gif", "image/png", "application/pdf"];

const ChangeInvestment = () => {
	const fileRef = useRef<HTMLInputElement>(null);
	const { showInvestModal, setShowInvestModal, uploadedFiles, setUploadedFiles, setAlertModalState } = useMemeber();

	const closeModal = () => {
		setShowInvestModal(false);
	};

	const uploadFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const fileArray = e.target.files ? Object.values(e.target.files) : [];
		const largeFile = fileArray.find((file) => file.size > FILE_SIZE_LIMIT);
		const invalidFormat = fileArray.find((file) => !VALID_FILE_TYPES.includes(file.type));

		if (invalidFormat) {
			setAlertModalState({
				show: true,
				text: "jpg, jpeg, gif, png, pdf 파일만 등록 가능합니다.",
			});
			return;
		}
		if (largeFile) {
			setAlertModalState({
				show: true,
				text: "최대 100MB까지 등록 가능합니다.",
			});
			return;
		}
		if (uploadedFiles.length >= MAX_FILE_COUNT) {
			setAlertModalState({
				show: true,
				text: "최대 10개까지 등록 가능합니다.",
			});
			return;
		}

		const newFiles = [...uploadedFiles, ...fileArray.slice(0, MAX_FILE_COUNT - uploadedFiles.length)];
		setUploadedFiles(newFiles);

		// Reset the file input value to allow re-uploading the same file
		if (e.target) {
			e.target.value = "";
		}
	};

	const removeFile = (index: number) => {
		const newFiles = [...uploadedFiles];
		newFiles.splice(index, 1);
		setUploadedFiles(newFiles);
	};

	return (
		<Transition appear show={showInvestModal} as={Fragment}>
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
								className="w-full max-w-4xl flex flex-col justify-start items-start transform rounded-xl bg-white text-left align-middle shadow-xl transition-all"
								style={{
									boxShadow: "0px 8px 8px -4px #1018280A, 0px 20px 24px -4px #1018281A",
								}}>
								<div className="w-full flex justify-between items-center p-6 pb-5">
									<h4 className="">투자유형 변경</h4>
									<FaXmark onClick={closeModal} className="text-2xl cursor-pointer font-thin" />
								</div>
								<div className="py-5 px-4 md:px-6 w-full border-y border-[#D7D8DA]">
									<div className="w-full border border-[#D7D8DA] mb-3 grid grid-cols-12">
										<div className="col-span-3 text-base leading-none font-medium py-4 px-2 md:px-4 bg-[#EEF0F4] border-b border-b-white">
											회원번호
										</div>
										<div className="col-span-9 text-sm leading-4 py-4 px-2 md:px-5 bg-white border-b border-b-[#D7D8DA]">
											abc111, abc111, abc111, abc111, abc111
										</div>
										<div className="col-span-3 text-base leading-none font-medium py-4 px-2 md:px-4 bg-[#EEF0F4] border-b border-b-white">
											회원명/법인명
										</div>
										<div className="col-span-9 text-sm leading-4 py-4 px-2 md:px-5 bg-white border-b border-b-[#D7D8DA]">김길동</div>
										<div className="col-span-3 flex items-center text-base leading-none font-medium py-4 px-2 md:px-4 bg-[#EEF0F4]">
											<p className="">투자유형</p>
											<img src={dot} alt="dot" className="-mt-8 md:-mt-4 md:ml-1" />
										</div>
										<div className="col-span-9 px-2 py-1.5 bg-white">
											<SelectInput
												style="!w-[47.64%]"
												outerStyle="!py-[7px]"
												options={[
													{ title: "일반개인", value: "일반개인" },
													{ title: "소득적격", value: "소득적격" },
													{ title: "개인전문", value: "개인전문" },
													{ title: "법인", value: "법인" },
													{ title: "여신금융", value: "여신금융" },
													{ title: "P2P온투", value: "P2P온투" },
												]}
											/>
										</div>
										<div className="col-span-3 flex items-center text-base leading-none font-medium py-4 px-2 md:px-4 bg-[#EEF0F4]">
											<p className="">서류첨부</p>
											<img src={dot} alt="dot" className="-mt-8 md:-mt-4 md:ml-1" />
										</div>
										<div className="col-span-9 flex flex-wrap px-2 py-1 bg-white">
											<button
												onClick={() => fileRef.current?.click()}
												className="md:py-2.5 px-3 text-sm relative bg-[#EBEEF3] border border-[#D7D8DA] rounded-lg mr-2">
												파일 선택
											</button>
											{uploadedFiles?.map((file, id) => (
												<div className="flex gap-1 items-center" key={file?.name + id}>
													<p className="text-[#5A616A] text-sm">{file?.name}</p>
													<button onClick={() => removeFile(id)}>
														<FaXmark className="text-[#fff] text-sm p-1 rounded-full bg-[#DDE0E5] mr-2" />
													</button>
												</div>
											))}
											<input
												ref={fileRef}
												type="file"
												name="image-uploader"
												id="image-uploader"
												multiple
												className="opacity-0 w-0 h-0"
												onChange={(e) => uploadFileChange(e)}
											/>
										</div>
									</div>

									<ul className="list-disc list-inside text-[#0B101A] text-[13px]">
										<li>파일 형식은 jpg, jpeg, gif, png, pdf만 가능합니다.</li>
										<li>최대 10개, 100MB까지 등록이 가능합니다.</li>
									</ul>
								</div>
								<div className="flex w-full py-6 justify-center gap-3">
									<Button title="확인" onClick={closeModal} className="w-[160px] text-white" />
									<Button className="bg-transparent border border-[#2A3958] text-[#2A3958] w-[160px]" title="취소" onClick={closeModal} />
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default ChangeInvestment;
