export function IconButton({ children, onClick, size, ...restProps }) {
  return (
    <button onClick={onClick} {...restProps}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className={`text-blue-600 text-base ${size === "lg" ? "h-8" : "h-6"}`}
      >
        {children}
      </svg>
    </button>
  );
}
