
import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';



function Paypal(props) {


    const onSuccess = (payment) => {
        // Congratulation, it came here means everything's fine!
        console.log("The payment was succeeded!", payment);
        props.onSuccess(payment)

    }

    const onCancel = (data) => {
        // User pressed "cancel" or close Paypal's popup!
        console.log('The payment was cancelled!', data);
        // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
    }

    const onError = (err) => {
        // The main Paypal's script cannot be loaded or somethings block the loading of that script!
        console.log("Error!", err);
        // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
        // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
    }

    let env = 'sandbox'; // you can set here to 'production' for production
    let currency = 'JPY'; // or you can set this value from your props or state
    let total = props.total; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
    // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

    const client = {
        sandbox: 'AVc8IbWYKHHm6Cop3Zc4FqPfJdH4GtGI3P0iTBQQDmS_D-nerRXXtmB7K7IP1bhD6exeKT0lEY5hxqJT',
        production: 'YOUR-PRODUCTION-APP-ID',
    }
    // In order to get production's app-ID, you will have to send your app to Paypal for approval first
    // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
    //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
    // For production app-ID:
    //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/

    // let showAmount = props.showAmount
    return (
        // <div>
        //     {showAmount && (


        //     )}
        // </div>



        <PaypalExpressBtn
            env={env}
            client={client}
            currency={currency}
            total={total}
            onError={onError}
            onSuccess={onSuccess}
            onCancel={onCancel}
            style={{
                size: 'responsive',
                color: 'gold',
                shape: 'pill',
                label: 'checkout',
                tagline: 'true'
            }}
        />

    )
}

export default Paypal















