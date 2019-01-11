const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: process.env.PAYPAL_MODE,
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET
});

class PayPalService {
  constructor() {
    this.paymentJson = {
      intent: "sale",
      payer: {
        payment_method: "paypal"
      },
      redirect_urls: {
        return_url: `${process.env.CORS_URL}/payments/success`,
        cancel_url: `${process.env.CORS_URL}/payments/`
      },
      transactions: [
        {
          amount: {
            total: 0,
            currency: "USD"
          },
          description: "Wet and Wild Camp payment.",
          item_list: {
            items: [
              {
                name: "Camp Payment",
                quantity: "1",
                price: 0,
                currency: "USD"
              }
            ]
          }
        }
      ]
    };
  }

  createPayment(paymentAmount) {
    this.paymentJson.transactions[0].amount.total = paymentAmount;
    this.paymentJson.transactions[0].item_list.items[0].price = paymentAmount;
    return new Promise((resolve, reject) => {
      paypal.payment.create(this.paymentJson, (err, payment) => {
        if (err) {
          reject(err);
        } else {
          resolve(payment);
        }
      });
    });
  }

  executePayment(paymentId, payerId) {
    return new Promise((resolve, reject) => {
      paypal.payment.execute(paymentId, payerId, (err, payment) => {
        if (err) {
          reject(err);
        } else {
          resolve(payment);
        }
      });
    });
  }
}

module.exports = new PayPalService();
