import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AppProvider } from "./ContextApi";
import Auth from "./components/Authentication";
import TodoList from "./components/TodoList";
import { Button } from "./components/Login";

const App = () => {
	return (
		<>
			<BrowserRouter>
				<AppProvider>
					<Routes>
						<Route path="/" element={<Auth />} />
						<Route path="/todolist" element={<TodoList />} />
						<Route
							path="*"
							element={
								<>
									<h1 className="m-4">Route does not exist</h1>
									<Link to="/todolist">
										<Button btnName="Go Back" />
									</Link>
								</>
							}
						/>
					</Routes>
				</AppProvider>
			</BrowserRouter>
		</>
	);
};

export default App;
