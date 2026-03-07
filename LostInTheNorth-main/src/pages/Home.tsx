import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Swiper from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  useEffect(() => {
    const swiper = new Swiper('.home-slider', {
      modules: [Navigation, Autoplay],
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      on: {
        slideChangeTransitionStart: function () {
          document.querySelectorAll('.home .slide .content').forEach(slide => {
            slide.classList.remove('active');
          });
        },
        slideChangeTransitionEnd: function () {
          const activeSlide = document.querySelector('.swiper-slide-active .content');
          if (activeSlide) {
            activeSlide.classList.add('active');
          }
        },
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

      <section className="home">
        <div className="swiper home-slider">
          <div className="swiper-wrapper">
            <div className="swiper-slide bg4 slide " 
                 style={{ background: "url(/image/pic4.jpg) " }}>
              <div className="content">
                <span>explore, discover, travel</span>
                <h3>travel around the world</h3>
                <NavLink to="/package" className="btn">discover more</NavLink>
              </div>
            </div>

            <div className="swiper-slide bg2 slide" 
                 style={{ background: "url(/image/pic1.jpg) no-repeat" }}>
              <div className="content">
                <span>explore, discover, travel</span>
                <h3>discover the new places</h3>
                <NavLink to="/package" className="btn">discover more</NavLink>
              </div>
            </div>

            <div className="swiper-slide  bg3 slide" 
                 style={{ background: "url(/image/pic3.jpg) no-repeat" }}>
              <div className="content">
                <span>explore, discover, travel</span>
                <h3>make your tour worthwhile</h3>
                <NavLink to="/package" className="btn">discover more</NavLink>
              </div>
            </div>
          </div>

          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </div>
      </section>

      <section className="services">
        <h1 className="heading-title">our services</h1>
        
        <div className="box-container">
          <div className="box">
            <img src="/image/adventure.png" alt="" />
            <h3>adventure</h3>
          </div>

          <div className="box">
            <img src="/image/tour_guide.png" alt="" />
            <h3>tour guide</h3>
          </div>

          <div className="box">
            <img src="/image/trekking.png" alt="" />
            <h3>trekking</h3>
          </div>

          <div className="box">
            <img src="/image/campfire.png" alt="" />
            <h3>camp fire</h3>
          </div>

          <div className="box">
            <img src="/image/offroad.png" alt="" />
            <h3>off road</h3>
          </div>

          <div className="box">
            <img src="/image/camping.png" alt="" />
            <h3>camping</h3>
          </div>
        </div>
      </section>

      <section className="home-about">
        <div className="image">
          <img src="/image/aboutus1.jpg" alt="aboutus pic" />
        </div>
        <div className="content">
          <h3>about us</h3>
          <p>This website is created for the purpose of travelling. here you can able to book your tickets to all over the world. All information about the beautiful places all over the precious world. contact us to book your place at the best place.</p>
          <NavLink to="/about" className="btn">read more</NavLink>
        </div>
      </section>

      <section className="home-packages">
        <h1 className="heading-title">our packages</h1>
        <div className="box-container">
          <div className="box">
            <div className="image">
              <img src="/image/pic10.jpg" alt="" />
            </div>
            <div className="content">
              <h3>adventure & tour</h3>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
              <NavLink to="/book" className="btn">book now</NavLink>
            </div>
          </div>

          <div className="box">
            <div className="image">
              <img src="/image/pic8.jpg" alt="" />
            </div>
            <div className="content">
              <h3>adventure & tour</h3>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
              <NavLink to="/book" className="btn">book now</NavLink>
            </div>
          </div>

          <div className="box">
            <div className="image">
              <img src="/image/pic5.jpg" alt="" />
            </div>
            <div className="content">
              <h3>adventure & tour</h3>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
              <NavLink to="/book" className="btn">book now</NavLink>
            </div>
          </div>
        </div>

        <div className="load-more">
          <NavLink to="/package" className="btn">load more</NavLink>
        </div>
      </section>

      <section className="home-offer">
        <div className="content">
          <h3>upto 50% discount</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus amet provident iure! Consectetur voluptatibus cumque necessitatibus ad, hic nisi exercitationem deserunt.</p>
          <NavLink to="/book" className="btn">book now</NavLink>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;