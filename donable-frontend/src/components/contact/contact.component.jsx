
import { useEffect, useState } from "react";
import { setPageTitle } from "../../utils/pageHead";

const Contact = () => {
  useEffect(() => {
      // Set page title
      setPageTitle("Donable | Contact Us");
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div>
      <section className="section-description">
        <div className="overview-box">
            <div>
                <h1 className="heading-primary">Get in touch with us</h1>
                <div className="contact-bar">
                    <p className="disc_text">Email: <a href="mailto:support@donable.org" className="l-white">support@donable.org</a></p>
                    <p className="disc_text">Phone: <a href="tel:+94111234567" className="l-white">+94 (11) 123-4567</a></p>
                </div>
            </div>
        </div>
        <div className="description-box">
            <h2 className="heading-secondary">Contact</h2>
            <form onSubmit={handleSubmit} className="contact-form">
                <table className="w-100">
                <tbody>
                    <tr>
                    <td>
                        <label htmlFor="name" className="description__text">Name:</label>
                    </td>
                    <td>
                        <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        />
                    </td>
                    </tr>
                    <tr>
                    <td>
                        <label htmlFor="email" className="description__text">Email: </label>
                    </td>
                    <td>
                        <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        />
                    </td>
                    </tr>
                    <tr>
                    <td>
                        <label htmlFor="message" className="description__text">Message:</label>
                    </td>
                    <td>
                        <textarea
                        id="message"
                        name="message"
                        className="form-control"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        ></textarea>
                    </td>
                    </tr>
                    <tr>
                    <td colSpan="2">
                        <button type="submit" className="lsubmit_btn">Submit</button>
                    </td>
                    </tr>
                </tbody>
                </table>
            </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
