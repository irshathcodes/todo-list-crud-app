import axios from "axios";

const TodoItem = ({
	allTodo,
	setAllTodo,
	todoName,
	_id,
	completed,
	headers,
	url,
	edit,
	setEdit,
}) => {
	const handleIsCompleted = async () => {
		const specificTodoId = allTodo.findIndex((item) => item._id === _id); //Finding Index of specific Todo.
		const specificTodo = allTodo.find((item) => item._id === _id).completed; // Finding the value of that todo
		const isCompleted = !specificTodo; // toggle when click
		const allData = [...allTodo];
		allData[specificTodoId].completed = isCompleted;
		setAllTodo(allData);
		try {
			await axios.patch(
				url + "/" + _id,
				{ completed: isCompleted },
				{ headers }
			);
		} catch (error) {
			console.log(error);
		}
	};
	const handleDelete = async () => {
		try {
			setAllTodo(allTodo.filter((item) => item._id !== _id));
			await axios.delete(url + "/" + _id, { headers });
		} catch (error) {
			console.log(error);
		}
	};

	const handleEdit = () => {
		const editingItem = allTodo.find((item) => item._id === _id);
		setEdit({
			...edit,
			isEdit: !edit.IsEdit,
			value: editingItem.todoName,
			id: editingItem._id,
		});
		setAllTodo(allTodo.filter((item) => item._id !== _id));
	};

	return (
		<>
			{/* Grid Wrapper */}
			<section className="my-5 mr-2 mt-4 p-3 rounded-lg grid grid-cols-[24px_1fr_29px_24px] justify-between items-center bg-gray-200">
				{/* Completed Icon */}
				<svg
					className={`w-6 h-6  cursor-pointer ${
						completed ? "text-blue-800" : "text-gray-400"
					}`}
					onClick={handleIsCompleted}
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
						clipRule="evenodd"
					/>
				</svg>

				{/* Todos */}
				<p
					className={`mx-2 max-w-[318px] text-center ${
						completed ? "line-through" : ""
					}`}
				>
					{todoName}
				</p>

				{/* Edit Icon */}
				<svg
					className="w-5 h-5  text-green-800 sm:hover:text-green-600 cursor-pointer"
					onClick={handleEdit}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
					/>
				</svg>

				{/* Delete Icon */}
				<svg
					className="w-5 h-5 text-red-800 sm:hover:text-red-500 cursor-pointer"
					onClick={handleDelete}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
					/>
				</svg>
			</section>
		</>
	);
};

export default TodoItem;
