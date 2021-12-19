import { useHistory } from "react-router-dom";
import useAppContext from "../ContextApi";

const TodoList = () => {
	const { username } = useAppContext();
	const token = localStorage.getItem("accessToken");
	const history = useHistory();
	if (!token) history.push("/");
	return (
		<>
			<h1>Todo List</h1>
		</>
	);
};

export default TodoList;
