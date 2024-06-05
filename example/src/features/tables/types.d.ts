export interface TableType {
	capacity: number;
	id: string;
	isAvailable: boolean;
	number: number;
	waiters: Waiter[];
}

export interface WaiterType {
	id: string;
	name: string;
}