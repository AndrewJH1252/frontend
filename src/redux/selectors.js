import { createSelector } from 'reselect';

// Selector to get the user profile
const  selectProfile= (state) => state.auth.profile;

const  selectUserProfile= (state) => state.user.UserProfile;

// Selector to get the wallet balance
const selectWalletBalance = (state) => state.wallet.balance || [];

// Memoized selector using reselect to get the user profile
export const getUserProfile = createSelector(
  selectUserProfile,
  (userProfile) => userProfile
);

export const getProfile = createSelector(
  selectProfile,
  (profile) => profile
);

// Memoized selector using reselect to get the wallet balance
export const getWalletBalance = createSelector(
  selectWalletBalance,
  (balance) => balance
);
