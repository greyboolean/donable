import { useState, useEffect } from 'react';
import { getAllCharities } from '../../api/charities';
import { setPageTitle } from '../../utils/pageHead';
import Skeleton from '../skeleton/skeleton.component';
import CharityCard from './charityCard.component';
import CharitiesOverview from './charitiesOverview.component';

const AllCharities = () => {
  const [allCharities, setAllCharities] = useState([]);
  const [loadingCharities, setLoadingCharities] = useState(true);

  useEffect(() => {
    // Set page title
    setPageTitle('Donable | All Charities');

    // Get all charities
    (async () => {
      const charities = await getAllCharities();

      setTimeout(() => setLoadingCharities(false), 1000);
      if (charities) setAllCharities(charities.data);
    })();
  }, []);

  return (
    <CharitiesOverview>
      {loadingCharities === true ? (
        <Skeleton totalSkeletons={3} height='50rem' />
      ) : (
        allCharities.map(charity => <CharityCard key={charity.id} charityData={charity} />)
      )}
    </CharitiesOverview>
  );
};

export default AllCharities;
