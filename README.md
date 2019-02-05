# wet-wild-camp

MERN-style application suite for the Wet & Wild Adventure Camp registration system.

View it live at [http://register.wetwildcamp.com](http://register.wetwildcamp.com)

## Dependencies

- Node.js 10.x.x

- MongoDB 4.x.x

- An SMTP relay service for sending email

- - We recommend [Mailtrap](https://mailtrap.io/) for development purposes

- [PayPal REST API App](https://developer.paypal.com/docs/integration/admin/manage-apps/#overview) credentials

## Installing

First clone this repository

`$ git clone https://github.com/elikmiller/wet-wild-camp.git`

### Client App

The client application is built via [create-react-app](https://github.com/facebook/create-react-app).

First, navigate to the `client` directory.

`$ cd client`

Install depenencies.

`$ npm install`

Start the application.

`$ npm start`

### Server App

First, navigate to the `server` directory.

`$ cd server`

Install depenencies.

`$ npm install`

Set up environment variables.

`$ cp .env.example .env` and populate the newly created `.env`

Run database migrations.

`$ npm run migrate`

Start the application.

`$ npm start` or `$ npm run develop`

## Contributors

* [maffkipp](https://github.com/maffkipp)

* [elikmiller](https://github.com/elikmiller)
