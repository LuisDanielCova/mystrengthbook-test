# Currency

Thanks for taking part in our code test. This test is intentionally vague and open ended as it is designed for you to show us not only your ability but how you approach and complete tasks assigned to you. There is no right or wrong way to complete this!

## Quick Start

```
# Change into the project directory
cd currency

# Install NPM dependencies
npm install

# Then simply start your app
npm start
```

To make your life easier we have also included the `nodemon` package by default. You can use by running

```
npm run watch
```

## Calling the API

To call the API, we suggest using [postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en). If you haven't used postman before, make sure that you are using `POST` and `raw` with `JSON`.

### Endpoints

`POST http://localhost:8888/api/0.1/`

### Params

| Param     | Type   | Required | Example                           |
| --------- | ------ | -------- | --------------------------------- |
| `date`    | string | true     | "2022-01-30"                      |
| `amount`  | number | true     | 10.5                              |
| `symbols` | String | false    | Single: "CAD" Multiple: 'CAD,AUD' |

### Example calls

The following are some examples to get you started calling the API.

#### Single conversion

This will return the value of 10 USD in EUR for january 5th, 2023.

```
{
	"date": "2023-01-05",
	"amount": 10,
	"symbols": "EUR"
}
```

This will return the value of 10 USD in GBP and EUR for january 5th, 2023.

```
{
	"date": "2023-01-05",
	"amount": 10,
	"symbol": "GBP,EUR"
}
```

This will return the value of 10 USD in all available currencies for january 5th, 2023

```
{
	"amount": 10,
	"date": "2023-01-05"
}
```

### Notes

- This API uses the `https://openexchangerates.org/` API. If you want more details on their api visit https://docs.openexchangerates.org/reference/api-introduction
