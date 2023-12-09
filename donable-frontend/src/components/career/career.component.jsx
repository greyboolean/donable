import { useEffect, useState } from "react";
import { setPageTitle } from "../../utils/pageHead";
const ContactUs = () => {
  useEffect(() => {
    // Set page title

    setPageTitle("Donable | Career");
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    cv: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "cv") {
      setFormData((prevData) => ({
        ...prevData,

        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,

        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataForSubmit = new FormData();
    formDataForSubmit.append("name", formData.name);
    formDataForSubmit.append("email", formData.email);
    formDataForSubmit.append("contact", formData.contact);
    formDataForSubmit.append("cv", formData.cv);
    console.log("Form submitted:", formDataForSubmit);
    setFormData({
      name: "",
      email: "",
      contact: "",
      cv: null,
    });
  };

  return (
    <div>
      <section className="section-description">
        <div className="overview-box">
          <div>
            <h1 className="heading-primary">Join With Donable</h1>

            <p className="disc_text">
              At Donable, we believe that a career should be more than just a
              job; it should be a purposeful journey where every day brings the
              opportunity to make a positive impact. As a member of our Donable
              Careers team, you'll be at the forefront of revolutionizing the
              way people give back. We are dedicated to creating a culture that
              fosters innovation, collaboration, and a shared commitment to
              making a difference in the world. Whether you're passionate about
              technology, marketing, customer service, or operations, there's a
              place for you at Donable. Join us in building a future where
              careers are not just about success but also about contributing to
              a meaningful cause. Explore our current openings and be part of a
              team that is shaping the future of giving. Your career with
              Donable is not just a job; it's a purpose-driven adventure where
              your skills meet impact.
            </p>
          </div>
        </div>

        <div className="description-box">
          <h2 className="heading-secondary">Career</h2>

          <form onSubmit={handleSubmit} className="contact-form">
            <table className="w-100">
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="name" className="description__text">
                      Your Name:
                    </label>
                  </td>

                  <td>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      className="career-form-control"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <label htmlFor="email" className="description__text">
                      Yout Email:
                    </label>
                  </td>

                  <td>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      className="career-form-control"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <label htmlFor="contact" className="description__text">
                      Your contact:
                    </label>
                  </td>

                  <td>
                    <input
                      id="contact"
                      name="contact"
                      placeholder="+94 xx xxx xxxx"
                      className="career-form-control"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></input>
                  </td>
                </tr>

                <tr>
                  <td>
                    <label htmlFor="cv" className="description__text">
                      Upload your cv:
                    </label>
                  </td>

                  <td>
                    <input
                      type="file"
                      id="cv"
                      name="cv"
                      className="btn-outline-light"
                      onChange={handleChange}
                      accept=".pdf, .doc, .docx"
                      required
                    />
                  </td>
                </tr>

                <tr>
                  <td colSpan="2">
                    <button type="submit" className="lsubmit_btn">
                      Submit
                    </button>
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

export default ContactUs;