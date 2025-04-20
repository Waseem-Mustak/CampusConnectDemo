export default function PostAction({ icon, text, onClick, disabled = false }) {
	return (
		<button
			className={`flex items-center transition-colors duration-200 ${
				disabled ? 'text-gray-400 hover:text-red-500 cursor-not-allowed' : 'hover:text-black'
			}`}
			onClick={disabled ? undefined : onClick}
			disabled={disabled}
		>
			<span className='mr-1'>{icon}</span>
			<span className='hidden sm:inline'>{text}</span>
		</button>
	);
}
