import {EquipmentData, type EquipmentDataParams} from '../../EquipmentData';
import {ImprovementCategory} from '../../EquipmentImprovement/EquipmentImprovementCategory';
import {type DefensiveWeaponName} from './DefensiveWeaponName';

export type DefensiveWeaponParams<
	N extends DefensiveWeaponName,
> = Omit<EquipmentDataParams<N>, 'improvementCategory'> & {
	defenseBonus: number;
	armorPenalty: number;
};

export class DefensiveWeaponData<N extends DefensiveWeaponName> extends EquipmentData<N> {
	readonly defenseBonus: number;
	readonly armorPenalty: number;

	constructor(params: DefensiveWeaponParams<N>) {
		super({
			...params,
			improvementCategory: ImprovementCategory.armorAndShield,
		});

		this.defenseBonus = params.defenseBonus;
		this.armorPenalty = params.armorPenalty;
	}
}
