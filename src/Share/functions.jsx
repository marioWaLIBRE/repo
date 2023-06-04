/**FUNCIONES DE ENCRIPTACION Y DESENCRIPTACIÓN DE STRINGS */
import { Buffer } from "buffer";

export const encodeBase64 = (data) => {
	return Buffer.from(data).toString("base64");
};
export const decodeBase64 = (data) => {
	return Buffer.from(data, "base64").toString("ascii");
};

