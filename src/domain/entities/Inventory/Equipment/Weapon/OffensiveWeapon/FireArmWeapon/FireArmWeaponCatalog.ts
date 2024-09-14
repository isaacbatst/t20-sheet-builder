import {Critical} from '../../../../../Attack';
import {DamageType} from '../../../../../Damage/DamageType';
import {DiceRoll} from '../../../../../Dice';
import {EquipmentName} from '../../../EquipmentName';
import {WeaponPurposeRangedShooting} from '../../WeaponPurpose';
import {OffensiveWeaponData} from '../OffensiveWeaponData';
import {type FireArmWeaponName} from './FireArmWeaponName';

export class FireArmWeaponCatalog {
	static items: {
		[N in FireArmWeaponName]: OffensiveWeaponData<N>;
	} = {

			pistol: new OffensiveWeaponData({
				damage: new DiceRoll(2, 6),
				damageType: DamageType.piercing,
				description: '',
				equipmentName: EquipmentName.pistol,
				price: 250,
				purposes: new WeaponPurposeRangedShooting({
					range: 'short',
				}),
				translatedName: 'Pistola',
				critical: new Critical(19, 3),
			}),
			musket: new OffensiveWeaponData({
				damage: new DiceRoll(1, 12),
				damageType: DamageType.piercing,
				description: '',
				equipmentName: EquipmentName.musket,
				price: 500,
				purposes: new WeaponPurposeRangedShooting({
					range: 'medium',
				}),
				translatedName: 'Mosquete',
				critical: new Critical(19, 3),
				slots: 2,
			}),
		};
}
