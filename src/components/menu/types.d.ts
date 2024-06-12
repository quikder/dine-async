export interface CategoryType {
	id: string;
	name: string;
	items: number;
}

export interface ModifierType {
	id?: string;
	name: string;
	appLabel: string;
	isMandatory: boolean;
	singleSelection: boolean;
	maxSelections: number;
	isVisible: boolean;
	modifierItems: ModifierItemType[];
}

interface ModifierIdType {
	id: string;
}

export interface ModifierItemType {
	id?: string;
	name: string;
	price: number;
	picture: string | null;
	modifier: ModifierIdType;
}

type DayType =
	| "monday"
	| "tuesday"
	| "wednesday"
	| "thursday"
	| "friday"
	| "saturday"
	| "sunday";

interface DayInterface {
	name: DayType;
}

export interface DishType {
	id: string;
	name: string;
	category: CategoryType;
	picture: string | null;
	price: number;
	description: string;
	hasAlcohol: boolean;
	requiresModifier: boolean;
	isVisible: boolean;
	isAvailable: boolean;
	daysAvailable: DayType[];
	modifiers: ModifierType[];
}

export interface DishFormType
	extends Omit<DishType, "isVisible" | "isAvailable"> {
	category: string;
	price: string;
}
