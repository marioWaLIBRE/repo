import Sidebar from "../../../Components/Sidebar/Sidebar";
import Louding from "../../Louding/Louding";
import "./layoutmu.css";

const Layoutmu = ({ children, loading = false }) => {
	/**
	 *
	 * Creo la vista layaut
	 *
	 * Agrego el spinner para loading de las vistas,
	 * con props loading
	 */
	return (
		<section className="container_layout_rsponsive">
			<div className="links-navbar">
				<Sidebar />
			</div>
			<div className="container__layoutmu">
				{loading ? <Louding /> : children}
			</div>
		</section>
	);
};

export default Layoutmu;
