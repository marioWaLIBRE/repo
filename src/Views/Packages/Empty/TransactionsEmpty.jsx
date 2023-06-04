import React from "react";

import "./packagesEmpty.css";

const TransactionsEmpty = () => {
	return (
		<section className="container_dad_transactions_empity display_column_center_center">
			<div className="text_panel_title display">
				<p>
					{" "}
					<span className="package_light-blue">
						{" "}
						YOU DON’T HAVE ANY{" "}
					</span>{" "}
					<span className="package_dark-blue">
						{" "}
						TRANSACTION YET{" "}
					</span>{" "}
				</p>
			</div>
			<div className="package_empty_img display">
				<img
					className="size_empty_img"
					src="./Assets/Images/Canceled_No.svg"
					alt=""
				/>
			</div>
			<p className="p_withdrawals_message display">
				{" "}
				When you have any transaction it’s reflected here{" "}
			</p>
		</section>
	);
};

export default TransactionsEmpty;
