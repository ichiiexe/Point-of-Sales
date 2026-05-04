type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
};

const Button = ({ children, onClick, active = false }: Props) => {
  return (
    <button
      className={`px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-2 ${
        active
          ? "bg-[#ef4444] text-white"
          : "bg-gray-700 text-white hover:bg-gray-600"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
