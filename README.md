# eu-tin-vat-validator

<img src="https://github.com/pshaddel/eu-tin-vat-validator/actions/workflows/test.yml/badge.svg"/> <img src="https://github.com/pshaddel/eu-tin-vat-validator/actions/workflows/release-package.yml/badge.svg"/> [![Known Vulnerabilities](https://snyk.io/test/github/pshaddel/eu-tin-vat-validator/badge.svg)](https://snyk.io/test/github/{username}/{repo})

A Validator for TIN and VAT in European countries.

In this package we are making a request to the services that are provided in here: [https://ec.europa.eu/info/index_en](https://ec.europa.eu/info/index_en)

## Installation
Run this command:

```bash
npm install @pshaddel/eu-tin-vat-validator
```

## TIN Validation
For doing an online test you can directly use this website: [https://ec.europa.eu/taxation_customs/tin/#/check-tin](https://ec.europa.eu/taxation_customs/tin/#/check-tin)

For using this package in your code you should use tin validator function:

```typescript
import { validateTIN } from "@pshaddel/eu-tin-vat-validator";
const { data, error } = await validateTIN(
	"AT",
	"532092782"
);

```
