import {Critical} from '../../../../../Attack';
import {DamageType} from '../../../../../Damage/DamageType';
import {DiceRoll} from '../../../../../Dice';
import {EquipmentName} from '../../../EquipmentName';
import {WeaponPurposeMelee} from '../../WeaponPurpose';
import {OffensiveWeaponData} from '../OffensiveWeaponData';
import {type ExoticWeaponName} from './ExoticWeaponName';

export class ExoticWeaponCatalog {
	static items: {
		[N in ExoticWeaponName]: OffensiveWeaponData<N>;
	} = {
			bastardSword: new OffensiveWeaponData({
				damage: new DiceRoll(1, 10),
				damageType: DamageType.cutting,
				description: '',
				equipmentName: EquipmentName.bastardSword,
				price: 35,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Espada Bastarda',
			}),
			chainofThorns: new OffensiveWeaponData({
				damage: new DiceRoll(2, 4),
				damageType: DamageType.cutting,
				description: '',
				equipmentName: EquipmentName.chainofThorns,
				price: 25,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Corrente de Espinhos',
				critical: new Critical(19),
				slots: 2,
			}),
			dwarfAxe: new OffensiveWeaponData({
				damage: new DiceRoll(1, 10),
				damageType: DamageType.cutting,
				description: '',
				equipmentName: EquipmentName.dwarfAxe,
				price: 50,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Machado Anão',
				critical: new Critical(20, 3),
			}),
			katana: new OffensiveWeaponData({
				damage: new DiceRoll(1, 8),
				damageType: DamageType.cutting,
				description: '',
				equipmentName: EquipmentName.katana,
				price: 100,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Katana',
				critical: new Critical(19),
			}),
			tauricAxe: new OffensiveWeaponData({
				damage: new DiceRoll(2, 8),
				damageType: DamageType.cutting,
				description: '',
				equipmentName: EquipmentName.tauricAxe,
				price: 50,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Machado Táurico',
				critical: new Critical(20, 3),
				slots: 2,
			}),
			whip: new OffensiveWeaponData({
				damage: new DiceRoll(1, 3),
				damageType: DamageType.cutting,
				description: '',
				equipmentName: EquipmentName.whip,
				price: 2,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Chicote',
			}),
		};
}
