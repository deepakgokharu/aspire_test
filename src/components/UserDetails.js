import React, { useState, useEffect } from "react";
import "./UserDetails.css";
import axios from "axios";
import { Backdrop, CircularProgress, TextField } from "@mui/material";
import { defaultCardsDetails } from "../utils/testingObjects";
import { Col, Row } from "antd";
import { ReactComponent as AspireLogo } from "../assets/aspireLogo.svg";
import AccountBalance from "./AccountBalance";
import { ReactComponent as AddIcon } from "../assets/add.svg";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { debitCardTabValues, debitCardColorList } from "../utils/OptionList";
import { Carousel } from "antd";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DebitCard from "./DebitCard";
import ProceedButton from "./ProceedButton";
import AddCardIcon from "@mui/icons-material/AddCard";

const contentStyle = {
	margin: 0,
	color: "#fff",
	height: "45vh",
	// lineHeight: "160px",
	textAlign: "center",
	background: "#0C365A",
	// paddingTop: "4vh",
};

export default function UserDetails(props) {
	const { userDetails, handleErrorMessageOpen } = props;
	const { userID } = userDetails;
	const [isFetchingCardsDetails, setIsFetchingCardsDetails] = useState(false);
	const [showAddCardDialogue, setShowAddCardDialogue] = useState(false);
	const [newCardDetails, setNewCardDetails] = useState({});
	const [cardName, setCardName] = useState("");
	const [cardNameError, setCardNameError] = useState(false);

	const handleCardNameChange = (name) => {
		setCardName(name || "");
		const tempNewCardDetails = newCardDetails;
		tempNewCardDetails["card_name"] = name || "Name";
		setNewCardDetails(tempNewCardDetails);
	};

	const generateNewCardDetails = () => {
		const tempNewCardDetails = {
			card_no:
				String(Math.floor(Math.random() * 100000000 + 1)) +
				String(Math.floor(Math.random() * 100000000 + 1)),
			card_name: "Name",
			expiry:
				String((Math.floor(Math.random() * 100 + 1) % 12) + 1) +
				"/" +
				String(Math.floor(Math.random() * 10 + 24)),
			cvv: String(Math.floor(Math.random() * 1000 + 1)),
			type: "debit",
			system: "visa",
			account_balance: Math.floor(Math.random() * 100 + 1) * 100,
			freeze_status: false,
		};
		if (tempNewCardDetails["card_no"].length != 16) {
			let remainingLength = 16 - tempNewCardDetails["card_no"].length;
			while (remainingLength--)
				tempNewCardDetails["card_no"] += String(
					Math.floor(Math.random() * 10 + 1)
				)[0];
		}
		return tempNewCardDetails;
	};

	const [debitCardTabValue, setDebitCardTabValue] = useState(
		debitCardTabValues.MyDebitCards
	);

	useEffect(() => {
		// fetching cards details
		setIsFetchingCardsDetails(true);

		const { updateCardsDetails, updateSelectedCard } = props;
		axios
			.get(`/getUserCardsDetails?user_id=${userID}`)
			.then((res) => {
				const tempCardsDetails = res.message;
				updateCardsDetails(tempCardsDetails);
				setIsFetchingCardsDetails(false);
				updateSelectedCard(tempCardsDetails[0]["account_balance"]);
			})
			.catch((err) => {
				setIsFetchingCardsDetails(false);
				handleErrorMessageOpen("Unable to fetch cards for you.");

				// setting default card details
				updateCardsDetails(defaultCardsDetails);
				updateSelectedCard(defaultCardsDetails[0]["card_no"]);
			});
		return () => {
			// unmounting the component
			updateCardsDetails([]);
			setIsFetchingCardsDetails(false);
			updateSelectedCard("");
		};
	}, []);

	const handleAddCardCloseClick = () => {
		setShowAddCardDialogue(false);
		resetCardNameDetails();
	};

	const handleAddCardDialogueBoxOpen = () => {
		setNewCardDetails(generateNewCardDetails());
		setShowAddCardDialogue(true);
	};

	const resetCardNameDetails = () => {
		setCardName("");
		setCardNameError(false);
	};

	const addNewCard = () => {
		if (cardName) {
			const { handleNewCardChange } = props;
			handleNewCardChange({ ...newCardDetails, card_name: cardName });
			handleAddCardCloseClick();
			setCardNameError(false);
		} else {
			setCardNameError(true);
		}
	};

	const ShowAddCardDialogueBox = () => {
		return (
			<Dialog
				open={showAddCardDialogue}
				onClose={() => handleAddCardCloseClick()}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle
					id="alert-dialog-title"
					style={{ display: "flex", alignItems: "center" }}
				>
					<AddCardIcon style={{ marginRight: "10px" }} />
					Add New Card
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						<TextField
							error={cardNameError}
							helperText={
								cardNameError && "Please fill this field"
							}
							id="standard-basic"
							label="Name on card"
							variant="standard"
							value={cardName}
							onChange={(event) => {
								handleCardNameChange(event.target.value);
								if (!event.target.value) {
									setCardNameError(true);
								} else {
									setCardNameError(false);
								}
							}}
						/>
						<div style={{ scale: "1 0.8" }}>
							<DebitCard
								cardDetails={newCardDetails}
								userDetails={userDetails}
								showCardNumberAlways={true}
							/>
						</div>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<ProceedButton onClick={addNewCard} variant="contained">
						Add
					</ProceedButton>
					<Button
						style={{ color: "black" }}
						onClick={handleAddCardCloseClick}
					>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		);
	};

	const getCurrentCardDetails = () => {
		const { cardsDetails, selectedCard } = props;
		const currentCardDetails = cardsDetails.filter((cardDetails) => {
			return cardDetails["card_no"] == selectedCard;
		});
		return currentCardDetails[0] || {};
	};

	const handleDebitCardTabChange = (event, newValue) => {
		// event;
		setDebitCardTabValue(newValue);
	};

	const handleCardChangeInCarousel = (currentCardIndex) => {
		const { cardsDetails, updateSelectedCard } = props;
		updateSelectedCard(cardsDetails[currentCardIndex].card_no);
	};

	const { cardsDetails } = props;

	return isFetchingCardsDetails ? (
		<Backdrop
			sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
			open={isFetchingCardsDetails}
		>
			<CircularProgress color="inherit" />
		</Backdrop>
	) : (
		<div className="userDetailsContainer">
			{ShowAddCardDialogueBox()}
			<div className="aspire-logo">
				<AspireLogo />
			</div>
			<div className="userDetailsHeader">
				<Row style={{ height: "5vh" }}>
					<Col span={1}></Col>
					<Col span={7}>
						<AccountBalance cardDetails={getCurrentCardDetails()} />
					</Col>
					<Col span={8}></Col>
					<Col
						span={7}
						style={{
							textAlign: "end",
							color: "#23CEFD",
							fontSize: "x-small",
							display: "flex",
							justifyContent: "end",
						}}
					>
						<div
							onClick={handleAddCardDialogueBoxOpen}
							style={{
								cursor: "pointer",
								display: "flex",
								width: "max-content",
								fontSize: "small",
								alignItems: "center",
							}}
						>
							<AddIcon style={{ marginRight: "5px" }} /> New Card
						</div>
					</Col>
					<Col span={1}></Col>
				</Row>
			</div>
			<div className="cardDetails">
				<TabContext value={debitCardTabValue}>
					<TabList
						onChange={handleDebitCardTabChange}
						aria-label="lab API tabs for debit"
					>
						<Tab
							label={debitCardTabValues.MyDebitCards}
							value={debitCardTabValues.MyDebitCards}
							style={{
								fontSize: "x-small",
								fontWeight: "bold",
								color: "white",
								opacity:
									debitCardTabValues.MyDebitCards ==
									debitCardTabValue
										? "100%"
										: "50%",
							}}
						/>
						<Tab
							label={debitCardTabValues.AllCompanyCards}
							value={debitCardTabValues.AllCompanyCards}
							style={{
								fontSize: "x-small",
								fontWeight: "bold",
								color: "white",
								opacity:
									debitCardTabValues.AllCompanyCards ==
									debitCardTabValue
										? "100%"
										: "50%",
							}}
						/>
					</TabList>
					<TabPanel value={debitCardTabValues.MyDebitCards}>
						<Carousel afterChange={handleCardChangeInCarousel}>
							{cardsDetails.map((cardDetails, index) => {
								return (
									<div key={"card_details_" + String(index)}>
										<div className="debitCardBeforeDiv"></div>
										<h3 style={contentStyle}>
											<DebitCard
												cardDetails={cardDetails}
												userDetails={userDetails}
												bgColor={
													debitCardColorList[
														index %
															debitCardColorList.length
													]
												}
											/>
										</h3>
									</div>
								);
							})}
						</Carousel>
					</TabPanel>
					<TabPanel value={debitCardTabValues.AllCompanyCards}>
						Part of Upcoming Release
					</TabPanel>
				</TabContext>
			</div>
		</div>
	);
}
