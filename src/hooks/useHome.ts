import { useEffect, useState } from "react";
import { IApplicationList } from "../utils/types";
import data from "../data/data";
import { useMemeber } from "../context/memberContext";

const useHome = () => {
	const [filter, setFilter] = useState("승인여부 전체");
	const [sort, setSort] = useState("");
	const { applicationList, setApplicationList, setPages, setShowRejectionModal, alertModalState, setAlertModalState, selectedData, sizePerPage } =
		useMemeber();

	useEffect(() => {
		let filteredData = data;

		// Apply filter
		if (filter !== "승인여부 전체") {
			filteredData = data.filter((item) => item.승인여부 === filter);
		}

		// Apply sort
		filteredData = filteredData.sort((a, b) => {
			if (sort === "신청일시") {
				return new Date(b.신청일시).getTime() - new Date(a.신청일시).getTime();
			} else if (sort === "승인일시") {
				const dateA = new Date(a.승인일시).getTime();
				const dateB = new Date(b.승인일시).getTime();

				// Handle invalid dates
				if (isNaN(dateA) && isNaN(dateB)) return 0;
				if (isNaN(dateA)) return 1;
				if (isNaN(dateB)) return -1;

				return dateB - dateA;
			}
			return 0;
		});

		// Apply pagination
		let paginatedData = filteredData.slice(0, sizePerPage) as IApplicationList[];

		setApplicationList(paginatedData);

		let temp = [];
		for (let i = 1; i <= Math.ceil(filteredData.length / sizePerPage); i++) temp.push(i);

		setPages(temp);
	}, [sizePerPage, filter, sort]);

	const saveHandle = () => {
		if (!selectedData.length) {
			setAlertModalState({
				...alertModalState,
				text: "선택된 신청건이 없습니다.",
				type: "warn",
				show: true,
			});
			return;
		}

		const allSelectedData = applicationList.filter((item) => selectedData.includes(item.NO.toString()));
		const hasApprovedMembers = allSelectedData.some((item) => item.승인여부 === "승인완료");
		const hasRejectedMembers = allSelectedData.some((item) => item.승인여부 === "승인거부");

		if (hasApprovedMembers) {
			setAlertModalState({
				...alertModalState,
				text: "이미 승인 완료된 회원입니다.",
				type: "warn",
				show: true,
			});
		} else if (hasRejectedMembers) {
			setAlertModalState({
				...alertModalState,
				text: "이미 승인 거부된 회원입니다.",
				type: "warn",
				show: true,
			});
		} else {
			setShowRejectionModal(true);
		}
	};

	return { saveHandle, setFilter, setSort };
};

export default useHome;
