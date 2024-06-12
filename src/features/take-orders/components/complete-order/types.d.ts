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

type DeliveryType = "dine-in" | "takeout" | "pickup" | "delivery" | "";

export interface FormType {
	customerName: string;
	deliveryType: DeliveryType;
	tableNumber: string;
	deliveryInstructionsInput: DeliveryInstructionsInput;
}


interface OrderInformationType {
	customerName: string;
	tableNumber: number;
	deliveryType: DeliveryType;
}

interface OrderItemType {
	dishId: string;
	price: number;
	quantity: number;
	isForRestaurant: boolean;
	note: string;
	modifierItems: string[];
}