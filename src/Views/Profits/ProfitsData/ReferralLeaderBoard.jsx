import React from "react";
import TableToExcel from "@linways/table-to-excel";
import ExportExcel from "../../../Components/ExportExcel/ExportExcel";
import { headerTableLeaders } from "../../../Share/Constants";
import { useReferralsLeadersContext } from "../../../Hooks/ReferralLeadersProvider";
import "./profitsdata.css";

const generateExcel = () => {
	TableToExcel.convert(document.getElementById("referralLeadersBoard_id"), {
		name: "Referral Leader Board.xlsx",
		sheet: {
			name: "Page 1",
		},
	});
};

const ReferralLeaderBoard = () => {
	const listReferralLeaders = useReferralsLeadersContext();

	return (
		<section className="text_referrals_profits_container_dad">
			<div className="text_totals_blue text_total_size">
				<p className="text_totals_blue_dark">REFERRAL LEADER BOARD</p>
			</div>
			<div className="display_none">
				<ExportExcel
					children={"Download Referral Leader Board"}
					action={generateExcel}
				/>
			</div>
			<div className="table__design__datatable_container">
				<table
					className="table__design__datatable"
					id="referralLeadersBoard_id"
					data-cols-width="40,40,40"
				>
					<thead className="table__design__datatable__thead">
						<tr data-height="20">
							{headerTableLeaders.map((item) => {
								return (
									<th
										data-a-h="center"
										data-f-bold="true"
										data-b-a-s="double"
										className="table__design__datatable__th"
										key={`${item.id} ${item.titulo}`}
									>
										<p>{item.titulo}</p>
									</th>
								);
							})}
						</tr>
					</thead>
					<tbody className="table__design__datatable__tbody">
						{listReferralLeaders?.map((item) => {
							return (
								<tr
									key={`${item.UserName} ${item["Total # of Tier 1 & Tier 2 Active Packages"]}`}
									data-height="20"
								>
									<td data-t="s" data-a-h="center" data-b-a-s="double">
										<p className="texto__generico__tablabody">
											{item.UserName}
										</p>
									</td>
									{/* <td data-t="n" data-a-h="center" data-b-a-s="double">
										<p className="texto__generico__tablabody">
											{item["Total # of Tier 1 & Tier 2 Referrals"]}
										</p>
									</td> */}
									<td data-t="n" data-a-h="center" data-b-a-s="double">
										<p className="texto__generico__tablabody">
											{item["Total # of Tier 1 & Tier 2 Active Packages"]}
										</p>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</section>
	);
};

export default ReferralLeaderBoard;
