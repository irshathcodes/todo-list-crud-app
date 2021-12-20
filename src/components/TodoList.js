import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import useAppContext from "../ContextApi";
import TodoItem from "./TodoItem";

const todoData = [
	{
		id: 1,
		todo: "do work",
	},
	{
		id: 2,
		todo: "play games",
	},
	{
		id: 3,
		todo: "do the assignment",
	},
];

const jwtToken = localStorage.getItem("accessToken");

const client = axios.create({
	url: "https://todo-list-crud-api.herokuapp.com/api",
	headers: {
		Authorization: `Bearer ${jwtToken}`,
	},
});

const TodoList = () => {
	const { username } = useAppContext();
	const token = localStorage.getItem("accessToken");
	const history = useHistory();
	if (!token) history.push("/");

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	useEffect(() => {
		const getAllTodo = async () => {
			try {
				const response = await client.get("/todo");
				console.log(response);
			} catch (error) {
				console.log(error);
			}
		};
		getAllTodo();
	}, []);

	return (
		<>
			{/* Whole TodoList Wrapper */}
			<div className="w-[98%] mt-12 bg-white m-auto rounded-lg flex flex-col items-center sm:w-[550px]">
				<h1 className="text-2xl m-2 font-bold">Todo List</h1>

				{/* Todo input and Button Container */}
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						className="py-1 px-2 w-[70%] rounded m-2 font-medium bg-gray-200 outline-blue-600 outline-8 focus:bg-white sm:w-[350px]"
						placeholder="eg: Hit the gym at 5"
					/>
					<button className="bg-blue-600 text-gray-200 px-6 py-1 sm:hover:bg-blue-800 sm:hover:text-white  active:bg-blue-500 rounded font-semibold">
						Add
					</button>
				</form>

				{/* Todo Item Container */}
				<div className="w-11/12 sm:w-10/12">
					{todoData.map((item) => {
						return <TodoItem key={item.id} {...item} />;
					})}
				</div>
				<button className="w-36 m-4  py-1 rounded-md bg-red-500 sm:hover:bg-red-600 sm:hover:text-white sm:active:bg-red-500 font-semibold text-gray-100">
					Clear All
				</button>
			</div>
		</>
	);
};

export default TodoList;
