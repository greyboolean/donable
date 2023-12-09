import { useState } from 'react';
import FormGroup from '../formGroup/formGroup.component';
import { createReview } from '../../api/reviews';

const Review = ({ charityName }) => {
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');

  const handleCreateReview = async e => {
    e.preventDefault();

    const res = await createReview(charityName, rating, review);
    if (res) {
      history.go(0);
    }
  };

  return (
    <div className='review-wrapper'>
      <div className='review-form'>
        <h2 className='heading-secondary ma-bt-lg'>Add Review</h2>
        <form className='form form--review' onSubmit={handleCreateReview}>
          <FormGroup
            label='Rating'
            id='rating'
            type='number'
            min='1'
            max='5'
            placeholder='From 1 star to 5 stars'
            required
            onChange={e => setRating(e.target.value)}
          />
          <div className='form__group ma-bt-md'>
            <label className='form__label' htmlFor='review'>
              Review
            </label>
            <textarea
              className='form__input'
              id='review'
              placeholder='Add your review here'
              rows='10'
              cols='30'
              required
              onChange={e => setReview(e.target.value)}></textarea>
          </div>

          <div className='form__group'>
            <button className='btn btn--green'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Review;
