import { useEffect, useState } from 'react';
import { setPageTitle } from '../../utils/pageHead';

const About = () => {
  useEffect(() => {
    // Set page title
    setPageTitle('Donable | About Us');
  });

  return (
    <div>
      <section className='about-section-header tcenter'>
        <h1 className='heading-primary mt-3'>About Us</h1>
        <span className='aboutLogo'>DONABLE</span>
      </section>
      <section className='about-section-description'>
        <div className='description-box'>
          <h2 className='heading-secondary'>About Donable</h2>
          <p className='description__text'>
            At Donable, we believe in the power of collective giving to make a positive impact on
            the world. Established in 2023 by the innovative minds of Group 27.5, Donable is not
            just a donation platform; it's a movement that envisions a world where kindness knows no
            bounds.
          </p>

          <h2 className='heading-secondary mt-3'>Our Mission</h2>
          <p className='tbold description__text'>Enabling Change, One Donation at a Time</p>

          <p className='description__text'>
            Our mission at Donable is to create a seamless and meaningful giving experience. We
            strive to connect generous hearts with impactful causes, fostering a community that
            believes in the potential of every contribution to bring about positive change. Whether
            it's supporting local initiatives or global campaigns, Donable is your platform to make
            a difference.
          </p>

          <h2 className='heading-secondary mt-3'>The Heart Behind Donable</h2>
          <p className='tbold description__text'>Group 27.5 - Designing a Better Future</p>

          <p className='description__text'>
            Donable was conceptualized and designed by the passionate minds of Group 27.5.
            Comprising a diverse team of visionaries, tech enthusiasts, and philanthropists, Group
            27.5 shares a common goal: to leverage technology for the greater good. Our journey
            began with the realization that technology could transform the way we give, making it
            more accessible, transparent, and impactful.
          </p>

          <h2 className='heading-secondary mt-3'>What Sets Us Apart</h2>
          <p className='tbold description__text'>Innovation, Transparency, and Community</p>

          <p className='tbold description__text'>1. Innovation</p>
          <p className='description__text'>
            Donable isn't just another donation platform; it's a pioneer in leveraging cutting-edge
            technology to enhance the giving experience. Our user-friendly interface, secure
            donation process, and innovative features ensure that your generosity is seamlessly
            translated into meaningful impact.
          </p>

          <p className='tbold description__text'>2. Transparency</p>
          <p className='description__text'>
            We understand the importance of trust in the world of online giving. That's why Donable
            is committed to complete transparency. Our platform provides real-time updates on where
            your donation goes, ensuring that you can see the tangible results of your kindness.
          </p>

          <p className='tbold description__text'>3. Community</p>
          <p className='description__text'>
            Donable is more than a platform; it's a community of like-minded individuals who believe
            in the power of compassion. Join us in building a network of generosity, where every
            member plays a crucial role in shaping a better future for all.
          </p>

          <p className='tbold description__text'>Our Impact</p>
          <p className='description__text'>Turning Donations into Real Change</p>

          <p className='description__text'>
            Every donation made through Donable contributes to a broader impact. From supporting
            education and healthcare initiatives to aiding disaster relief efforts, our platform is
            a catalyst for positive change. Explore our impact stories to see how, together, we are
            making a difference in the lives of those who need it most.
          </p>
        </div>
        <div className='description-box l-darkbg'>
          <h2 className='heading-secondary'>Our Impact</h2>
          <p className='tbold description__text'>Turning Donations into Real Change</p>

          <p className='description__text'>
            Every donation made through Donable contributes to a broader impact. From supporting
            education and healthcare initiatives to aiding disaster relief efforts, our platform is
            a catalyst for positive change. Explore our impact stories to see how, together, we are
            making a difference in the lives of those who need it most.
          </p>

          <h2 className='heading-secondary'>Join the Movement</h2>
          <p className='tbold description__text'>Your Generosity Matters</p>

          <p className='description__text'>
            Donable invites you to be a part of this revolutionary movement. Join us in redefining
            the way we give, and together, let's build a world where compassion knows no boundaries.
            Your generosity matters, and at Donable, we're here to help you make it count.
          </p>

          <h2 className='heading-secondary'>Contact Us</h2>
          <p className='tbold description__text'>Connect with Us</p>

          <p className='description__text'>
            Have questions or want to learn more about Donable? Reach out to our dedicated support
            team. We're here to assist you on your journey of giving.
          </p>

          <p className='description__text'>
            Email:{' '}
            <a href='mailto:support@donable.org' className='l-white'>
              support@donable.org
            </a>
          </p>

          <p className='description__text'>
            Phone:{' '}
            <a href='tel:+94111234567' className='l-white'>
              +94 (11) 123-4567
            </a>
          </p>

          <p className='description__text'>
            Thank you for choosing Donable - where every donation sparks a positive change.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
