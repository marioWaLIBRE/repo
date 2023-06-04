import React, { useState, useEffect } from "react";
import About from "../../Components/ComponentHome/About/About";
import Comment from "../../Components/ComponentHome/Comments/Comment";
import Footer from "../../Components/Footer/Footer";
import Hero from "../../Components/ComponentHome/Hero/Hero";
import Invest from "../../Components/ComponentHome/Investment/Invest";
import Navbar from "../../Components/ComponentHome/Navbar/Navbar";
import { getTotals } from "../../Services/Totals.api";
import { getFAQsTutorialsApi } from "../../Services/FAQsTutorials.api";
//INICIO DE JAMAS BORRAR PROHIBIDO, EXPLOTA TODO
import Buttonback from "../../Components/ButtonBack/Buttonback";
import Buttonnext from "../../Components/ButtonNext/Buttonnext";
//FIN DE JAMAS BORRAR PROHIBIDO, EXPLOTA TODO
import { useSearchParams } from "react-router-dom";
import "./home.css";
import ModalAlertas from "../../Components/Modales/ModalAlertas/ModalAlertas";

const Home = () => {
	const [StartDate, setStartDate] = useState(0);
	const [UserWalletsCount, setUserWalletsCount] = useState(0);
	const [UsersCount, setUsersCount] = useState(0);
	const [activeAboutSlide, setActiveAboutSlide] = useState(0);
	const [homeHeroVideo, setHomeHeroVideo] = useState();
	const [homeAboutVideo, setHomeAboutVideo] = useState();

	const [searchParams, setSearchParams] = useSearchParams();

	const getFAQsTutorials = () => {
		getFAQsTutorialsApi()
			.then((response) => {
				if (response.status === 200) {
					setHomeHeroVideo(
						response.data.filter((item) => {
							return item.FAQSType === "2" && item.FAQSPage === "home_hero";
						})[0].FAQSURL
					);
					setHomeAboutVideo(
						response.data.filter((item) => {
							return item.FAQSType === "2" && item.FAQSPage === "home_about";
						})[0].FAQSURL
					);
					// setFinalArray(
					// 	response.data?.map((item) => {
					// 		return (
					// 			item.FAQSType === type && (!view || item.FAQSPage === view)
					// 		);
					// 	})
					// );
				}
			})
			.catch((e) => {
				console.log("Error: ", e.response?.data);
				if (e.response?.data.message) {
					alert(e.response?.data.message);
				}
			});
	};

	const getTotalValues = () => {
		getTotals().then((resp) => {
			setStartDate(resp.data.StartDate.split("T")[0]);
			setUserWalletsCount(resp.data.UserWalletsCount);
			setUsersCount(resp.data.UsersCount);
		});
	};

	useEffect(() => {
		getTotalValues();
		getFAQsTutorials();
		sessionStorage.setItem("validated", "false");
		const referralCodeFromUrl = searchParams.get("referralCode") ?? "";
		if (referralCodeFromUrl !== "") {
			sessionStorage.setItem("referralCode", referralCodeFromUrl);
		}
	}, []);

	return (
		<>
			<Navbar setActiveAboutSlide={setActiveAboutSlide}> </Navbar>
			<Hero
				UserWalletsCount={UserWalletsCount}
				UsersCount={UsersCount}
				homeHeroVideo={homeHeroVideo}
			></Hero>
			<About
				activeAboutSlide={activeAboutSlide}
				setActiveAboutSlide={setActiveAboutSlide}
			>
				{" "}0.
			</About>
			<Hero
				UserWalletsCount={UserWalletsCount}
				UsersCount={UsersCount}
				homeHeroVideo={homeAboutVideo}
			></Hero>
			<Invest> </Invest>
			<Comment
				StartDate={StartDate}
				UserWalletsCount={UserWalletsCount}
				UsersCount={UsersCount}
			></Comment>
			<Footer> </Footer>
			
		</>
	);
};

export default Home;
