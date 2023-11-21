import React from "react";
import "./MenuOptionButton.css";

export default function MenuOptionButton(props) {
	const { selected, value, handleMenuChoosenChange, children } = props;

	return (
		<button
			className={"menuButton " + selected}
			onClick={() => {
				handleMenuChoosenChange(value);
			}}
		>
			{children}
			<span
				style={{
					fontSize: "x-small",
					marginLeft: "7px",
					marginTop: "5px",
				}}
			>
				{value}
			</span>
		</button>
	);
}
