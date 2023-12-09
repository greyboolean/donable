import axios from 'axios';
import { SERVER_BASE_URL } from '../constants/serverConstants';
import { handleErrorAlert, showAlert } from '../utils/alert';

export const createReview = async (charityName, rating, review) => {
  try {
    const options = {
      headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
    };

    const { data: reviewData } = await axios.post(
      `${SERVER_BASE_URL}/api/v1/charities/name/${charityName}/reviews`,
      { rating, review },
      options
    );

    if (reviewData.status === 'success') {
      showAlert('success', 'Review added successfully');
      return reviewData.data.data;
    }
  } catch (err) {
    handleErrorAlert(err);
  }
};
