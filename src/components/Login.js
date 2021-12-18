import { useState } from "react";

export const Email = (props) => {
	return (
		<div className="flex flex-col">
			<label htmlFor="email" className="login-form-label">
				Email
			</label>
			<input
				type="email"
				className="login-form-input"
				name="email"
				value={props.email}
				onChange={(e) => props.setEmail(e.target.value)}
			/>
		</div>
	);
};

export const Password = () => {
	return (
		<div className="flex flex-col">
			<label htmlFor="password" className="login-form-label">
				Password
			</label>
			<input type="password" className="login-form-input" name="password" />
		</div>
	);
};

export const Name = () => {
	return (
		<div className="flex flex-col">
			<label htmlFor="name" className="login-form-label">
				Name
			</label>
			<input type="text" className="login-form-input" name="name" />
		</div>
	);
};

export const Button = (props) => {
	return (
		<button className="px-6 py-1 mt-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-all">
			{props.btnName}
		</button>
	);
};

const Login = ({ isRegister }) => {
	const [email, setEmail] = useState("");
	return (
		<>
			<div className="login-container">
				<h1 className="login-form-heading">Sign in</h1>
				<form className="login-form">
					<Email email={email} setEmail={setEmail} />
					<Password />
					<Button btnName="Login" />
				</form>
				<div
					className="block  mt-8 sm:mt-12 text-center text-blue-700 cursor-pointer pb-2"
					onClick={() => isRegister(true)}
				>
					Register / Sign Up
				</div>
			</div>
		</>
	);
};

export default Login;
