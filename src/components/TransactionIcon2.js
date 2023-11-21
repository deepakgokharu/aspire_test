import React from "react";
import { ReactComponent as TransactionIconSVG2 } from "../assets/TransactionIconSVG2.svg";

export default function TransactionIcon2() {
	return (
		<div
			style={{
				backgroundColor: "#00D6B51A",
				borderRadius: "50%",
				height: "48px",
				width: "48px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<TransactionIconSVG2 />
		</div>
	);
}
