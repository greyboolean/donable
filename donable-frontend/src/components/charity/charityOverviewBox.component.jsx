import { FaRegCalendar, FaRegUser, FaRegStar, FaSignal } from 'react-icons/fa';

const charityOverviewIcons = {
  date: FaRegCalendar,
  category: FaSignal,
  participants: FaRegUser,
  rating: FaRegStar,
};

const CharityOverviewIcon = ({ Icon }) => {
  return <Icon className='overview-box__icon' />;
};

const CharityOverviewBox = ({ label, text, icon }) => {
  return (
    <div className='overview-box__detail'>
      <CharityOverviewIcon Icon={charityOverviewIcons[icon]} />
      <span className='overview-box__label'>{label}</span>
      <span className='overview-box__text'>{text}</span>
    </div>
  );
};

export default CharityOverviewBox;
