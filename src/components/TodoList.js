import { Navigate } from "react-router-dom";

const TodoList = () => {
	const token = localStorage.getItem("accessToken");

	if (!token) {
		return <Navigate to="/" />;
	}

	return (
		<>
			<h1>Todo List</h1>
		</>
	);
};

export default TodoList;
