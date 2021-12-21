import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import useAppContext from "../ContextApi";
import TodoItem from "./TodoItem";
import { useState } from "react/cjs/react.development";

const Loading = () => {
	return (
		<div className="w-4 h-4  border-2 border-blue-500 border-solid rounded-full border-t-white animate-spin"></div>
	);
};

const TodoList = () => {
	const url = "https://todo-list-crud-api.herokuapp.com/api/todo";
	const token = localStorage.getItem("accessToken");
	const headers = {
		Authorization: `Bearer ${token}`,
	};

	const [load, setLoad] = useState(false);
	const [allTodo, setAllTodo] = useState([]);
	const [names, setNames] = useState("");

	const { username } = useAppContext();
	const history = useHistory();
	if (!token) history.push("/");

	const getAllTodo = async () => {
		try {
			setLoad(true);
			const res = await axios.get(url, { headers });
			setLoad(false);
			setAllTodo(res.data.todo);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const postData = async () => {
			try {
				setLoad(true);
				await axios.post(url, { todoName: names }, { headers });
				await getAllTodo();
				setLoad(false);
			} catch (error) {
				setLoad(false);
				console.log(error);
			}
		};

		postData();
		setNames("");
	};

	useEffect(() => {
		getAllTodo();
	}, []);

	return (
		<>
			{/* Whole TodoList Wrapper */}
			<div className="w-[98%] mt-10 bg-white m-auto rounded-lg flex flex-col items-center sm:w-[550px]">
				<h1 className="text-2xl m-2 font-bold">Todo List</h1>

				{/* Todo input and Button Container */}
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						value={names}
						required
						onChange={(e) => setNames(e.target.value)}
						className="py-1 px-2 w-[70%] rounded m-2 font-medium bg-gray-200 outline-blue-600 outline-8 focus:bg-white sm:w-[350px]"
						placeholder="eg: Hit the gym at 5"
					/>
					<button
						type="submit"
						className={`bg-blue-600 text-gray-200 px-6 py-1 sm:hover:bg-blue-800 sm:hover:text-white  active:bg-blue-500 rounded font-semibold ${
							load && "py-2"
						}`}
					>
						{load ? <Loading /> : "Add"}
					</button>
				</form>

				<div className="w-11/12 overflow-auto h-96 sm:w-10/12">
					{allTodo.map((item) => {
						return (
							<TodoItem
								key={item._id}
								{...item}
								token={token}
								headers={headers}
								url={url}
								allTodo={allTodo}
								setAllTodo={setAllTodo}
							/>
						);
					})}
				</div>

				<button className="w-36 m-4 mt-6 py-1 rounded-md bg-red-500 sm:hover:bg-red-600 sm:hover:text-white sm:active:bg-red-500 font-semibold text-gray-100">
					Clear All
				</button>
			</div>
		</>
	);
};

export default TodoList;
