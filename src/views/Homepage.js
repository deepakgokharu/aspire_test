import React, { useEffect, useState } from "react";
import "./Homepage.css";
import HomepageContainer from "../components/HomepageContainer";
import Menu from "../components/Menu";
import { menuOptions } from "../utils/OptionList";
import UserDetails from "../components/UserDetails";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import axios from "axios";
import { Alert, Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CardOptions from "../components/CardOptions";
import ProceedButton from "../components/ProceedButton";
import { transactionsData } from "../utils/testingObjects";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "70vw",
	color: "black",
	// bgcolor: "#01d167",
	bgcolor: "#F0F0F0",
	// border: "1px solid #000",
	borderRadius: "10px",
	boxShadow: 24,
	p: 3,
};

const noUser = {
	userID: "NA",
	username: "NA",
};

const userID = "user-12345";

export default function Homepage() {
	const [dummy, setDummy] = useState(true);
	const [menuChoosen, setMenuChoosen] = useState(menuOptions.Cards);
	const [userDetails, setUserDetails] = useState(noUser);
	const [successMessageOpen, setSuccessMessageOpen] = useState(false);
	const [successMessage, setSuccessMessage] = useState(
		"Successfully fetched user details."
	);
	const [errorMessageOpen, setErrorMessageOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState(
		"Unable to fetch user details."
	);
	const [showCancelCardDialogue, setShowCancelCardDialogue] = useState(false);
	const [cardsDetails, setCardsDetails] = useState([]);
	const [selectedCard, setSelectedCard] = useState("");
	const [cardTransactions, setCardTransactions] = useState([]);

	const updateCardsDetails = (tempCardsDetails) => {
		setCardsDetails(tempCardsDetails);
	};
	const updateSelectedCard = (tempCardNo) => {
		setSelectedCard(tempCardNo);
	};

	useEffect(() => {
		axios
			.get(`/api/v1/getUserDetails?user_id=${userID}`)
			.then((res) => {
				const tempUserDetails = res.message;
				setUserDetails(tempUserDetails);
				handleSuccessMessageOpen("Successfully fetched user details.");
			})
			.catch((err) => {
				handleErrorMessageOpen("Unable to fetch user details.");
				setUserDetails({ userID: userID, username: "Deepak Gokharu" });
			});

		return () => {
			setUserDetails(noUser);
			setMenuChoosen(menuOptions.Cards);
			setSuccessMessageOpen(false);
			setSuccessMessage("Successfully fetched user details.");
			setErrorMessageOpen(false);
			setErrorMessage("Unable to fetch user details.");
		};
	}, []);

	const handleMenuChoosenChange = (option) => {
		if (option) {
			setMenuChoosen(option);
			setDummy(!dummy);
		}
	};

	const MenuScreen = () => {
		if (menuChoosen == menuOptions.Cards) {
			return (
				<>
					<UserDetails
						userDetails={userDetails}
						handleErrorMessageOpen={handleErrorMessageOpen}
						handleSuccessMessageOpen={handleSuccessMessageOpen}
						cardsDetails={cardsDetails}
						updateCardsDetails={updateCardsDetails}
						selectedCard={selectedCard}
						updateSelectedCard={updateSelectedCard}
						handleNewCardChange={handleNewCardChange}
					/>
					<div className="userDetailsBelowDiv"></div>
					<div className="cardOptions">
						<CardOptions
							startCancelCardProcess={startCancelCardProcess}
							handleFreezeButtonClick={handleFreezeButtonClick}
							cardsDetails={cardsDetails}
							selectedCard={selectedCard}
							transactionsData={cardTransactions}
						/>
					</div>
					<div
						id="divToShowBottomData"
						style={{ height: "8vh" }}
					></div>
				</>
			);
		}
	};

	const handleSuccessMessageOpen = (message) => {
		setSuccessMessage(message);
		setSuccessMessageOpen(true);
	};

	const handleSuccessMessageClose = () => {
		setSuccessMessageOpen(false);
		setTimeout(() => {
			setSuccessMessage("Successfully fetched user details.");
		}, 100);
	};

	const showSuccessMessage = () => {
		return (
			<Snackbar
				open={successMessageOpen}
				autoHideDuration={1000}
				onClose={handleSuccessMessageClose}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
			>
				<Alert
					onClose={handleSuccessMessageClose}
					severity="success"
					sx={{ width: "100%" }}
				>
					{successMessage}
				</Alert>
			</Snackbar>
		);
	};

	const handleErrorMessageOpen = (message) => {
		setErrorMessage(message);
		setErrorMessageOpen(true);
	};

	const handleErrorMessageClose = () => {
		setErrorMessageOpen(false);
		setTimeout(() => {
			setErrorMessage("Unable to fetch user details.");
		}, 100);
	};

	const showErrorMessage = () => {
		return (
			<Snackbar
				open={errorMessageOpen}
				autoHideDuration={1000}
				onClose={handleErrorMessageClose}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
			>
				<Alert
					onClose={handleErrorMessageClose}
					severity="error"
					sx={{ width: "100%" }}
				>
					{errorMessage}
				</Alert>
			</Snackbar>
		);
	};

	const ModalBox = () => {
		return (
			<Modal
				open={menuChoosen != menuOptions.Cards}
				onClose={() => handleMenuChoosenChange(menuOptions.Cards)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography
						id="modal-modal-title"
						// variant="h6"
						// component="h2"
						style={{ display: "flex", justifyContent: "flex-end" }}
					>
						<CloseIcon
							onClick={() =>
								handleMenuChoosenChange(menuOptions.Cards)
							}
						/>
					</Typography>
					<Typography
						id="modal-modal-title"
						// variant="h6"
						// component="h2"
						style={{ display: "flex" }}
					>
						<NewReleasesIcon style={{ marginRight: "5px" }} />
						Upcoming release features.
					</Typography>
					{/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
						Duis mollis, est non commodo luctus, nisi erat porttitor
						ligula.
					</Typography> */}
				</Box>
			</Modal>
		);
	};

	const changeDummy = () => {
		setDummy((prevVal) => !prevVal);
	};

	const startCancelCardProcess = () => {
		setShowCancelCardDialogue(true);
	};
	const handleNewCardChange = (newCard) => {
		const tempCardsDetails = [newCard].concat(cardsDetails);
		updateCardsDetails(tempCardsDetails);
		updateSelectedCard(newCard["card_no"]);
		changeDummy();
	};

	useEffect(() => {
		axios
			.get(
				`/api/v1/getCardTransactions?user_id=${userID}&card_no=${selectedCard}`
			)
			.then((res) => {
				const tempCardTransactions = res.message;
				setCardTransactions(tempCardTransactions);
				handleSuccessMessageOpen(
					"Successfully fetched user's transactions."
				);
			})
			.catch((err) => {
				handleErrorMessageOpen("Unable to fetch card transactions.");
				setCardTransactions(transactionsData);
			});
		return () => {};
	}, [selectedCard]);

	const handleFreezeButtonClick = () => {
		let getCurrentCardDetailsIndex = -1;
		cardsDetails.map((cardDetails, index) => {
			if (cardDetails["card_no"] == selectedCard) {
				getCurrentCardDetailsIndex = index;
			}
		});
		const currentFreezeStatus =
			cardsDetails[getCurrentCardDetailsIndex]["freeze_status"];
		const tempCardsDetails = cardsDetails.map((cardDetails, index) => {
			if (index == getCurrentCardDetailsIndex) {
				cardDetails["freeze_status"] = !currentFreezeStatus;
			}
			return cardDetails;
		});
		setCardsDetails(tempCardsDetails);
	};

	const handleDeleteCardCancelClick = () => {
		setShowCancelCardDialogue(false);
	};

	const handleDeleteCard = () => {
		const deleteCardsDetails = cardsDetails.filter((cardDetails) => {
			return cardDetails.card_no == selectedCard;
		});
		const tempCardsDetails = cardsDetails.filter((cardDetails) => {
			return cardDetails.card_no != selectedCard;
		});
		updateCardsDetails(tempCardsDetails);
		updateSelectedCard(tempCardsDetails[0]["card_no"]);
		handleDeleteCardCancelClick();
	};

	const ShowCancelCardDialogueBox = () => {
		const cardCounts = cardsDetails.length;
		if (cardCounts > 1) {
			return (
				<Dialog
					open={showCancelCardDialogue}
					onClose={() => handleDeleteCardCancelClick()}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">
						Delete Card
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Are you sure, you want to delete your card !!
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<ProceedButton
							onClick={handleDeleteCard}
							variant="contained"

							// color="green"
							// autoFocus
						>
							Proceed
						</ProceedButton>
						<Button
							style={{ color: "black" }}
							onClick={handleDeleteCardCancelClick}
						>
							Cancel
						</Button>
					</DialogActions>
				</Dialog>
			);
		} else {
			return (
				<Dialog
					open={showCancelCardDialogue}
					onClose={() => handleDeleteCardCancelClick()}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">
						Delete Card
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							You can't delete all cards, please contact admin for
							further discussions.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleDeleteCardCancelClick} autoFocus>
							Close
						</Button>
						{/* <Button onClick={handleDeleteCardCancelClick}>
							Cancel
						</Button> */}
					</DialogActions>
				</Dialog>
			);
		}
	};

	return (
		<HomepageContainer>
			<Menu
				menuChoosen={menuChoosen}
				handleMenuChoosenChange={handleMenuChoosenChange}
			/>
			{MenuScreen()}
			{ModalBox()}
			{showSuccessMessage()}
			{showErrorMessage()}
			{ShowCancelCardDialogueBox()}
		</HomepageContainer>
	);
}
