import React from "react";
import { ReactComponent as DownArrow } from "../assets/DownArrow.svg";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import "./Accordian.css";

export default function Accordian(props) {
	const { headerValue, children, defaultExpanded = false } = props;
	return (
		<Accordion
			defaultExpanded={defaultExpanded}
			style={{ borderRadius: "10px" }}
		>
			<AccordionSummary
				expandIcon={<DownArrow />}
				aria-controls="panel1a-content"
				id="panel1a-header"
				style={{
					backgroundColor: "#FAFCFF",
					boxShadow: "0px 1px 8px lightgrey",
				}}
			>
				{headerValue}
			</AccordionSummary>
			<AccordionDetails>{children}</AccordionDetails>
		</Accordion>
	);
}
