import React from "react";
import {
	headersProfits,
	headersProfitsTotals,
	statePackages,
	TierOneReferralsInformation,
	TierTwoReferralsInformation,
} from "../../Share/Constants";
import "./datatablereferrals.css";

const obtenerNameState = (state) => {
	return statePackages?.filter((item) => item.id === state)[0];
}
	
const DataTableReferrals = ({
	id,
	idtwo,
	isTotals,
	referralsTierOne,
	referralsTierTwo,
	dataTableReferrals,
	tableHiddenTierOne,
}) => {
	let headers;
	let listaTotals;
	let counter = 0;
	let headersHidden;
	let dataTableHidden;
	let columnsTableHidden;

	// CARACTERISTICAS DATOS TABLAS
	if (isTotals) {
		headers = headersProfitsTotals;
		listaTotals = "25,20,20,20,20,20,40,25,35";
	} else {
		headers = headersProfits;
		listaTotals = "25,20,20,20,20,40,25,35";
	}

	// // CARACTERISTICAS DE DATOS DE TABLAS HIDDEN
	if (tableHiddenTierOne) {
		dataTableHidden = referralsTierOne;
		columnsTableHidden = "50,40,25,30";
		headersHidden = TierOneReferralsInformation;
	} else {
		dataTableHidden = referralsTierTwo;
		columnsTableHidden = "50,25,30,40,40";
		headersHidden = TierTwoReferralsInformation;
	}

	return (
		<section className="table_date_referrals_container">
			<table
				className="table__design__datatable_referrals"
				id={id ?? "dataTableReferrals_id"}
				data-cols-width={listaTotals}
			>
				<thead className="table__design__datatable__thead_referrals">
					<tr data-height="20">
						{headers.map((item) => {
							return (
								<th
									data-a-h="center"
									data-f-bold="true"
									data-b-a-s="double"
									key={item.title}
								>
									<p>{item.title}</p>
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody className="table__design__datatable__tbody__referrals">
					{dataTableReferrals?.map((item) => {
						return (
							<tr
								data-height="20"
								key={`${(counter += 1)}${item.UsersCliEmail}`}
							>
								{isTotals ? (
									<td data-t="s" data-a-h="center" data-b-a-s="double">
										<p className="texto__generico__tablabody_referrals">
											{item.UsersCliFullName}
										</p>
									</td>
								) : null}
								<td data-t="s" data-a-h="center" data-b-a-s="double">
									<p className="texto__generico__tablabody_referrals">
										{item.PackagesDateReceived.split("T")[0]}
									</p>
								</td>
								<td data-t="s" data-a-h="center" data-b-a-s="double">
									<p className="texto__generico__tablabody_referrals">
										{item.PackagesNumber}
									</p>
								</td>
								<td data-t="s" data-a-h="center" data-b-a-s="double">
									<p className="texto__generico__tablabody_referrals">
										{obtenerNameState(item.PackagesState).name}
									</p>
								</td>
								<td data-t="s" data-a-h="center" data-b-a-s="double">
									<p className="texto__generico__tablabody_referrals">
										{item.PackagesCycle}
									</p>
								</td>
								<td data-t="s" data-a-h="center" data-b-a-s="double">
									<p className="texto__generico__tablabody_referrals">
										{item.PackagesNextreceipt.split("T")[0]}
									</p>
								</td>
								<td data-t="s" data-a-h="center" data-b-a-s="double">
									<p className="texto__generico__tablabody_referrals">
										{item.PackagesAmountToReceive}
									</p>
								</td>
								<td data-t="s" data-a-h="center" data-b-a-s="double">
									<p className="texto__generico__tablabody_referrals">
										{item.MonthlyCommissions}
									</p>
								</td>
								<td data-t="s" data-a-h="center" data-b-a-s="double">
									<p className="texto__generico__tablabody_referrals">
										{item.TotalReturn}
									</p>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<table
				className="table__design__datatable_referrals_hidden"
				id={idtwo ?? "dataTableReferrals_id_hidden"}
				data-cols-width={columnsTableHidden}
			>
				<thead className="table__design__datatable__thead_referrals">
					<tr data-height="20">
						{headersHidden.map((item) => {
							return (
								<th
									data-a-h="center"
									data-f-bold="true"
									data-b-a-s="double"
									key={item.title}
								>
									<p>{item.title}</p>
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody className="table__design__datatable__tbody__referrals">
					{dataTableHidden?.map((item) => {
						return (
							<tr
								data-height="20"
								key={`${(counter += 1)}${item.UsersCliEmail}`}
							>
								<td data-t="s" data-a-h="center" data-b-a-s="double">
									<p className="texto__generico__tablabody_referrals">
										{item.UsersCliFirstName}
										{item.UsersCliLastName}
									</p>
								</td>
								{/*  */}
								{tableHiddenTierOne ? (
									<td data-t="s" data-a-h="center" data-b-a-s="double">
										<p className="texto__generico__tablabody_referrals">
											{item.UsersCliEmail}
										</p>
									</td>
								) : null}
								{/*  */}
								<td data-t="s" data-a-h="center" data-b-a-s="double">
									<p className="texto__generico__tablabody_referrals">
										{item?.UsersCliRegistrationDate?.split("T")[0]}
									</p>
								</td>
								{/*  */}
								<td data-t="n" data-a-h="center" data-b-a-s="double">
									<p className="texto__generico__tablabody_referrals">
										{item.UsersCliActivePackages}
									</p>
								</td>
								{/*  */}
								{tableHiddenTierOne ? null : (
									<td data-t="s" data-a-h="center" data-b-a-s="double">
										<p className="texto__generico__tablabody_referrals">
											{item.UsersCliReferrerFirstName}{" "}
											{item.UsersCliReferrerLastName}
										</p>
									</td>
								)}
								{/*  */}
								{tableHiddenTierOne ? null : (
									<td data-t="s" data-a-h="center" data-b-a-s="double">
										<p className="texto__generico__tablabody_referrals">
											{item.UsersCliReferrerEmail}
										</p>
									</td>
								)}
							</tr>
						);
					})}
				</tbody>
			</table>
		</section>
	);
};

export default DataTableReferrals;
