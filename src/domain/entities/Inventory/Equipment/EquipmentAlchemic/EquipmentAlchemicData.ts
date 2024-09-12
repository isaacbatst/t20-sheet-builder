import {EquipmentData, type EquipmentDataParams} from '../EquipmentData';
import {ImprovementCategory} from '../EquipmentImprovement/EquipmentImprovementCategory';
import {type EquipmentAlchemicCategory} from './EquipmentAlchemicCategory';
import {type EquipmentAlchemicName} from './EquipmentAlchemicName';

type EquipmentAlchemicParams<
	N extends EquipmentAlchemicName,
> = Omit<EquipmentDataParams<N>, 'improvementCategory'> & {
	alchemicCategory: EquipmentAlchemicCategory;
};

export class EquipmentAlchemicData<N extends EquipmentAlchemicName>
	extends EquipmentData<N> {
	readonly alchemicCategory: EquipmentAlchemicCategory;
	constructor(params: EquipmentAlchemicParams<N>) {
		super({
			...params,
			improvementCategory: null,
			slots: 0.5,
		});
		this.alchemicCategory = params.alchemicCategory;
	}
}
