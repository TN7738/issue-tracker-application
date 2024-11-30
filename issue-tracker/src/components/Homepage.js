import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Homepage = () => {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 1,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    return (
        <div className="slider-wrap">
            <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                showDots={true}
            >
                <div>
                    <img
                        src="https://www.shutterstock.com/shutterstock/photos/1025080504/display_1500/stock-photo-conceptual-business-illustration-with-the-words-issue-tracking-system-1025080504.jpg"
                        alt="Slider"
                    />
                </div>
                <div>
                    <img
                        src="https://storage.googleapis.com/cdn-website-bolddesk/2023/09/965f50d8-750_400@2x.png"
                        alt="Slider"
                    />
                </div>
                <div>
                    <img
                        src="https://pmstudycircle.com/wp-content/uploads/2022/11/Issue-tracking-software.png.webp"
                        alt="Slider"
                    />
                </div>
            </Carousel>
        </div>
    );
};

export default Homepage;
