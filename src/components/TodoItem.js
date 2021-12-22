import axios from "axios";

const TodoItem = ({
	allTodo,
	setAllTodo,
	todoName,
	_id,
	completed,
	headers,
	url,
}) => {
	const handleDelete = async () => {
		try {
			setAllTodo(allTodo.filter((item) => item._id !== _id));
			await axios.delete(url + "/" + _id, { headers });
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			{/* Grid Wrapper */}

			<section className="my-8 px-6 py-3 rounded-lg grid grid-cols-[13px_1fr_29px_24px] justify-between items-center bg-gray-200">
				{/* Completed or not checkbox */}
				<input type="checkbox" name="completed" />

				{/* Todos */}
				<p className="text-center">{todoName}</p>

				{/* Edit Icon */}
				<svg
					className="w-6 h-6 text-green-800 sm:hover:text-green-600 cursor-pointer"
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
					className="w-6 h-6 text-red-800 sm:hover:text-red-500 cursor-pointer"
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
