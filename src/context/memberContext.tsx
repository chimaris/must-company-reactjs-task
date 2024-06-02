import { createContext, useContext, useState, ReactNode } from "react";
import { alertModalStateType, IApplicationList } from "../utils/types";

interface MemberContextType {
	showInvestModal: boolean;
	setShowInvestModal: (showInvestModal: boolean) => void;
	alertModalState: alertModalStateType;
	setAlertModalState: (alertModalState: alertModalStateType) => void;
	showRejectionModal: boolean;
	setShowRejectionModal: (showRejectionModal: boolean) => void;
	uploadedFiles: File[];
	setUploadedFiles: (uploadedFiles: File[]) => void;
	selectedData: string[];
	setSelectedData: (selectedData: string[]) => void;
	pages: number[];
	setPages: (pages: number[]) => void;
	currentPage: number;
	setCurrentPage: (currentPage: number) => void;
	applicationList: IApplicationList[];
	setApplicationList: (applications: IApplicationList[]) => void;
	sizePerPage: number;
	setSizePerPage: (sizePerPage: number) => void;
}

const MemberContext = createContext<MemberContextType | undefined>(undefined);

interface MemberProviderProps {
	children: ReactNode;
}

export const MemberProvider = ({ children }: MemberProviderProps) => {
	const [applicationList, setApplicationList] = useState<IApplicationList[]>([]);
	const [showInvestModal, setShowInvestModal] = useState(false);
	const [showRejectionModal, setShowRejectionModal] = useState(false);
	const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
	const [selectedData, setSelectedData] = useState<string[]>([]);
	const [alertModalState, setAlertModalState] = useState<alertModalStateType>({ show: false, text: "" });
	const [pages, setPages] = useState<number[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [sizePerPage, setSizePerPage] = useState<number>(50);

	return (
		<MemberContext.Provider
			value={{
				showInvestModal,
				setShowInvestModal,
				alertModalState,
				setAlertModalState,
				showRejectionModal,
				setShowRejectionModal,
				uploadedFiles,
				setUploadedFiles,
				selectedData,
				setSelectedData,
				pages,
				setPages,
				currentPage,
				setCurrentPage,
				applicationList,
				setApplicationList,
				sizePerPage,
				setSizePerPage,
			}}>
			{children}
		</MemberContext.Provider>
	);
};

export const useMemeber = (): MemberContextType => {
	const context = useContext(MemberContext);
	if (context === undefined) {
		throw new Error("useMember must be used within a MemberProvider");
	}
	return context;
};
