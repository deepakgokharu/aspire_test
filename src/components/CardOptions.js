import React, { useEffect, useState } from "react";
import "./CardOptions.css";
import { ReactComponent as FreezeCardIcon } from "../assets/FreezeCard.svg";
import { ReactComponent as SetSpendLimitIcon } from "../assets/SetSpendLimit.svg";
import { ReactComponent as GPayIcon } from "../assets/GPay.svg";
import { ReactComponent as ReplaceCardIcon } from "../assets/ReplaceCard.svg";
import { ReactComponent as DeactivateCardIcon } from "../assets/DeactivateCard.svg";
import { ReactComponent as CardDetailsIcon } from "../assets/CardDetails.svg";
import { ReactComponent as TransactionsIcon } from "../assets/Transactions.svg";
import Accordian from "./Accordian";
import Transaction from "./Transaction";
import TransactionIcon1 from "./TransactionIcon1";
import TransactionIcon2 from "./TransactionIcon2";
import TransactionIcon3 from "./TransactionIcon3";

export default function CardOptions(props) {
	const [viewAllTransactions, setViewAllTransactions] = useState(false);
	const {
		startCancelCardProcess,
		handleFreezeButtonClick,
		cardsDetails,
		selectedCard,
	} = props;

	const getCurrentCardDetails = () => {
		const { selectedCard, cardsDetails } = props;
		const currentCardDetails = cardsDetails.filter((cardDetails) => {
			return cardDetails["card_no"] == selectedCard;
		});
		return currentCardDetails[0] || {};
	};

	const currentCardDetails = getCurrentCardDetails();

	const getTransactionIcon = (index) => {
		if (index == 0) {
			return <TransactionIcon1 />;
		} else if (index == 1) {
			return <TransactionIcon2 />;
		} else {
			return <TransactionIcon3 />;
		}
	};

	const handleViewAllTransactionsClick = () => {
		setViewAllTransactions(true);
	};

	const getTransactionDiv = () => {
		const { transactionsData } = props;
		if (viewAllTransactions) {
			return transactionsData.map((transactionData, index) => {
				return (
					<Transaction
						transactionData={transactionData}
						Icon={getTransactionIcon(index % 3)}
						key={"transaction_" + index}
					/>
				);
			});
		} else {
			const tempTransactionsData = transactionsData.slice(0, 3);
			let view = tempTransactionsData.map((transactionData, index) => {
				return (
					<Transaction
						transactionData={transactionData}
						Icon={getTransactionIcon(index % 3)}
						key={"transaction_" + index}
					/>
				);
			});
			const viewAllTransactionDiv = (
				<div
					style={{
						color: "#01D167",
						backgroundColor: "#EDFFF5",
						border: "1px solid #DDFFEC",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						width: "100%",
						height: "5vh",
					}}
					onClick={handleViewAllTransactionsClick}
				>
					View all card transactions
				</div>
			);
			view = view.concat(viewAllTransactionDiv);

			return view;
		}
	};

	return (
		<>
			<div className="card_functions">
				<div
					className="menuOptionIconDiv"
					onClick={handleFreezeButtonClick}
				>
					<FreezeCardIcon />
					<span style={{ textAlign: "center" }}>
						{((cardsDetails.filter((cardDetails) => {
							return cardDetails["card_no"] == selectedCard;
						}) || [])[0] || { freeze_status: false })[
							"freeze_status"
						]
							? "Unfreeze "
							: "Freeze "}{" "}
						card
					</span>
				</div>
				<div
					className="menuOptionIconDiv"
					onClick={() => {
						alert("Part of Upcoming release.");
					}}
				>
					<SetSpendLimitIcon />
					<span style={{ textAlign: "center" }}>Set spend limit</span>
				</div>
				<div
					className="menuOptionIconDiv"
					onClick={() => {
						alert("Part of Upcoming release.");
					}}
				>
					<GPayIcon />
					<span style={{ textAlign: "center" }}>Add to Gpay</span>
				</div>
				<div
					className="menuOptionIconDiv"
					onClick={() => {
						alert("Part of Upcoming release.");
					}}
				>
					<ReplaceCardIcon />
					<span style={{ textAlign: "center" }}>Replace card</span>
				</div>
				<div className="menuOptionIconDiv">
					<DeactivateCardIcon />
					<span
						style={{ textAlign: "center" }}
						onClick={startCancelCardProcess}
					>
						Cancel card
					</span>
				</div>
			</div>
			<div className="cardDetails">
				<Accordian
					headerValue={
						<div style={{ display: "flex" }}>
							<CardDetailsIcon style={{ marginRight: "10px" }} />
							<span>Card Details </span>
						</div>
					}
				>
					<div style={{ margin: "20px" }}>
						<div style={{ display: "flex", fontSize: "120%" }}>
							<div
								style={{
									fontSize: "100%",
									fontWeight: "bold",
									marginRight: "5px",
								}}
							>
								Name of Card:{" "}
							</div>
							<div> {currentCardDetails["card_name"]}</div>
						</div>
						<div style={{ display: "flex", fontSize: "120%" }}>
							<div
								style={{
									fontSize: "100%",
									fontWeight: "bold",
									marginRight: "5px",
								}}
							>
								Expiry Date:{" "}
							</div>
							<div>{currentCardDetails["expiry"]}</div>
						</div>
						<div style={{ display: "flex", fontSize: "120%" }}>
							<div
								style={{
									fontSize: "100%",
									fontWeight: "bold",
									marginRight: "5px",
								}}
							>
								Card number:{" "}
							</div>
							<div>{currentCardDetails["card_no"]}</div>
						</div>
						<div></div>
					</div>
				</Accordian>
			</div>
			<div className="transactions">
				<Accordian
					headerValue={
						<div style={{ display: "flex" }}>
							<TransactionsIcon style={{ marginRight: "10px" }} />
							<span>Recent Transactions </span>
						</div>
					}
					defaultExpanded={true}
				>
					{getTransactionDiv()}
				</Accordian>
			</div>
		</>
	);
}
