import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PrivateListRouters } from "../Share/Constants";
import useIdle from "../Hooks/useIdleTime";

export const PrivateRouter = ({
	isAthenticated,
	component: Component,
	...rest
}) => {
	const navigate = useNavigate();
	const validated = JSON.parse(sessionStorage.getItem("validated"));
	const location = useLocation();
	const searchPathToFilterIfExist = PrivateListRouters.filter(
		(item) => item.path === location.pathname
	);

	const Logout = () => {
		sessionStorage.clear();
		navigate("/");
		alert("Your account was close for inactivity");
	};

	useIdle({ onIdle: Logout, idleTime: 15 });

	useEffect(() => {
		if (!validated && searchPathToFilterIfExist.length > 0) {
			navigate("/403");
		}
	}, []);

	if (validated) {
		return <Component {...rest} />;
	} else {
		navigate("*");
	}
};
