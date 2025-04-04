import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const gifList = ["/public/Unite.gif", "/public/Sorteos.gif"];

const Carrousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    height: 300,
  };

  return (
    <Slider {...settings}>
      {gifList.map((gif, index) => (
        <div key={index}>
          <img
            src={gif}
            alt={`gif-${index}`}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      ))}
    </Slider>
  );
};
export default Carrousel;
