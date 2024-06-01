type buttonProps = {
	title: string;
	onClick?: () => void;
	style?: string;
};

const Button = ({ title, onClick, style }: buttonProps) => {
	return (
		<button className={`rounded-[10px] p-2 bg-[#2A3958] text-white ${style && style}`} onClick={onClick} type="button">
			{title}
		</button>
	);
};

export default Button;
