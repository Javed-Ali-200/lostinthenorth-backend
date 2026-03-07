import { NavLink } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, ChevronRight } from 'lucide-react';

const Footer = () => {
  return (
    <section className="footer">
      <div className="box-container">
        <div className="box">
          <h3>quick links</h3>
          <NavLink to="/"><ChevronRight size={16} className="fas fa-angle-right   " />home</NavLink>
          <NavLink to="/about"><ChevronRight size={16} className="fas fa-angle-right" />about</NavLink>
          <NavLink to="/package"><ChevronRight size={16} className="fas fa-angle-right" />package</NavLink>
          <NavLink to="/book"><ChevronRight size={16} className="fas fa-angle-right" />book</NavLink>
        </div>


        <div className="box">
          <h3>contact info</h3>
          <a href="#"><Phone size={16} className="fas " /> +923456789</a>
          <a href="#"><Phone size={16} className="fas" /> +92348238434</a>
          <a href="#"><Mail size={16} className="fas" /> jdncdj@gmail.com</a>
          <a href="#"><MapPin size={16} className="fas" /> Multan,Pakistan</a>
        </div>

        <div className="box">
          <h3>follow us</h3>
          <a href="#"><Facebook size={16} className="fab" /> facebook</a>
          <a href="#"><Twitter size={16} className="fab" /> twitter</a>
          <a href="#"><Instagram size={16} className="fab" /> instagram</a>
          <a href="#"><Linkedin size={16} className="fab" /> linkedin</a>
        </div>
      </div>

      <div className="credit">created by <span>LostInTheNorth</span> | all rights reserved!</div>
    </section>
  );
};

export default Footer;