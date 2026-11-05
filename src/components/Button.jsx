const variants = {
  outline:
    "text-blue-600 bg-white border border-blue-600 hover:bg-blue-600 hover:text-white focus:ring-4 focus:ring-blue-200 font-medium leading-5 rounded-lg text-xs px-3 py-1.5 focus:outline-none",
  active:
    "text-white bg-blue-600 border border-blue-600 font-medium leading-5 rounded-lg text-xs px-3 py-1.5 focus:outline-none",
  solid:
    "text-white bg-blue-600 hover:bg-blue-700 border border-transparent focus:ring-4 focus:ring-blue-300 shadow-xs font-medium rounded-lg text-base px-6 py-3.5 focus:outline-none",
  danger:
    "text-red-600 bg-white border border-red-500 hover:bg-red-600 hover:text-white focus:ring-4 focus:ring-red-200 font-medium leading-5 rounded-lg text-xs px-3 py-1.5 focus:outline-none",
};

function Button({ variant = "outline", type = "button", children, ...props }) {
  return (
    <button type={type} className={variants[variant]} {...props}>
      {children}
    </button>
  );
}

export default Button;