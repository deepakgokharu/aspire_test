import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export default function ProceedButton(props) {
	const { style = {}, onClick, variant = "", children } = props;

	const ProceedButton = styled(Button)({
		boxShadow: "none",
		textTransform: "none",
		padding: "6px 12px",
		// border: "1px solid",
		lineHeight: 1.5,
		backgroundColor: "#01D167",
		// borderColor: "#00ff7d",
		"&:hover": {
			backgroundColor: "#01D167",
			// borderColor: "#00ff7d",
			border: "1px solid #01D167",
			boxShadow: "none",
			filter: "brightness(1.1)",
		},
		"&:active": {
			boxShadow: "none",
			backgroundColor: "#01D167",
			border: "1px solid #01D167",
			filter: "brightness(1.1)",
			// borderColor: "#00ff7d",
		},
		"&:focus": {
			boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
		},
		...style,
	});
	return (
		<ProceedButton onClick={onClick} variant={variant}>
			{children}
		</ProceedButton>
	);
}
