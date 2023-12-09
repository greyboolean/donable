import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import User from '../../context/userContext';
import Review from '../review/review.component';

const Cta = ({ charityName }) => {
  const [showReview, setShowReview] = useState(false);
  const reviewButtonRef = useRef();
  const closeButtonRef = useRef();

  const { isUserLoggedIn } = User();

  const handleOpen = () => {
    setShowReview(true);
    reviewButtonRef.current.blur();
  };

  const handleClose = () => {
    setShowReview(false);
    closeButtonRef.current.blur();
  };

  const variants = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0 },
    close: { opacity: 0, y: -20 },
  };

  return (
    <section className='section-createreview'>
      <div className='createreview'>
        <div className='createreview__content'>
          <h2 className='heading-secondary'>What are your thoughts?</h2>
          <p className='createreview__text'>Review and spread the word about us!</p>
          {isUserLoggedIn === true ? (
            showReview ? (
              <button
                ref={closeButtonRef}
                className='btn btn--green span-all-rows'
                onClick={handleClose}>
                Close
              </button>
            ) : (
              <button
                ref={reviewButtonRef}
                className='btn btn--green span-all-rows'
                onClick={handleOpen}>
                Review charity now!
              </button>
            )
          ) : (
            <Link className='btn btn--green span-all-rows' to='/login'>
              Log in to review this charity
            </Link>
          )}
        </div>
        {showReview && (
          <motion.div initial='hidden' animate='show' exit='close' variants={variants}>
            <Review charityName={charityName} />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Cta;
