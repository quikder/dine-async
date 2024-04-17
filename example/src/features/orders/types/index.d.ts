export interface OrderType {
	id: string;
	customerName: string;
	tableNumber: number;
	status: OrderStatusType;
	deliveryType: DeliveryType;
	createdAt: Moment;
	items: OrderItemType[];
	servedBy: ServerByType;
	financialDetails: FinancialDetailsType;
	deliveryInstructions: deliveryInstructionsType;
	isPaid: boolean;
	inApp: boolean;
	qrPayment: QrPayment;
	payments: PaymentType[];
	canceled: CanceledType[];
	refunds: RefundsType[];
}

export type DeliveryType = "DINE_IN" | "TAKEOUT" | "PICKUP" | "DELIVERY";

export type OrderStatusType = "NEW" | "READY" | "DELIVERED" | "CANCELLED";

export interface deliveryInstructionsType {
	apartmentNumber: string;
	phoneNumber: string;
	address: AddressType;
}

export interface AddressType {
	streetAddress;
	city;
	stateProvince;
	postalCode;
	country;
	latitude;
	longitude;
}

export interface OrderItemType {
	id: string;
	dish: DishType;
	isDelivered: boolean;
	isForRestaurant: boolean;
	note: string;
	price: number;
	quantity: number;
	total: number;
	modifierItems: ModifierItemType[];
}

export interface DishType {
	name: string;
	picture: string;
}

export interface ModifierItemType {
	id: string;
	name: string;
	modifier: ModifierType;
}

export interface ModifierType {
	id: string;
	name: string;
}

export interface ServerByType {
	firstName: string;
	lastName: string;
}

export interface FinancialDetailsType {
	subtotal: string;
	tax: string;
	tip: string;
	totalRestaurant: string;
	totalOrder: string;
}

export interface QrPayment {
	qrCode;
}

export interface PaymentType {
	id: string;
	amount: string;
	chargedBy: string;
	paymentType: string;
	cashPayments: CashPaymentsType[];
	cardPayments: CardPaymentsType[];
	customPayment: CustomPayment;
}

export interface CashPaymentsType {
	id;
	amount;
	change;
}

export interface CardPaymentsType {
	id;
	stripePaymentId;
	cardNumber;
	brand;
	wallet;
}

export interface AlternativePaymentType {
	id;
	paymentType;
}

export interface CustomPayment {
	method;
}

export interface CanceledType {
	id: string;
	isFullyCancelled: boolean;
	reason: string;
	totalItems: number;
}

export interface RefundsType {
	id: string;
	amount: string;
	isFullyRefunded: boolean;
	reason: string;
	method: string;
	refundedBy: string;
	totalItems: number;
}
