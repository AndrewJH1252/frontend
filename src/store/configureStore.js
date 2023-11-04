// store.js

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';


import cartReducer from '../redux/slice/cartSlice';
import courseReducer from '../redux/slice/coursesSlice';
import earningReducer from '../redux/slice/earningsSlice';
import messageReducer from '../redux/slice/messageSlice';
import categoryReducer from '../redux/slice/categoriesSlice';
import notificationReducer from '../redux/slice/notificationSlice';
import ratingReducer from '../redux/slice/ratingSlice';
import requestReducer from '../redux/slice/requestsSlice';
import reviewReducer from '../redux/slice/reviewSlice';
import searchReducer from '../redux/slice/searchSlice';
import userReducer from '../redux/slice/userSlice';
import paymentReducer from '../redux/slice/paymentSlice';
import settingsReducer from '../redux/slice/settingsSlice';
import courseCreationReducer from '../redux/slice/courseCreationSlice';
import walletReducer from '../redux/slice/walletSlice';
import chatReducer from '../redux/slice/chatSlice';
import persistedAuthReducer from '../redux/slice/authSlice';
import threadReducer from '../redux/slice/threadSlice';
import postsReducer from '../redux/slice/postSlice'; // Include other reducers as needed
import communityReducer from '../redux/slice/communitySlice';
import statisticsReducer from '../redux/Thunks/statisticsThunk';

// Use combineReducers to combine your reducers
const rootReducer = combineReducers({
  user: userReducer,
  categories: categoryReducer,
  courses: courseReducer,
  course: courseReducer,
  notifications: notificationReducer,
  messages: messageReducer,
  cart: cartReducer,
  courseCreation: courseCreationReducer,
  requests: requestReducer,
  payment: paymentReducer,
  earnings: earningReducer,
  reviews: reviewReducer,
  search: searchReducer,
  ratings: ratingReducer,
  settings: settingsReducer,
  wallet: walletReducer,
  chat: chatReducer,
  auth: persistedAuthReducer,
  threads: threadReducer,
  posts: postsReducer, 
  community: communityReducer,
  statistics: statisticsReducer,
  


});

const store = configureStore({
  reducer: rootReducer,
  devTools: composeWithDevTools(),
});

const persistor = persistStore(store);
export { store, persistor };














