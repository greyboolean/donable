import { useState } from 'react';
import { Link } from 'react-router-dom';
import { donateCharity } from '../../api/stripe';
import { SERVER_BASE_URL } from '../../constants/serverConstants';
import User from '../../context/userContext';

const Cta = ({ charityImages, charityId }) => {
  const [creatingCheckout, setCreatingCheckout] = useState(false);

  const { isUserLoggedIn } = User();

  const fundCharity = async e => {
    setCreatingCheckout(true);
    const charityId = e.target.dataset.charityId;

    const sessionUrl = await donateCharity(charityId);

    setCreatingCheckout(false);
    if (sessionUrl) window.open(sessionUrl, '_blank');
  };

  return (
    <section className='section-cta'>
      <div className='cta'>
        <div className='cta__img cta__img--logo'>
          <img src={`${SERVER_BASE_URL}/img/logo-white.png`} alt='Donable logo' />
        </div>
        <img
          className='cta__img cta__img--1'
          src={`${SERVER_BASE_URL}/img/charities/${charityImages[0]}`}
          alt='Charity picture'
        />
        <img
          className='cta__img cta__img--2'
          src={`${SERVER_BASE_URL}/img/charities/${charityImages[1]}`}
          alt='Charity picture'
        />
        <div className='cta__content'>
          <h2 className='heading-secondary'>What are you waiting for?</h2>
          <p className='cta__text'>Join us. Make an impact. Change lives. Be a part of it today!</p>
          {isUserLoggedIn === true ? (
            <button
              className='btn btn--green span-all-rows'
              data-charity-id={charityId}
              onClick={fundCharity}>
              {creatingCheckout === true ? 'Processing...' : 'Donate to charity now!'}
            </button>
          ) : (
            <Link className='btn btn--green span-all-rows' to='/login'>
              Log in to donate to charity
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Cta;
