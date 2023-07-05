const Button = ({ text, submit, logout, handleLogout }) => {
  return (
    <button
      type={submit ? "submit" : ""}
      onClick={handleLogout ? handleLogout : null}
      className={`text-white py-3 rounded duration-300 font-semibold px-5 ${
        logout
          ? "bg-rose-500 hover:bg-rose-600 "
          : "bg-violet-500 hover:bg-violet-600 mt-4" 
      }`}
    >
      {text}
    </button>
  );
};

export default Button;
