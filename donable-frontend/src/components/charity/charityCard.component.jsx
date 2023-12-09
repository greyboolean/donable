import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaRegCalendar, FaRegFlag, FaRegUser } from 'react-icons/fa';
import { SERVER_BASE_URL } from '../../constants/serverConstants';

const CharityCard = ({ charityData }) => {
  // Define the animation variants
  const variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    // <div className='card'>
    //   <div className='card__header'>
    //     <div className='card__picture'>
    //       <div className='card__picture-overlay'>&nbsp;</div>
    //       <img
    //         className='card__picture-img'
    //         src={`${SERVER_BASE_URL}/img/charities/${charityData.imageCover}`}
    //         alt={charityData.name}
    //       />
    //     </div>
    //     <h3 className='heading-tertirary'>
    //       <span>{charityData.name}</span>
    //     </h3>
    //   </div>
    //   <div className='card__details'>
    //     <h4 className='card__sub-heading'>{`${charityData.category}`}</h4>
    //     <p className='card__text'>{charityData.summary}</p>
    //     <div className='card__data'>
    //       <FaMapMarkerAlt className='card__icon' />
    //       <span>{charityData.region}</span>
    //     </div>
    //     <div className='card__data'>
    //       <FaRegCalendar className='card__icon' />
    //       <span>
    //         {new Date(charityData.startDate).toLocaleString('en-us', {
    //           month: 'long',
    //           year: 'numeric',
    //         })}
    //       </span>
    //     </div>
    //     <div className='card__data'>
    //       <FaRegFlag className='card__icon' />
    //       <span>{charityData.locations.length} locations</span>
    //     </div>
    //     <div className='card__data'>
    //       <FaRegUser className='card__icon' />
    //       <span>{charityData.numPeople} people</span>
    //     </div>
    //   </div>
    //   <div className='card__footer'>
    //     <p>
    //       <span className='card__footer-value'>Rs {charityData.donationAmount}</span>{' '}
    //       <span className='card__footer-text'>min donation</span>
    //     </p>
    //     <p className='card__ratings'>
    //       <span className='card__footer-value'>{charityData.ratingsAverage}</span>{' '}
    //       <span className='card__footer-text'>ratings ({charityData.ratingsQuantity})</span>
    //     </p>
    //     <Link className='btn btn--green btn--small' to={`/charity/${charityData.slug}`}>
    //       Details
    //     </Link>
    //   </div>
    // </div>
    <motion.div variants={variants} initial='hidden' animate='show'>
      <div className='card'>
        <div className='card__header'>
          <div className='card__picture'>
            <div className='card__picture-overlay'>&nbsp;</div>
            <img
              className='card__picture-img'
              src={`${SERVER_BASE_URL}/img/charities/${charityData.imageCover}`}
              alt={charityData.name}
            />
          </div>
          <h3 className='heading-tertirary'>
            <span>{charityData.name}</span>
          </h3>
        </div>
        <div className='card__details'>
          <h4 className='card__sub-heading'>{`${charityData.category}`}</h4>
          <p className='card__text'>{charityData.summary}</p>
          <div className='card__data'>
            <FaMapMarkerAlt className='card__icon' />
            <span>{charityData.region}</span>
          </div>
          <div className='card__data'>
            <FaRegCalendar className='card__icon' />
            <span>
              {new Date(charityData.startDate).toLocaleString('en-us', {
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
          <div className='card__data'>
            <FaRegFlag className='card__icon' />
            <span>{charityData.locations.length} locations</span>
          </div>
          <div className='card__data'>
            <FaRegUser className='card__icon' />
            <span>{charityData.numPeople} people</span>
          </div>
        </div>
        <div className='card__footer'>
          <p>
            <span className='card__footer-value'>Rs {charityData.donationAmount}</span>{' '}
            <span className='card__footer-text'>min donation</span>
          </p>
          <p className='card__ratings'>
            <span className='card__footer-value'>{charityData.ratingsAverage}</span>{' '}
            <span className='card__footer-text'>ratings ({charityData.ratingsQuantity})</span>
          </p>
          <Link className='btn btn--green btn--small' to={`/charity/${charityData.slug}`}>
            Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CharityCard;
