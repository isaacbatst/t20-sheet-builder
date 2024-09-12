import {type ImprovementCategory} from './EquipmentImprovement/EquipmentImprovementCategory';
import {type EquipmentName} from './EquipmentName';

export type UsageLimitType = 'wield' | 'dress';

export type EquipmentDataParams<N extends EquipmentName = EquipmentName> = {
	equipmentName: N;
	price: number;
	description: string;
	translatedName: string;
	usageLimitType: UsageLimitType | null;
	slots?: number | null;
	improvementCategory: ImprovementCategory | null;
	isBuyable?: boolean;
};

export class EquipmentData<N extends EquipmentName = EquipmentName> {
	readonly equipmentName: N;
	readonly price: number;
	readonly description: string;
	readonly translatedName: string;
	readonly improvementCategory: ImprovementCategory | null;
	readonly usageLimitType: UsageLimitType | null;
	readonly slots: number | null;
	readonly isBuyable: boolean;

	constructor(params: EquipmentDataParams<N>) {
		this.equipmentName = params.equipmentName;
		this.price = params.price;
		this.description = params.description;
		this.translatedName = params.translatedName;
		this.improvementCategory = params.improvementCategory;
		this.usageLimitType = params.usageLimitType;
		this.isBuyable = typeof params.isBuyable === 'undefined'
			? true
			: params.isBuyable;
		this.slots = typeof params.slots === 'undefined'
			? 1
			: params.slots;
	}
}
