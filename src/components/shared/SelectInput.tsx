import { Fragment, useState } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import { selectOptionType } from "../../utils/types";
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";

type selectInputProps = {
	options: selectOptionType[];
	onChangeHandler?: (e: selectOptionType) => void;
	style?: string;
	outerStyle?: string;
};

const SelectInput = ({ options, onChangeHandler, style = "", outerStyle = "" }: selectInputProps) => {
	const [selected, setSelected] = useState<selectOptionType>(options[0]);

	return (
		<Listbox value={selected} onChange={setSelected}>
			{({ open }) => (
				<div className={`relative w-[150px] ${style} `}>
					<ListboxButton
						className={`w-full flex justify-between items-center py-2.5 cursor-pointer rounded-lg bg-white px-3 text-left border sm:text-sm ${outerStyle} `}>
						<span className="block truncate">{selected.title}</span>
						{open ? <FaAngleUp /> : <FaAngleDown />}
					</ListboxButton>
					<Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
						<ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg">
							{options.map((option, optionIdx) => (
								<ListboxOption
									key={optionIdx}
									className={({ active }) =>
										`relative cursor-default select-none py-2 px-4 ${active ? "!text-white bg-[#2A3958]/50" : "text-[#141F2D]"} ${
											selected.value === option.value ? "!bg-[#2A3958] text-white" : ""
										} `
									}
									value={option}
									onClick={() => {
										onChangeHandler?.(option);
									}}>
									{({ selected }) => (
										<>
											<span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{option.title}</span>
										</>
									)}
								</ListboxOption>
							))}
						</ListboxOptions>
					</Transition>
				</div>
			)}
		</Listbox>
	);
};

export default SelectInput;
