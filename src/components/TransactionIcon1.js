import React from "react";
import { ReactComponent as TransactionIconSVG1 } from "../assets/TransactionIconSVG1.svg";

export default function TransactionIcon1() {
	return (
		<div
			style={{
				backgroundColor: "#009DFF1A",
				borderRadius: "50%",
				height: "48px",
				width: "48px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<TransactionIconSVG1 />
		</div>
	);
}
