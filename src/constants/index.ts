import { IReasons, selectOptionType } from "../utils/types";

export const items = [
	{ title: "기본정보 관리", isActive: false },
	{ title: "투자유형 관리", isActive: true },
	{ title: "입출금내역 조회", isActive: false },
	{ title: "영업내역 조회", isActive: false },
	{ title: "투자내역 조회", isActive: false },
	{ title: "채권내역 조회", isActive: false },
	{ title: "SMS 관리", isActive: false },
	{ title: "상담내역 관리", isActive: false },
	{ title: "1:1문의내역 조회", isActive: false },
];

export const filterOptions: selectOptionType[] = [
	{
		value: "승인여부 전체",
		title: "승인여부 전체",
	},
	{
		value: "승인대기",
		title: "승인대기",
	},
	{
		value: "승인완료",
		title: "승인완료",
	},
	{
		value: "승인거부",
		title: "승인거부",
	},
];

export const sortOptions: selectOptionType[] = [
	{
		title: "신청일시순",
		value: "신청일시순",
	},
	{
		title: "승인일시순",
		value: "승인일시순",
	},
];

export const limitOptions: { title: string; value: number }[] = [
	{
		title: "50개씩 보기",
		value: 50,
	},
	{
		title: "100개씩 보기",
		value: 100,
	},
	{
		title: "250개씩 보기",
		value: 250,
	},
];

export const statusOption: selectOptionType[] = [
	{
		title: "승인상태 변경",
		value: "",
	},
	{
		title: "신청일시순",
		value: "신청일시순",
	},
	{
		title: "승인일시순",
		value: "승인일시순",
	},
];

export const reasons: IReasons[] = [
	{ id: "서류식별불가", label: "서류 식별 불가" },
	{ id: "필수서류누락", label: "필수 서류 누락" },
	{ id: "서류의내용이등록된회원정보와다름", label: "서류의 내용이 등록된 회원정보와 다름" },
	{ id: "서류에", label: "서류에 누락된 내용이 있음 (필수정보, 회사직인, 본인날인, 본인서명 등)" },
	{ id: "유효기간이", label: "서류의 유효기간이 초과됨" },
	{ id: "직접입력", label: "직접 입력" },
];
