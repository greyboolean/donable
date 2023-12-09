import { useEffect } from 'react';
import User from '../../context/userContext';
import { setPageTitle } from '../../utils/pageHead';
import SideNavItem from '../sideNavItem/sideNavItem.component';
import UserAccountSettings from './userAccountSettings.component';
import UserPasswordUpdate from './userPasswordUpdate.component';

const UserProfile = () => {
  const { userInfo } = User();

  useEffect(() => setPageTitle('Donable | Profile'), []);

  return (
    <main className='main'>
      <div className='user-view'>
        <nav className='user-view__menu'>
          <ul className='side-nav'>
            <SideNavItem link='#' text='Settings' icon='settings' active={true} />
            <SideNavItem link='/my-charities' text='My Donations' icon='basket' />
            <SideNavItem link='#' text='My Reviews' icon='star' />
            {/* <SideNavItem link='#' text='Billing' icon='card' /> */}
            {(userInfo.role === 'lead-organizer' || userInfo.role === 'admin') && (<SideNavItem link='#' text='Add Charity' icon='card' />)}
          </ul>
          {userInfo.role === 'admin' && (
            <div className='admin-nav'>
              <h5 className='admin-nav__heading'>Admin</h5>
              <ul className='side-nav'>
                <SideNavItem link='#' text='Manage Charities' icon='map' />
                <SideNavItem link='#' text='Manage Users' icon='users' />
                <SideNavItem link='#' text='Manage Reviews' icon='star' />
                <SideNavItem link='#' text='Manage Donations' icon='basket' />
              </ul>
            </div>
          )}
        </nav>
        <div className='user-view__content'>
          <UserAccountSettings userInfo={userInfo} />
          <div className='line'>&nbsp;</div>
          <UserPasswordUpdate />
        </div>
      </div>
    </main>
  );
};

export default UserProfile;
