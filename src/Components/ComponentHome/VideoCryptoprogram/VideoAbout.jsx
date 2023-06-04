import React from "react";
import "./videos.css";

const VideoAbout = ({ homeAboutVideo }) => {
	return (
		<section className="videos_home_containers background_gradient_about">
			<div className="margin_top_video_home">
				<video
					src={homeAboutVideo}
					className="format_video_container_son"
					controls
				></video>
			</div>
		</section>
	);
};

export default VideoAbout;
