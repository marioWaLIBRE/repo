import React, { useEffect, useState } from "react";
// import ReactDOM from "react-dom";
import Carousel from "react-simply-carousel";
import { getTestimonialsApi } from "../../../Services/Testimonials.api";

import "./comment.css";

const CuerpoCarta = ({ texto, nombre, pais, classNameCarta }) => {
	return (
		// en props añadir styleCarta y en el div añadir style={styleCarta}
		<div className={classNameCarta ?? "subcartas__testimonials"}>
			<div className="subcartas_testimonials_grid">
				<div className="">
					<p className="text__subcartas__testimonials">{texto}</p>
				</div>
				<div className="">
					<p className="name__subcartas__testimonials">{nombre}</p>
				</div>
				<div className="">
					<p className="date__subcartas__testimonials">{pais}</p>
				</div>
			</div>
		</div>
	);
};

const Comment = ({ StartDate, UserWalletsCount, UsersCount }) => {
	const [activeSlide, setActiveSlide] = useState(0);
	const [testimonials, setTestimonials] = useState([]);

	useEffect(() => {
		getTestimonials();
	}, []);

	const getTestimonials = () => {
		getTestimonialsApi()
			.then((response) => {
				if (response.status === 200) {
					setTestimonials(response.data);
				} else {
					setTestimonials([]);
				}
			})
			.catch((e) => {
				console.log("Error: ", e.response?.data);
				if (e.response?.data.message) {
					alert(e.response?.data.message);
				}
			});
	};

	let datosTotals = [
		{
			titulo: "Start Date",
			numero: StartDate,
			img: "./Assets/Iconos/Calendar_Testimonial.svg",
		},
		{
			titulo: "Registered Users",
			numero: UsersCount,
			img: "./Assets/Iconos/User_Testimonial.svg",
		},
		{
			titulo: "Registered Wallets",
			numero: UserWalletsCount,
			img: "./Assets/Iconos/Wallet_Testimonial.svg",
		},
	];

	return (
		<section className="container__testimonials" id="testimonials">
			<div className="titulo__testimonials">
				<h1 className="editar__titulo__testimonials">TESTIMONIALS</h1>
			</div>
			{testimonials?.length > 0 ? (
				<Carousel
					containerProps={{
						className: "props_carrousel",
					}}
					activeSlideIndex={activeSlide}
					centerMode={true}
					activeSlideProps={{
						classNameCarta: "props_carrousel__active display display_column",
					}}
					onRequestChange={setActiveSlide}
					forwardBtnProps={{
						className: "forwardBtnProps_testimonials",
					}}
					backwardBtnProps={{
						className: "backwardBtnProps_testimonials",
					}}
					responsiveProps={[
						{
							minWidth: 1890,
							itemsToShow: 3,
						},
						{ maxWidth: 1879, itemsToShow: 1 },
					]}
					itemsToShow={3}
					speed={400}
				>
					{testimonials?.map((item) => {
						return (
							<CuerpoCarta
								texto={item.TestimonialsTestimonials}
								nombre={item.TestimonialsName}
								pais={item.TestimonialsCountry}
								key={item.TestimonialsId}
							></CuerpoCarta>
						);
					})}
				</Carousel>
			) : (
				<div></div>
			)}

			{/* LOGOS INFERIORES */}
			<div className="container__abajo__testi display_right">
				{datosTotals.map((item) => {
					return (
						<div className="datos__testi" key={item.titulo}>
							<div className="minicontainer_texto">
								<p className="textos__abajo__testi">{item.titulo}</p>
								<p className="numero__abajo__testi">{item.numero}</p>
							</div>
							<div className="minicontainer__img">
								<img src={item.img} alt="" className="edit__logo__testi" />
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default Comment;
