import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
	// State for Login & Register Form
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");

	const [loading, setLoading] = useState(false);
	const [loginError, setLoginError] = useState("");

	const [allTodo, setAllTodo] = useState([]);

	const history = useHistory();

	const postLoginData = async (url, email, password, name) => {
		try {
			setLoading(true);
			const res = await axios.post(
				`https://todo-list-crud-api.herokuapp.com/api/auth/${url}`,
				{ email, password, name: name || "" }
			);
			const { token, name: loginUserName } = res.data;
			localStorage.setItem("accessToken", token);
			localStorage.setItem("username", loginUserName);
			setName("");
			setEmail("");
			setPassword("");
			setLoading(false);
			history.push("/todolist");
		} catch (error) {
			localStorage.removeItem("accessToken");
			localStorage.removeItem("username");
			if (error.response.data) {
				setLoginError(error.response.data.msg);
			}
			setLoading(false);
			console.log(error);
		}
	};

	return (
		<AppContext.Provider
			value={{
				email,
				password,
				name,
				loading,
				setLoading,
				setName,
				setEmail,
				setPassword,
				loginError,
				setLoginError,
				postLoginData,
				allTodo,
				setAllTodo,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

const useAppContext = () => {
	return useContext(AppContext);
};

export default useAppContext;
