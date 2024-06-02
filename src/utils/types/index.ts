export type selectOptionType = { title: string; value: string | number };

export interface IApplicationList {
	NO: number;
	기존유형: string;
	신청유형: string;
	제출서류: string;
	신청일시: string;
	승인여부: string;
	"승인거부 사유": string;
	승인일시: string;
	관리자: string;
}

export type alertModalStateType = {
	show: boolean;
	text: string;
	type?: "warn" | "success";
	isCancellable?: boolean;
	cancelAction?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
	approveAction?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
};

export interface IReasons {
	id: string;
	label: string;
}
