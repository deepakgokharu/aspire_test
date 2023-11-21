import React from "react";

export default function AccountBalance(props) {
	const { account_balance } = props.cardDetails;

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				height: "100%",
			}}
		>
			<div
				style={{
					width: "100%",
					fontWeight: "bold",
					fontSize: "",
				}}
			>
				Account Balance
			</div>
			<div
				style={{
					display: "flex",
					width: "80%",
					fontSize: "large",
					justifyContent: "space-between",
				}}
			>
				<span
					style={{
						padding: "3px 15px",
						backgroundColor: "#01D167",
						color: "white",
						borderRadius: "5px",
						fontSize: "70%",
					}}
				>
					S$
				</span>
				<span>{account_balance}</span>
			</div>
		</div>
	);
}
