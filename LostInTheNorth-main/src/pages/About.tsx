import { useEffect } from 'react';
import Swiper from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Map, DollarSign, Headphones } from 'lucide-react';

const About = () => {
  useEffect(() => {
    const swiper = new Swiper('.reviews-slider', {
      modules: [Navigation, Autoplay],
      loop: true,
      spaceBetween: 20,
      grabCursor: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      breakpoints: {
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    return () => {
      if (swiper) {
        swiper.destroy();
      }
    };
  }, []);

  return (
    <>
      <Header />

      <div className="heading" style={{ background: "url(/image/pic1.jpg) no-repeat" }}>
        <h1>about us</h1>
      </div>

      <section className="about">
        <div className="image">
          <img src="image/chooseus.jpg"  alt="" />
        </div>
        <div className="content">
          <h3>why choose us?</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non itaque, necessitatibus recusandae similique accusantium sit. Sit.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit animi nam labore.</p>
          <div className="icons-container">
            <div className="icons">
              <Map size={40} className="fas" />
              <span>top destinations</span>
            </div>
            <div className="icons">
              <DollarSign size={40} className="fas" />
              <span>affordable price</span>
            </div>
            <div className="icons">
              <Headphones size={40} className="fas" />
              <span>24/7 guide service</span>
            </div>
          </div>
        </div>
      </section>

      <section className="reviews">
        <h1 className="heading-title">clients reviews</h1>

        <div className="swiper reviews-slider">
          <div className="swiper-wrapper">
            <div className="swiper-slide slide">
              <div className="stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p>Lorem iure quaerat culpa quo facere eveniet neque provident odio, eum eligendi impedit id perferendis obcaecati nostrum.</p>
              <h3>sohaib aman</h3>
              <span>traveler</span>
              <img src="image/sohaibpic.jpg" alt="" />
            </div>

            <div className="swiper-slide slide">
              <div className="stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p>Lorem ipsum dolor sit, culpa quo facere provident odio, eum eligendi impedit id perferendis obcaecati nostrum.</p>
              <h3>javed ali</h3>
              <span>traveler</span>
              <img src="image/baltipic.jpg" alt="" />
            </div>

            <div className="swiper-slide slide">
              <div className="stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim quis eum eligendi impedit id perferendis obcaecati nostrum.</p>
              <h3>hasnain abbas</h3>
              <span>travelers</span>
              <img src="image/hasnainpic.jpg" alt="" />
            </div>

            <div className="swiper-slide slide">
              <div className="stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p>Enim quis rerum quibusdam iure quaerat culpa quo facere eveniet neque cum tenetur provident odio, eum eligendi nostrum.</p>
              <h3>mehr ali</h3>
              <span>traveler</span>
              <img src="image/mehrpic.jpg" alt="" />
            </div>

            <div className="swiper-slide slide">
              <div className="stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p>Lorem ipsum dolor sit, iet neque cum tenetur provident odio, eum eligendi impedit id perferendis obcaecati nostrum.</p>
              <h3>kashir iftekhar</h3>
              <span>traveler</span>
              <img  src="image/kashirpic.png" alt="" />
            </div>

            <div className="swiper-slide slide">
              <div className="stars">
               <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim quis rerum quibusdam iure quaerat culpa quo facere eveniet neque cum tenetur.</p>
              <h3>adeel mazhar</h3>
              <span>traveler</span>
              <img src="image/adeelpic.png" alt="" />
            </div>
          </div>

          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;