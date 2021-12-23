import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import TodoItem from "./TodoItem";

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
	const [showMenu, setShowMenu] = useState(false);
	const [edit, setEdit] = useState({ isEdit: false, value: "", id: "" });

	console.log(edit);

	const username = localStorage.getItem("username") || "";

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

		const editData = async () => {
			try {
				setLoad(true);
				await axios.patch(
					url + "/" + edit.id,
					{ todoName: edit.value },
					{ headers }
				);
				await getAllTodo();
				setLoad(false);
			} catch (error) {
				setLoad(false);
				console.log(error);
			}
		};

		if (edit.isEdit) {
			editData();
			setEdit({ ...edit, value: "", isEdit: false });
		} else {
			postData();
			setNames("");
		}
	};

	const handleLogout = () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("username");
		history.push("/");
	};
	useEffect(() => {
		getAllTodo();
	}, []);
	//
	return (
		<>
			{/* Whole TodoList Wrapper */}
			<div className="w-[98%] mt-8 bg-white m-auto rounded-lg flex flex-col items-center sm:w-[550px]">
				<button
					onClick={() => setShowMenu(!showMenu)}
					className="flex pr-3 pl-5 py-1 rounded-full items-center font-bold text-lg capitalize cursor-pointer mt-4 mb-2 transition-all"
				>
					{`${username}'s Todo List`}
					{showMenu ? (
						<svg
							className="w-6 h-6 text-blue-700"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
								clipRule="evenodd"
							/>
						</svg>
					) : (
						<svg
							className="w-6 h-6 text-blue-700"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
								clipRule="evenodd"
							/>
						</svg>
					)}
				</button>
				{showMenu ? (
					<div className="flex gap-6 mb-2 bg-gray-100 px-7 py-2 rounded-full  text-center cursor-pointer transition-all">
						<button className="pt-1 font-medium sm:hover:underline text-red-600 transition-all">
							Delete Account
						</button>
						<button
							onClick={handleLogout}
							className="font-medium sm:hover:underline text-blue-600"
						>
							Log out
						</button>
					</div>
				) : null}

				{/* Todo input and Button Container */}
				<form className="mb-4" onSubmit={handleSubmit}>
					<input
						type="text"
						value={edit.isEdit ? edit.value : names}
						required
						onChange={(e) => {
							if (edit.isEdit) {
								setEdit({ ...edit, value: e.target.value });
							} else {
								setNames(e.target.value);
							}
						}}
						className="py-1 px-2 h-9 w-[70%] rounded  font-medium bg-gray-200 outline-blue-600 outline-8 focus:bg-white sm:w-[350px] mt-2"
						placeholder="eg: Hit the gym at 5"
					/>
					<button
						type="submit"
						className="bg-blue-600 text-gray-200 px-5 sm:px-6 h-9 py-1 sm:hover:bg-blue-800 sm:hover:text-white  active:bg-blue-500 rounded font-semibold mt-2 ml-2 "
					>
						{load ? <Loading /> : edit.isEdit ? "Edit" : "Add"}
					</button>
				</form>

				<div className="w-11/12 overflow-auto max-h-96 sm:w-10/12">
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
								edit={edit}
								setEdit={setEdit}
							/>
						);
					})}
				</div>

				<button className="w-36 m-4 mt-4 py-1 rounded-md bg-red-500 sm:hover:bg-red-600 sm:hover:text-white sm:active:bg-red-500 font-semibold text-gray-100">
					Clear All
				</button>
			</div>
		</>
	);
};

export default TodoList;
