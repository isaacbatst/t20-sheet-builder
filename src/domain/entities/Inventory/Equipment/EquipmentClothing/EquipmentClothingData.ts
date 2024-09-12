import {EquipmentData, type UsageLimitType, type EquipmentDataParams} from '../EquipmentData';
import {ImprovementCategory} from '../EquipmentImprovement/EquipmentImprovementCategory';
import {type EquipmentClothingName} from './EquipmentClothingName';

type EquipmentClothingParams<
	N extends EquipmentClothingName,
> = Omit<EquipmentDataParams<N>, 'improvementCategory' | 'slots' | 'usageLimitType'> & {
	slots?: number | null;
	improvementCategory?: ImprovementCategory | null;
	usageLimitType?: UsageLimitType | null;
};

export class EquipmentClothingData<N extends EquipmentClothingName = EquipmentClothingName> extends EquipmentData<N> {
	constructor(
		params: EquipmentClothingParams<N>,
	) {
		super({
			...params,
			improvementCategory: typeof params.improvementCategory === 'undefined'
				? ImprovementCategory.toolsAndClothing
				: params.improvementCategory,
			slots: typeof params.slots === 'undefined'
				? 1
				: params.slots,
			usageLimitType: typeof params.usageLimitType === 'undefined'
				? 'dress'
				: params.usageLimitType,
		});
	}
}
