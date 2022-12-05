// let data = {left:-1, right:1}
// const options = {
//     method: 'POST',
//     mode:'cors',
//     headers: { 'Content-Type': 'application/json' },
//     // body: JSON.stringify(data),
// };
// fetch("/api", options)
// .then(res =>{ console.log(res)} );

// console.log("checkout.js file");


// // This is a public sample test API key.
// // Don’t submit any personally identifiable information in requests made with this key.
// // Sign in to see your own test API key embedded in code samples.
const stripe = Stripe("pk_test_51M8qJYFdBA4TpVdi2NDmRUuXtHzabykd3eEYRFiwU95X8jVmQNexu8FhSvFLEP44WNLBuscLGSh5B2Vqgs2aSJne00Q0tWWvjb");

// The items the customer wants to buy
const items = [{ id: "xl-tshirt" }];

let elements;

initialize();
// checkStatus();


document
    .querySelector("#payment-form")
    .addEventListener("submit", handleSubmit);

// Fetches a payment intent and captures the client secret
async function initialize() {
    console.log('[[[ initialize fetch');
    const response = await fetch("/api", {
        method: "POST",
        mode:'no-cors',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
    });
    console.log('---- response');
    const { clientSecret } = await response.json();
    // console.log('### response.json():', response.json());
    console.log('### clientSecret:', clientSecret);
    
    const appearance = {theme: 'stripe'};
    elements = await stripe.elements({ appearance, clientSecret });
    console.log('### stripe.elements:', elements);
    // console.log('elements:',elements);

    const paymentElementOptions = {layout: "tabs"};

    const paymentElement = elements.create("payment", paymentElementOptions);
    // paymentElement.mount("#payment-element");
    const btn = document.getElementById('payment-element');
    paymentElement.mount(btn);
}

async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    console.log('@ handleSubmit');
    console.log('@ elements', elements);
    const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
            // Make sure to change this to your payment completion page
            // return_url: "cart.html",
            return_url: "http://localhost:4242/success.html",
            // return_url: "success.html",
        },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
        showMessage(error.message);
    } else {
        showMessage("An unexpected error occurred.");
    }

    setLoading(false);
}

// Fetches the payment intent status after payment submission
async function checkStatus() {
    const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
    );
    console.log('checkStatus ****************************************');
    console.log('*** clientSecret:', clientSecret);
    if (!clientSecret) {
        return;
    }

    const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
    console.log('checkStatus !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    switch (paymentIntent.status) {
        case "succeeded":
            showMessage("Payment succeeded!");
            break;
        case "processing":
            showMessage("Your payment is processing.");
            break;
        case "requires_payment_method":
            showMessage("Your payment was not successful, please try again.");
            break;
        default:
            showMessage("Something went wrong.");
            break;
    }
}

// // ------- UI helpers -------

function showMessage(messageText) {
    const messageContainer = document.querySelector("#payment-message");

    messageContainer.classList.remove("hidden");
    messageContainer.textContent = messageText;

    setTimeout(function () {
        messageContainer.classList.add("hidden");
        messageText.textContent = "";
    }, 4000);
}

// // Show a spinner on payment submission
function setLoading(isLoading) {
    if (isLoading) {
        // Disable the button and show a spinner
        document.querySelector("#submit").disabled = true;
        document.querySelector("#spinner").classList.remove("hidden");
        document.querySelector("#button-text").classList.add("hidden");
    } else {
        document.querySelector("#submit").disabled = false;
        document.querySelector("#spinner").classList.add("hidden");
        document.querySelector("#button-text").classList.remove("hidden");
    }
}