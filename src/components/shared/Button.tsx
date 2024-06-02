type buttonProps = {
	title: string;
	onClick?: () => void;
	className?: string;
};

const Button = ({ title, onClick, className }: buttonProps) => {
	return (
		<button className={`rounded-[10px] p-2 bg-[#2A3958] ${className && className}`} onClick={onClick} type="button">
			{title}
		</button>
	);
};

export default Button;
