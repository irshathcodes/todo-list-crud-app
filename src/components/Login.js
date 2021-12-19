import { useEffect } from "react";
import useAppContext from "../ContextApi";

export const Email = (props) => {
	return (
		<div className="flex flex-col">
			<label htmlFor="email" className="login-form-label">
				Email
			</label>
			<input
				type="email"
				required
				className="login-form-input"
				name="email"
				value={props.email}
				onChange={(e) => props.setEmail(e.target.value)}
			/>
		</div>
	);
};

export const Password = (props) => {
	return (
		<div className="flex flex-col">
			<label htmlFor="password" className="login-form-label">
				Password
			</label>
			<input
				type="password"
				required
				minLength="4"
				className="login-form-input"
				name="password"
				value={props.password}
				onChange={(e) => props.setPassword(e.target.value)}
			/>
		</div>
	);
};

export const Name = (props) => {
	return (
		<div className="flex flex-col">
			<label htmlFor="name" className="login-form-label">
				Name
			</label>
			<input
				type="text"
				required
				minLength="5"
				maxLength="50"
				className="login-form-input"
				name="name"
				value={props.name}
				onChange={(e) => props.setName(e.target.value)}
			/>
		</div>
	);
};

export const Button = (props) => {
	return (
		<button
			className={`px-6 py-1 mt-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-all ${
				props.loading ? "cursor-not-allowed" : "cursor-pointer"
			}`}
		>
			{props.loading ? "Loading..." : props.btnName}
		</button>
	);
};

const Login = ({ isRegister }) => {
	const {
		email,
		setEmail,
		password,
		setPassword,
		postLoginData,
		loginError,
		setLoginError,
		loading,
		username,
	} = useAppContext();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await postLoginData("login", email, password);
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
				<h1 className="login-form-heading">Sign in</h1>
				<form className="login-form" onSubmit={handleSubmit}>
					<Email email={email} setEmail={setEmail} />
					<Password password={password} setPassword={setPassword} />
					<Button btnName="Login" loading={loading} />
					{loginError && (
						<div className="text-red-600 text-sm">{loginError}</div>
					)}
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
