import {Critical} from '../../../../Attack';
import {type DamageType} from '../../../../Damage/DamageType';
import {type DiceRoll} from '../../../../Dice';
import {EquipmentData, type EquipmentDataParams} from '../../EquipmentData';
import {ImprovementCategory} from '../../EquipmentImprovement/EquipmentImprovementCategory';
import {type WeaponPurpose} from '../WeaponPurpose';
import {type OffensiveWeaponName} from './OffensiveWeaponName';

type OffensiveWeaponDamageType = DamageType.cutting | DamageType.piercing | DamageType.impact;

type OffensiveWeaponParams<
	N extends OffensiveWeaponName,
> = Omit<
EquipmentDataParams<N>, 'improvementCategory' | 'usageLimitType'
> & {
	damage: DiceRoll;
	critical?: Critical;
	purposes: WeaponPurpose | WeaponPurpose[];
	damageType: OffensiveWeaponDamageType | OffensiveWeaponDamageType[];
};

export class OffensiveWeaponData<
	N extends OffensiveWeaponName,
> extends EquipmentData<N> {
	public readonly damage: DiceRoll;
	public readonly critical: Critical;
	public readonly purposes: WeaponPurpose[];
	public readonly damageType: Set<OffensiveWeaponDamageType>;

	constructor(params: OffensiveWeaponParams<N>) {
		super({
			...params,
			improvementCategory: ImprovementCategory.weapon,
			usageLimitType: 'wield',
		});
		this.damage = params.damage;
		this.critical = params.critical ?? new Critical();
		this.purposes = Array.isArray(params.purposes) ? params.purposes : [params.purposes];
		this.damageType = new Set(Array.isArray(params.damageType) ? params.damageType : [params.damageType]);
	}
}
