import { Alpha2Countries } from "../lib/eu_countries";
import { TINOutput, validateTIN } from "../lib/tin";

describe("TIN Validator", () => {
	test("Should get error when country is not in the list of alpha2 countries", async () => {
		const { data, error } = await validateTIN(
			"BGS" as Alpha2Countries,
			"123456"
		);
		expect(data).toBeNull();
		expect(error).toBe("INVALID_INPUT");
	});

	test("Should get false in result of validation when TIN is not valid", async () => {
		const { data, error } = await validateTIN(
			"BG",
			"123456"
		);
		expect(error).toBeNull();
		expect(data).not.toBeNull();
		expect((data as TINOutput).countryCode).toBe("BG");
		expect((data as TINOutput).tinNumber).toBe("123456");
		expect((data as TINOutput).validStructure).toBe(false);
		expect((data as TINOutput).validSyntax).toBe(false);
	});

	test("Should get false when syntax of TIN is not valid", async () => {
		const { data, error } = await validateTIN(
			"AT",
			"532092782"
		);
		expect(error).toBeNull();
		expect(data).not.toBeNull();
		expect((data as TINOutput).countryCode).toBe("AT");
		expect((data as TINOutput).tinNumber).toBe("532092782");
		expect((data as TINOutput).validStructure).toBe(true);
		expect((data as TINOutput).validSyntax).toBe(false);
	});

	test("Should get true when a valid TIN is passed - example 1", async () => {
		const { data, error } = await validateTIN(
			"AT",
			"522092782"
		);
		expect(error).toBeNull();
		expect(data).not.toBeNull();
		expect((data as TINOutput).countryCode).toBe("AT");
		expect((data as TINOutput).tinNumber).toBe("522092782");
		expect((data as TINOutput).validStructure).toBe(true);
		expect((data as TINOutput).validSyntax).toBe(true);
	});

	test("Should get true when a valid TIN is passed - example 2", async () => {
		const { data, error } = await validateTIN(
			"BE",
			"00012511119"
		);
		expect(error).toBeNull();
		expect(data).not.toBeNull();
		expect((data as TINOutput).countryCode).toBe("BE");
		expect((data as TINOutput).tinNumber).toBe("00012511119");
		expect((data as TINOutput).validStructure).toBe(true);
		expect((data as TINOutput).validSyntax).toBe(true);
	});
});
