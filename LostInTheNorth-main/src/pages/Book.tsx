import { useState, FormEvent } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  location: string;
  guests: string;
  arrivals: string;
  leaving: string;
}

const Book = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    location: '',
    guests: '',
    arrivals: '',
    leaving: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // In a real application, you would send this data to a server
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        location: '',
        guests: '',
        arrivals: '',
        leaving: ''
      });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <>
      <Header />

      <div className="heading" style={{ background: "url(https://images.pexels.com/photos/5764100/pexels-photo-5764100.jpeg) no-repeat" }}>
        <h1>book now</h1>
      </div>

      <section className="booking">
        <h1 className="heading-title">book your trip!</h1>

        {isSubmitted ? (
          <div className="book-form" style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--main-color)' }}>Thank you for booking!</h3>
            <p style={{ fontSize: '1.5rem', marginTop: '1rem' }}>Your booking has been submitted successfully.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="book-form">
            <div className="flex">
              <div className="inputBox">
                <span>name :</span>
                <input 
                  type="text" 
                  placeholder="enter your name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="inputBox">
                <span>email :</span>
                <input 
                  type="email" 
                  placeholder="enter your email" 
                  name="email"
                  value={formData.email} 
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="inputBox">
                <span>phone :</span>
                <input 
                  type="text" 
                  placeholder="enter your number" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="inputBox">
                <span>address :</span>
                <input 
                  type="text" 
                  placeholder="enter your address" 
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="inputBox">
                <span>where to :</span>
                <input 
                  type="text" 
                  placeholder="place you want to visit" 
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="inputBox">
                <span>how many :</span>
                <input 
                  type="number" 
                  placeholder="number of guests" 
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="inputBox">
                <span>arrivals :</span>
                <input 
                  type="date" 
                  name="arrivals"
                  value={formData.arrivals}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="inputBox">
                <span>leaving :</span>
                <input 
                  type="date" 
                  name="leaving"
                  value={formData.leaving}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <input type="submit" value="submit" className="btn" />
          </form>
        )}
      </section>

      <Footer />
    </>
  );
};

export default Book;