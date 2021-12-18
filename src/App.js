import { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import TodoList from "./components/TodoList";

const App = () => {
	const [isRegister, setIsRegister] = useState(false);

	return (
		<>
			{!isRegister ? (
				<Login isRegister={setIsRegister} />
			) : (
				<Register isRegister={setIsRegister} />
			)}
			{/* <TodoList /> */}
		</>
	);
};

export default App;
