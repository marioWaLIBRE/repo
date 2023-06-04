import { BrowserRouter, Route, Routes } from "react-router-dom";
import CodeQR from "../Components/CodeQR/CodeQR";
import Error403 from "../Views/Error404/Error403";
import Error404 from "../Views/Error404/Error404";
import FrequentQuestion from "../Views/FrequentQuestions/FrequentQuestion";
import Home from "../Views/Home/Home";
import Packages from "../Views/Packages/Packages";
import Password from "../Views/Profile/Password/Password";
import ProfileEdi from "../Views/Profile/ProfileEditor/ProfileEdi";
import Profile from "../Views/Profile/ProfileView/Profile";
import Profits from "../Views/Profits/Profits";
import Register from "../Views/Register/Register";
import Support from "../Views/Support/Support";
import Tutorials from "../Views/Tutorials/Tutorials";
import { PrivateRouter } from "./PrivateRouter";
import { PublicRouter } from "./PublicRouter";

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/" element={<PublicRouter component={Home} />} />
				<Route
					exact
					path="/register"
					element={<PublicRouter component={Register} />}
				/>
				<Route exact path="/codeqr" element={<CodeQR />} />
				<Route
					exact
					path="/profile"
					element={<PrivateRouter component={Profile} />}
				/>
				<Route
					exact
					path="/packages"
					element={<PrivateRouter component={Packages} />}
				/>
				<Route
					exact
					path="/profits"
					element={<PrivateRouter component={Profits} />}
				/>
				<Route
					path="/packages/:id"
					element={<PrivateRouter component={Packages} />}
				/>
				<Route
					exact
					path="/profile-password"
					element={<PrivateRouter component={Password} />}
				/>
				<Route
					exact
					path="/profile-edit"
					element={<PrivateRouter component={ProfileEdi} />}
				/>
				<Route
					exact
					path="/tutorials"
					element={<PrivateRouter component={Tutorials} public={false} />}
				/>
				<Route
					exact
					path="/frequentQuestions"
					element={
						<PrivateRouter component={FrequentQuestion} public={false} />
					}
				/>
				<Route
					exact
					path="/tutorials-public"
					element={<PublicRouter component={Tutorials} public={true} />}
				/>
				<Route
					exact
					path="/frequentQuestions-public"
					element={<PublicRouter component={FrequentQuestion} public={true} />}
				/>
				<Route
					exact
					path="/support-public"
					element={<PublicRouter component={Support} public={true} />}
				/>
				<Route
					exact
					path="/support"
					element={<PrivateRouter component={Support} public={false} />}
				/>
				<Route exact path="*" element={<Error404 />} />
				<Route exact path="/403" element={<Error403 />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRoutes;
