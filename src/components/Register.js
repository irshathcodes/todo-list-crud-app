import { useState } from "react";
import { Email, Name, Password, Button } from "./Login";

const Register = ({ isRegister }) => {
	const [email, setEmail] = useState("");

	return (
		<>
			<div className="login-container">
				<h1 className="login-form-heading">Register</h1>

				<form className="login-form">
					<Name />
					<Email email={email} setEmail={setEmail} />
					<Password />
					<Button btnName="Sign Up" />
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
