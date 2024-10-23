import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import { temoignages } from "../Data";

function NextArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 z-40"
    >
      <FaChevronRight size={20} />
    </button>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 z-40"
    >
      <FaChevronLeft size={20} />
    </button>
  );
}

export default function SectionTemoignages() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-500 mb-12">
          Témoignages de nos Utilisateurs
        </h2>
        <div className="px-5 overflow-hidden">
          <Slider {...settings}>
            {temoignages.map((item, index) => (
              <div key={index} className="p-4">
                <div className=" shadow-lg rounded-lg p-8 text-center">
                  <img
                    src={item.avatar}
                    alt={item.nom}
                    className="w-20 h-20 mx-auto rounded-full mb-4"
                  />
                  <p className="text-xl font-semibold text-gray-800 mb-2">
                    {item.nom}
                  </p>
                  <div className="flex justify-center mb-4">
                    {Array(item.note)
                      .fill(0)
                      .map((_, i) => (
                        <FaStar key={i} className="text-yellow-400 text-xl" />
                      ))}
                  </div>
                  <p className="text-gray-600">{item.texte}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
