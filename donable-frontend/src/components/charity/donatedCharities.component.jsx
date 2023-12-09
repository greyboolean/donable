import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getDonatedCharities } from '../../api/charities';
import { setPageTitle } from '../../utils/pageHead';
import { getQueryParam } from '../../utils/url';
import { showAlert } from '../../utils/alert';
import Skeleton from '../skeleton/skeleton.component';
import CharityCard from './charityCard.component';
import CharitiesOverview from './charitiesOverview.component';

const DonatedCharities = () => {
  const [allDonations, setAllDonations] = useState([]);
  const [loadingCharities, setLoadingCharities] = useState(true);
  const { search } = useLocation();

  useEffect(() => {
    const donatedCharity = getQueryParam(search, 'donation');
    if (donatedCharity) showAlert('success', 'Donated to Charity successfully');

    (async () => {
      const donatedCharities = await getDonatedCharities();

      setTimeout(() => setLoadingCharities(false), 1000);
      if (donatedCharities) setAllDonations(donatedCharities);
    })();
  }, []);

  useEffect(() => setPageTitle('Donable | My Donations'), []);

  return (
    <CharitiesOverview>
      {loadingCharities === true ? (
        <Skeleton totalSkeletons={3} height='50rem' />
      ) : (
        allDonations.map(charity => <CharityCard key={charity.id} charityData={charity} />)
      )}
    </CharitiesOverview>
  );
};

export default DonatedCharities;
