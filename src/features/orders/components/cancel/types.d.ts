export interface FormType {
	isFullyCancelled: boolean;
	refundMethod: RefoundMethodType;
	reason: string;
	password: string;
}

export type RefoundMethodType = "cash" | "original";
