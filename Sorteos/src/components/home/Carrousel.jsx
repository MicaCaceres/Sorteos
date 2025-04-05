import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const gifList = ["Unite.gif", "Sorteos.gif"];

const Carrousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div style={{ maxWidth: "100%", width: "100%", margin: "0 auto" }}>
      <Slider {...settings}>
        {gifList.map((gif, index) => (
          <div key={index}>
            <img
              src={gif}
              alt={`gif-${index}`}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "600px",
                objectFit: "contain",
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carrousel;
