import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Package = () => {
  const [showAll, setShowAll] = useState(false);

  const handleLoadMore = () => {
    setShowAll(!showAll);
  };

  const packages = [
    {
      id: 1,
      image: "/image/pic10.jpg ",
      title: "adventure and tour",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, perspiciatis!"
    },
    {
      id: 2,
       image: "/image/pic9.jpg ",
      title: "adventure and tour",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, perspiciatis!"
    },
    {
      id: 3,
       image: "/image/pic7.jpg ",
      title: "adventure and tour",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, perspiciatis!"
    },
    {
      id: 4,
       image: "/image/pic6.jpg ",
    itle: "adventure and tour",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, perspiciatis!"
    },
    {
      id: 5,
       image: "/image/pic4.jpg ",
    title: "adventure and tour",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, perspiciatis!"
    },
    {
      id: 6,
       image: "/image/pic3.jpg ",
     title: "adventure and tour",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, perspiciatis!"
    },
    {
      id: 7,
       image: "/image/pic2.jpg ",
      title: "adventure and tour",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, perspiciatis!"
    },
    {
      id: 8,
       image: "/image/pic11.jpg ",
     title: "adventure and tour",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, perspiciatis!"
    },
    {
      id: 9,
       image: "/image/pic1.jpg ",
     title: "adventure and tour",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, perspiciatis!"
    },

    {
      id: 10,
       image: "/image/pic5.jpg ",
     title: "adventure and tour",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, perspiciatis!"
    },
    {
      id: 11,
       image: "/image/pic8.jpg ",
     title: "adventure and tour",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, perspiciatis!"
    },
    {
      id: 12,
       image: "/image/pic12.jpg ",
      title: "adventure and tour",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, perspiciatis!"
    }
  ];

  return (
    <>
      <Header />

      <div className="heading had" style={{ background: "url(/image/pic2.jpg) no-repeat" }}>
        <h1>packages</h1>
      </div>

      <section className="packages">
        <h1 className="heading-title">top destinations</h1>

        <div className="box-container">
          {packages.slice(0, showAll ? packages.length : 6).map(pkg => (
            <div key={pkg.id} className="box">
              <div className="image">
                <img src={pkg.image} alt="" />
              </div>
              <div className="content">
                <h3>{pkg.title}</h3>
                <p>{pkg.description}</p>
                <NavLink to="/book" className="btn">book now</NavLink>
              </div>
            </div>
          ))}
        </div>

        <div className="load-more">
          <button onClick={handleLoadMore} className="btn">
            {showAll ? "show less" : "load more"}
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Package;