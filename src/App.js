import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { AppProvider } from "./ContextApi";
import Login from "./components/Login";
import TodoList from "./components/TodoList";
import { Button } from "./components/Login";

const token = localStorage.getItem("accessToken");

const App = () => {
	return (
		<>
			<BrowserRouter>
				<AppProvider>
					<Switch>
						<Route path="/login" exact>
							{/* {token ? <TodoList /> : <Login />} */}
							<Login />
						</Route>
						<Route path="/todolist" exact>
							<TodoList />
						</Route>
						<Route path="*">
							<>
								<h1 className="m-4">Route does not exist</h1>
								<Link to="/todolist">
									<Button btnName="Go Back" />
								</Link>
							</>
						</Route>
					</Switch>
				</AppProvider>
			</BrowserRouter>
		</>
	);
};

export default App;
