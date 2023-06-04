import "./App.css";
import AppRoutes from "./Routes/AppRoutes";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { MultiProvider } from "./Hooks/MultiProvider";

if (process.env.REACT_APP_NODE_ENV === "production") {
	disableReactDevTools();
}

function App() {
	return (
		<MultiProvider>
			<AppRoutes />
		</MultiProvider>
	);
}

export default App;



