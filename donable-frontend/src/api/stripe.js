import axios from 'axios';
import { SERVER_BASE_URL } from '../constants/serverConstants';
import { handleErrorAlert } from '../utils/alert';

export const donateCharity = async charityId => {
  try {
    const options = {
      headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
    };
    const { data } = await axios.get(
      `${SERVER_BASE_URL}/api/v1/donations/checkout-session/${charityId}`, options
    );

    if (data.status === 'success') {
      return data.sessionUrl;
    }

    throw new Error('Something went very wrong!');
  } catch (err) {
    handleErrorAlert(err);
  }
};
