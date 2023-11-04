import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './store/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import Footer from './components/common/Footer';
import { routes } from './utils/routes';
import ErrorBoundary from './utils/ErrorBoundary';
import { AuthProvider } from './utils/AuthContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './utils/i18n';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';



//const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_SECRET_KEY);

const stripePromise = loadStripe('pk_test_51NrGIFGo3ETpAsO3BQNgBhKWqVZ73bGgvvPssU709l69aEnD5oHOnsG5Nvy7UAbWAUgz9mKByGU3iFtO2FU8kmnW00GjaAtjuN');

function App() {
  return (
    <Elements stripe={stripePromise}>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Router>
              <AuthProvider>
                <ErrorBoundary>
                  <div className="App">
                    <Routes>
                      {routes.map((route, index) => (
                        <Route key={index} {...route} />
                      ))}
                    </Routes>
                    <Footer />
                  </div>
                </ErrorBoundary>
              </AuthProvider>
            </Router>
          </PersistGate>
        </Provider>
      </I18nextProvider>
    </Elements>
  );
}

export default App;
