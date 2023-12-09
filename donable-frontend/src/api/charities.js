import axios from 'axios';
import { SERVER_BASE_URL } from '../constants/serverConstants';

export const getAllCharities = async () => {
  try {
    const { data: charityData } = await axios.get(`${SERVER_BASE_URL}/api/v1/charities`);

    if (charityData.status === 'success') return charityData.data;
  } catch (err) {
    return false;
  }
};

export const getOneCharity = async charityName => {
  try {
    const { data: charityData } = await axios.get(`${SERVER_BASE_URL}/api/v1/charities/name/${charityName}`);

    if (charityData.status === 'success') return charityData.data;
  } catch (err) {
    return false;
  }
};

export const getDonatedCharities = async () => {
  try {
    const options = {
      headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
    };

    const { data: donationsData } = await axios.get(
      `${SERVER_BASE_URL}/api/v1/charities/my-charities`,
      options
    );

    if (donationsData.status === 'success') return donationsData.data;
  } catch (err) {
    return false;
  }
};
