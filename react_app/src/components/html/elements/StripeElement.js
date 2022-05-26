import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
// import StatusMessages, {useMessage} from './statusmessages'

export default function StripeElement(props) {



    return (
        <form id="payment-form" className="stripe-style">
            <label htmlFor="card-element">Payment</label>
            <CardElement id="card-element"/>
            <button>cash out</button>
        </form>

    )
}