import React from "react";
import "./Menu.css";
import MenuOptionButton from "./MenuOptionButton";
import { ReactComponent as HomeSVG } from "../assets/menuOptionHome.svg";
import { ReactComponent as CardsSVG } from "../assets/menuOptionCards.svg";
import { ReactComponent as PaymentsSVG } from "../assets/menuOptionPayments.svg";
import { ReactComponent as CreditSVG } from "../assets/menuOptionCredit.svg";
import { ReactComponent as ProfileSVG } from "../assets/menuOptionProfile.svg";
import Grid from "@mui/material/Grid";

const selectedOption = {
	selected: "selected",
	deselected: "deselected",
};

const menuOptionsList = ["Home", "Cards", "Payments", "Credit", "Profile"];

const imageMap = {
	Cards: <CardsSVG />,
	Home: <HomeSVG />,
	Payments: <PaymentsSVG />,
	Credit: <CreditSVG />,
	Profile: <ProfileSVG />,
};

export default function Menu(props) {
	const { menuChoosen, handleMenuChoosenChange } = props;

	const MenuOptions = menuOptionsList.map((optionValue) => {
		return (
			<Grid
				item
				xs={12 / 5}
				className="menuButtons"
				key={optionValue + "key"}
			>
				<MenuOptionButton
					handleMenuChoosenChange={handleMenuChoosenChange}
					value={optionValue}
					selected={
						menuChoosen == optionValue
							? selectedOption.selected
							: selectedOption.deselected
					}
				>
					<div
						className={
							(menuChoosen == optionValue
								? selectedOption.selected
								: selectedOption.deselected) + "Img"
						}
					>
						<div
							// src={imageMap[optionValue]}
							alt={optionValue.toLowerCase() + " svg"}
							style={{
								height: "3vh",
								width: "3vh",
								marginBottom: "3px",
							}}
						>
							{imageMap[optionValue]}
						</div>
					</div>
				</MenuOptionButton>
			</Grid>
		);
	});

	return (
		<div className="menu bottomFixed">
			<Grid container spacing={0}>
				{MenuOptions}
				{/* <MenuOptionButton
					value={"Home"}
					selected={
						menuChoosen == "Home"
							? selectedOption.selected
							: selectedOption.deselected
					}
				>
					<div>
						<img src={HomeSVG} alt="home svg" />
					</div>
				</MenuOptionButton>
				<MenuOptionButton
					value={"Cards"}
					selected={
						menuChoosen == "Cards"
							? selectedOption.selected
							: selectedOption.deselected
					}
				>
					<div>
						<img src={CardsSVG} alt="cards svg" />
					</div>
				</MenuOptionButton>
				<MenuOptionButton
					value={"Payments"}
					selected={
						menuChoosen == "Payments"
							? selectedOption.selected
							: selectedOption.deselected
					}
				>
					<div>
						<img src={PaymentsSVG} alt="payments svg" />
					</div>
				</MenuOptionButton>
				<MenuOptionButton
					value={"Credit"}
					selected={
						menuChoosen == "Credit"
							? selectedOption.selected
							: selectedOption.deselected
					}
				>
					<div>
						<img src={CreditSVG} alt="credit svg" />
					</div>
				</MenuOptionButton>
				<MenuOptionButton
					value={"Profile"}
					selected={
						menuChoosen == "Profile"
							? selectedOption.selected
							: selectedOption.deselected
					}
				>
					<div>
						<img src={ProfileSVG} alt="profile svg" />
					</div>
				</MenuOptionButton> */}
			</Grid>
		</div>
	);
}
