import React from "react";
import { ReactComponent as DebitCreditIcon } from "../assets/DebitCreditIcon.svg";

export default function Transaction(props) {
	const { transactionData, Icon } = props;
	const transactionType = transactionData["type"];

	return (
		<div
			style={{
				padding: "20px 0px",
				borderBottom: "1px solid lightgrey",
				fontSize: "small",
				margin: "0px 15px",
			}}
		>
			<div style={{ display: "flex" }}>
				<div style={{ marginRight: "10px" }}>{Icon}</div>
				<div>
					<div style={{ fontWeight: "bolder" }}>
						{transactionData["name"]}
					</div>
					<div style={{ color: "#AAAAAA" }}>
						{transactionData["date"]}
					</div>
				</div>
				<div
					style={{
						fontWeight: "bolder",
						marginLeft: "auto",
						color:
							transactionType == "debit" ? "#222222" : "#01D167",
					}}
				>
					{transactionType == "debit" ? "-" : "+"} S${" "}
					{transactionData["amount"]}
				</div>
			</div>
			<div
				style={{
					width: "100%",

					fontWeight: "bold",
					color: "#325BAF",
					display: "flex",
					justifyContent: "center",
				}}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "20px",
						width: "20px",
						borderRadius: "50%",
						backgroundColor: "#325BAF",
						fill: "white",
						marginRight: "10px",
					}}
				>
					<DebitCreditIcon />
				</div>
				{transactionType == "debit"
					? "Charged to debit card"
					: "Refund on debit card"}
			</div>
		</div>
	);
}
