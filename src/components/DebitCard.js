import React, { useState } from "react";
import "./DebitCard.css";
import { ReactComponent as AspireNameLogo } from "../assets/aspire_name_logo.svg";
import { ReactComponent as EyeIcon } from "../assets/eye.svg";
import { ReactComponent as VISALogo } from "../assets/VisaLogo.svg";
import AcUnitIcon from "@mui/icons-material/AcUnit";

export default function DebitCard(props) {
	const {
		cardDetails,
		userDetails,
		showCardNumberAlways = false,
		bgColor = "#01D167",
	} = props;
	const [isShowCardNumberClicked, setIsShowCardNumberClicked] =
		useState(false);

	const beautifyCardNo = (cardNo) => {
		const { cardDetails, showCardNumberAlways = false } = props;
		if (
			(isShowCardNumberClicked && !cardDetails["freeze_status"]) ||
			showCardNumberAlways
		) {
			return (
				<>
					{" "}
					<span style={{ fontSize: "small" }}>
						{cardNo.slice(0, 4) +
							" " +
							cardNo.slice(4, 8) +
							" " +
							cardNo.slice(8, 12) +
							" " +
							cardNo.slice(12, 16)}
					</span>
				</>
			);
		} else {
			return (
				<>
					<span style={{ fontSize: "x-large", marginRight: "10px" }}>
						•••• •••• ••••{" "}
					</span>{" "}
					<span style={{ fontSize: "small" }}>
						{cardNo.slice(-4)}
					</span>
				</>
			);
		}
	};

	const handleShowCardClick = () => {
		setIsShowCardNumberClicked((prev) => !prev);
	};

	const beautifyCVV = (CVV) => {
		return <span style={{ translate: "3px 3px", scale: "1.2" }}>***</span>;
	};

	const beautifyCardName = (name) => {
		if (name) {
			name = name.split(" ");
			name = name
				.map((val) => {
					if (val)
						return (
							val[0].toUpperCase() + val.slice(1).toLowerCase()
						);
				})
				.join(" ");
		}
		return name || "";
	};
	return (
		<div
			className={
				"debit_card" +
				(cardDetails["freeze_status"] ? " freezed_card" : "")
			}
			style={{
				paddingTop: showCardNumberAlways ? "20px" : "0px",
				backgroundColor: bgColor,
			}}
		>
			{!showCardNumberAlways && (
				<div
					style={{
						display: "flex",
						width: "100%",
						maxWidth: "99.5%",
					}}
				>
					<div></div>
					<button
						className="show_card_number"
						onClick={handleShowCardClick}
					>
						<EyeIcon style={{ marginRight: "5px" }} />
						Show card number
					</button>
				</div>
			)}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "start",
					margin: "0 30px 30px 30px",
					backgroundColor: bgColor,
					textAlign: "start",
				}}
				// className={cardDetails["freeze_status"] ? " freezed_card" : ""}
			>
				<div style={{ display: "flex", width: "100%" }}>
					{cardDetails["freeze_status"] && <AcUnitIcon />}
					<AspireNameLogo style={{ marginLeft: "auto" }} />
				</div>
				<div style={{ fontWeight: "bold", fontSize: "130%" }}>
					{beautifyCardName(cardDetails.card_name)}{" "}
				</div>
				<div style={{ letterSpacing: "3px", display: "flex" }}>
					{beautifyCardNo(cardDetails.card_no)}
				</div>
				<div
					style={{
						display: "flex",
						// justifyContent: "space-evenly",
						fontSize: "80%",
						letterSpacing: "2px",
					}}
				>
					<div>Thru: {cardDetails.expiry}</div>
					<div style={{ marginLeft: "5vw", display: "flex" }}>
						CVV: {beautifyCVV(cardDetails.cvv)}
					</div>
					<div
						style={{
							marginLeft: "auto",
							transform: "translateY(80%)",
						}}
					>
						<VISALogo />
					</div>
				</div>
			</div>
			<div style={{ height: "2vh" }}></div>
		</div>
	);
}
