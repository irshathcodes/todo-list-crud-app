import { useEffect } from "react";
import { Email, Name, Password, Button } from "./Login";
import useAppContext from "../ContextApi";

const Register = ({ isRegister }) => {
	const {
		email,
		password,
		name,
		setName,
		setEmail,
		setPassword,
		postLoginData,
		loading,
		loginError,
		setLoginError,
		username,
	} = useAppContext();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await postLoginData("register", email, password, name);
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			setLoginError("");
		}, 4000);
		return () => {
			clearTimeout(timeout);
		};
	}, [loginError]);

	return (
		<>
			<div className={`login-container`}>
				<h1 className="login-form-heading">Register</h1>

				<form className="login-form" onSubmit={handleSubmit}>
					<Name name={name} setName={setName} />
					<Email email={email} setEmail={setEmail} />
					<Password password={password} setPassword={setPassword} />
					<Button btnName="Sign Up" loading={loading} />
					{loginError && (
						<div className="text-red-600 text-sm">{loginError}</div>
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
