import {EquipmentData, type EquipmentDataParams} from '../EquipmentData';
import {type EquipmentAnimalName} from './EquipmentAnimalName';

export class EquipmentAnimalData<
	N extends EquipmentAnimalName,
> extends EquipmentData<N> {
	constructor(
		params: Omit<
		EquipmentDataParams<N>,
		'improvementCategory' | 'slots' | 'usageLimitType'
		>,
	) {
		super({
			...params,
			improvementCategory: null,
			slots: null,
			usageLimitType: null,
		});
	}
}
