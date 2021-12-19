import { useState, useEffect } from "react";
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

const Login = () => {
	const [isRegister, setIsRegister] = useState(false);

	const {
		name,
		setName,
		email,
		setEmail,
		password,
		setPassword,
		postLoginData,
		loginError,
		setLoginError,
		loading,
	} = useAppContext();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await postLoginData(
			`${isRegister ? "register" : "login"}`, // Post Request Login/Register Based on isRegister State Value.
			email,
			password,
			name
		);
	};

	// Displaying Errors For 4 seconds
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
			{/* Login / Register Wrapper*/}
			<div className="w-[340px] my-0 mx-auto mt-12 bg-white h-fit rounded-lg sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-2/4 sm:-translate-y-1/2 sm:w-96 sm:mt-0">
				{/* Form Heading */}
				<h1 className="text-2xl text-center pt-3 font-bold">
					{isRegister ? "Register" : "Login"}
				</h1>
				{/* Form Container */}
				<form
					className="flex flex-col justify-center items-center gap-8 mt-8"
					onSubmit={handleSubmit}
				>
					{/* Labels & Input Fields */}
					{isRegister && <Name name={name} setName={setName} />}

					<Email email={email} setEmail={setEmail} />

					<Password password={password} setPassword={setPassword} />

					{/* Form Submit Button */}
					<Button
						btnName={`${isRegister ? "Sign Up" : "Login"}`}
						loading={loading}
					/>

					{/* Displaying Errors */}
					{loginError && (
						<div className="text-red-600 text-sm">{loginError}</div>
					)}
				</form>

				{/* Button for Toggling Login or Register Form  */}
				<div
					className="block  mt-8 sm:mt-12 text-center text-blue-700 cursor-pointer pb-2"
					onClick={() => setIsRegister(!isRegister)}
				>
					{isRegister ? "Already have a account? Login" : "Sign Up / Register"}
				</div>
			</div>
		</>
	);
};

export default Login;
