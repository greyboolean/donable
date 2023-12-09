import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaRegClock, FaMapMarkerAlt } from 'react-icons/fa';
import { getOneCharity } from '../../api/charities';
import CharityOverviewBox from './charityOverviewBox.component';
import CharityReviewCard from './charityReviewCard.component';
import CharityMap from '../map/charityMap.component';
import CharityCta from './charityCta.component';
import CharityAddReview from './charityAddReview.component';
import { SERVER_BASE_URL } from '../../constants/serverConstants';
import { setPageTitle } from '../../utils/pageHead';

const SingleCharity = () => {
  const { charity: charityName } = useParams();
  const [charity, setCharity] = useState({});

  useEffect(() => {
    (async () => {
      const charityData = await getOneCharity(charityName);

      if (charityData) {
        setCharity(charityData.data);
        setPageTitle(`Donable | ${charityData.data.name}`);
      }
    })();
  }, []);

  const charityDate = charity.startDate
    ? new Date(charity.startDate).toLocaleString('en-us', { month: 'long', year: 'numeric' })
    : '';

  // There is no change in the data
  // Thus, the whole html is put in the same file

  if (Object.keys(charity).length === 0) {
    return <></>;
  }

  return (
    <>
      <section className='section-header'>
        <div className='header__hero'>
          <div className='header__hero-overlay'>&nbsp;</div>
          <img
            className='header__hero-img'
            src={`${SERVER_BASE_URL}/img/charities/${charity.imageCover}`}
            alt={`${charity.name}`}
          />
        </div>
        <div className='heading-box'>
          <h1 className='heading-primary'>
            <span>{charity.name} Charity</span>
          </h1>
          <div className='heading-box__group'>
            <div className='heading-box__detail'>
              <FaMapMarkerAlt className='heading-box__icon' />
              <span className='heading-box__text'>{charity.region}</span>
            </div>
          </div>
        </div>
      </section>

      <section className='section-description'>
        <div className='overview-box'>
          <div>
            <div className='overview-box__group'>
              <h2 className='heading-secondary ma-bt-lg'>Quick facts</h2>
              <CharityOverviewBox label='Start Date' text={charityDate} icon='date' />
              <CharityOverviewBox label='Category' text={charity.category} icon='category' />
              <CharityOverviewBox
                label='Participants'
                text={`${charity.numPeople} people`}
                icon='participants'
              />
              <CharityOverviewBox
                label='Rating'
                text={`${charity.ratingsAverage} / 5`}
                icon='rating'
              />
            </div>
            <div className='overview-box__group'>
              <h2 className='heading-secondary ma-bt-lg'>Your charity organizers</h2>
              {charity.organizers.map(organizer => (
                <div className='overview-box__detail' key={organizer._id}>
                  <img
                    className='overview-box__img'
                    src={`${SERVER_BASE_URL}/img/users/${organizer.photo}`}
                    alt={organizer.name}
                  />
                  <span className='overview-box__label'>
                    {organizer.role === 'lead-organizer' ? 'Lead Organizer' : 'Organizer'}
                  </span>
                  <span className='overview-box__text'>{organizer.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='description-box'>
          <h2 className='heading-secondary ma-bt-lg'>About {charity.name} charity</h2>
          {charity.description.split('\n').map((paragraph, i) => (
            <p className='description__text' key={i}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className='section-pictures'>
        {charity.images.map((picture, i) => (
          <div className='picture-box' key={i}>
            <img
              src={`${SERVER_BASE_URL}/img/charities/${picture}`}
              alt={`${charity.name} ${i + 1}`}
              className={`picture-box__img picture-box__img--${i + 1}`}
            />
          </div>
        ))}
      </section>

      <section className='section-map'>
        <CharityMap locationData={charity.locations} mapId={'map'} />
      </section>

      <section className='section-reviews'>
        <div className='reviews'>
          {charity.reviews.map(review => (
            <CharityReviewCard review={review} key={review._id} />
          ))}
        </div>
      </section>

      <CharityCta charityImages={charity.images} charityId={charity.id} />
      <CharityAddReview charityName={charity.slug}/>
    </>
  );
};

export default SingleCharity;
