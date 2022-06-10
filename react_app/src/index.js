import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './components/css/art/VendingMachine.css';
import './components/css/art/Background.css';
import './components/css/animation/NeonFlicker.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Elements
      stripe={stripePromise}
    >
      <App />
    </Elements>
  </React.StrictMode>
);

reportWebVitals();
