import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import TodoList from "./components/TodoList";
import { Button } from "./components/Login";

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Switch>
					<Route path="/" exact>
						<Login />
					</Route>
					<Route path="/todolist" exact>
						<TodoList />
					</Route>
					<Route path="*">
						<>
							<h1 className="m-4">Route does not exist</h1>
							<Link to="/login">
								<Button btnName="Go Back" />
							</Link>
						</>
					</Route>
				</Switch>
			</BrowserRouter>
		</>
	);
};

export default App;
