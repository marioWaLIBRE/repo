import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PublicListRouters } from "../Share/Constants";

export const PublicRouter = ({
	isAthenticated,
	component: Component,
	...rest
}) => {
	const navigate = useNavigate();
	const validated = JSON.parse(sessionStorage.getItem("validated"));
	const location = useLocation();
	const searchPathToFilterIfExist = PublicListRouters.filter(
		(item) => item.path === location.pathname
	);

	useEffect(() => {
		if (validated && searchPathToFilterIfExist.length > 0) {
			navigate("/403");
		}
	}, []);

	if (!validated) {
		return <Component {...rest} />;
	} else {
		navigate("*");
	}
};
