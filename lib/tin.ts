import { createClientAsync } from "soap";
import { Alpha2Countries } from "./eu_countries";
const TIN_URL =
	"https://ec.europa.eu/taxation_customs/tin/checkTinService.wsdl";

/**
 * This function makes a request to this website: 'https://ec.europa.eu/taxation_customs/tin/checkTinService.wsdl' to validate a TIN for a specific country
 *
 * <b>Error Types</b>
 *
 * `INVALID_INPUT`: The provided countryCode is invalid.
 *
 * `NO_INFORMATION`: The Member State does not provide validity information.
 *
 * `SERVICE_UNAVAILABLE`: The SOAP service is unavailable, try again later.
 *
 * `SERVER_BUSY`: The service can't process your request. Try again later.
 *
 * @param countryCode Alpha2 countries, capital letters like 'DE', 'AT', ...
 * @param TIN Tax Identifier Number
 * @returns { data, error }
 */
export async function validateTIN(
	countryCode: Alpha2Countries,
	TIN: string
): Promise<{ data: TINOutput | null; error: string | null }> {
	try {
		const args = { countryCode, tinNumber: TIN };
		const client = await createClientAsync(TIN_URL);
		const result = await client.checkTinAsync(args);
		if (!result || !result[0]) {
			return { data: null, error: "NO_RESULT_FROM_SERVER" };
		}
		return { data: result[0] as TINOutput, error: null };
	} catch (error) {
		if ((error as { body: string })?.body?.indexOf("INVALID_INPUT") !== -1) {
			return { data: null, error: "INVALID_INPUT" };
		}
		if ((error as { body: string })?.body?.indexOf("NO_INFORMATION") !== -1) {
			return { data: null, error: "NO_INFORMATION" };
		}
		if (
			(error as { body: string })?.body?.indexOf("SERVICE_UNAVAILABLE") !== -1
		) {
			return { data: null, error: "SERVICE_UNAVAILABLE" };
		}
		if ((error as { body: string })?.body?.indexOf("SERVER_BUSY") !== -1) {
			return { data: null, error: "SERVER_BUSY" };
		}
		return { data: null, error: error as string };
	}
}

export type TINOutput = {
	countryCode: string;
	tinNumber: string;
	requestDate: string;
	validStructure: boolean;
	validSyntax: boolean;
};
