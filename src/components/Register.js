import { useEffect } from "react";
import { Email, Name, Password, Button } from "./Login";
import useAppContext from "../ContextApi";
import postLoginData from "../requests/postLoginData";
import { useNavigate } from "react-router-dom";

const Register = ({ isRegister }) => {
	const {
		email,
		password,
		name,
		setEmail,
		setPassword,
		setName,
		errorMessage,
		setErrorMessage,
		loggingIn,
		username,
		loading,
		setLoading,
	} = useAppContext();

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { data, errorMsg } = await postLoginData(
			"register",
			email,
			password,
			name
		);
		loggingIn(data, errorMsg);
		if (!username) {
			return navigate("/");
		}
		return navigate("/todolist");
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			setErrorMessage({ ...errorMessage, isErr: false });
		}, 3000);
		return () => {
			clearTimeout(timeout);
		};
	}, [errorMessage.isErr]);

	return (
		<>
			<div className={`login-container`}>
				<h1 className="login-form-heading">Register</h1>

				<form className="login-form" onSubmit={handleSubmit}>
					<Name name={name} setName={setName} />
					<Email email={email} setEmail={setEmail} />
					<Password password={password} setPassword={setPassword} />
					<Button btnName="Sign Up" />
					{errorMessage.isErr && (
						<div className="text-red-600 text-sm">{errorMessage.msg}</div>
					)}
				</form>
				<div
					className="block mt-8 pb-2 text-center text-blue-700 cursor-pointer"
					onClick={() => isRegister(false)}
				>
					Already have a account? Login
				</div>
			</div>
		</>
	);
};

export default Register;
