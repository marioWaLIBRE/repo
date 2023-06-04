// import React, { useState } from "react";
import "./about.css";
import Carousel from "react-simply-carousel";
import { useEffect, useState } from "react";
import { datosAbout } from "../../../Share/Constants";

const CuerpoCartaAbout = ({ title, image, text }) => {
	return (
		// en props añadir styleCarta y en el div añadir style={styleCarta}
		<div className="subcartas_about">
			<div className="subcartas_about_grid">
				<div className="subcartas_about_title_container display">
					<p className="subcartas_about_title">{title}</p>
				</div>
				<div className="subcartas_about_img_container display">
					<img className="subcartas_about_img" src={image}></img>
				</div>
				<div className="subcartas_about_text_container display">
					<p className="subcartas_about_text">{text}</p>
				</div>
			</div>
		</div>
	);
};

const About = ({ activeAboutSlide, setActiveAboutSlide }) => {
	const [activeAboutSlideChild, setActiveAboutSlideChild] =
		useState(0);

	useEffect(() => {
		setActiveAboutSlideChild(activeAboutSlide);
	}, [activeAboutSlide]);

	return (
		<section id="about">
			<Carousel
				containerProps={{
					className: "carrousel_about_container display",
				}}
				activeSlideIndex={activeAboutSlideChild}
				centerMode={true}
				onRequestChange={setActiveAboutSlide}
				forwardBtnProps={{
					className: "forwardBtnProps_about",
				}}
				backwardBtnProps={{
					className: "backwardBtnProps_about",
				}}
				dotsNav={{
					className: "dotsnav_about_carousel",
					show: true,
					itemBtnProps: {
						style: {
							height: 15,
							width: 15,
							borderRadius: "50%",
							border: 0,
							background: "#f4e478",
							marginTop: 20,
							marginRight: 20,
							marginBottom: 20,
						},
					},
					activeItemBtnProps: {
						style: {
							height: 15,
							width: 15,
							borderRadius: "50%",
							border: 0,
							background: "#234432",
							marginTop: 20,
							marginRight: 20,
							marginBottom: 20,
						},
					},
				}}
				itemsToShow={1}
				speed={400}
			>
				{datosAbout?.map((item) => {
					return (
						<CuerpoCartaAbout
							title={item.title}
							image={item.image}
							text={item.text}
							key={item.title}
						></CuerpoCartaAbout>
					);
				})}
				{/* </div>
				</div> */}
			</Carousel>
		</section>
	);
};

export default About;
