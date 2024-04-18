export interface AddressInput {
	streetAddress: string;
	city: string;
	stateProvince: string;
	postalCode: string;
	country: string;
	latitude: number | null;
	longitude: number | null;
}

export interface DeliveryInstructionsInput {
	addressInput: AddressInput;
	apartmentNumber: string;
	phoneNumber: string;
}

export interface FormType {
	customerName: string;
	deliveryType: string;
	tableNumber: string;
	deliveryInstructionsInput: DeliveryInstructionsInput;
}