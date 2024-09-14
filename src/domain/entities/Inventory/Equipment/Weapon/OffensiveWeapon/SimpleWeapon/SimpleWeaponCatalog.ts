import {Critical} from '../../../../../Attack';
import {DamageType} from '../../../../../Damage/DamageType';
import {DiceRoll} from '../../../../../Dice';
import {EquipmentName} from '../../../EquipmentName';
import {WeaponPurposeMelee, WeaponPurposeRangedShooting, WeaponPurposeRangedThrowing} from '../../WeaponPurpose';
import {OffensiveWeaponData} from '../OffensiveWeaponData';
import {type SimpleWeaponName} from './SimpleWeaponName';

export class SimpleWeaponCatalog {
	static items: {
		[N in SimpleWeaponName]: OffensiveWeaponData<N>;
	} = {
			assegai: new OffensiveWeaponData({
				damage: new DiceRoll(1, 6),
				damageType: DamageType.piercing,
				description: '',
				price: 1,
				purposes: [
					new WeaponPurposeMelee({
						penalty: 5,
					}),
					new WeaponPurposeRangedThrowing({
						range: 'medium',
					}),
				],
				translatedName: 'Azagaia',
				equipmentName: EquipmentName.assegai,
			}),

			baton: new OffensiveWeaponData({
				damage: new DiceRoll(1, 10),
				damageType: DamageType.impact,
				description: '',
				equipmentName: EquipmentName.baton,
				price: 0,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Tacape',
			}),

			club: new OffensiveWeaponData({
				damage: new DiceRoll(1, 6),
				damageType: DamageType.impact,
				description: '',
				equipmentName: EquipmentName.club,
				price: 0,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Clava',
			}),

			dagger: new OffensiveWeaponData({
				damage: new DiceRoll(1, 4),
				damageType: DamageType.piercing,
				description: '',
				equipmentName: EquipmentName.dagger,
				price: 2,
				purposes: [
					new WeaponPurposeMelee({
						customTestAttributes: new Set(['dexterity']),
					}),
					new WeaponPurposeRangedThrowing({
						range: 'short',
					}),
				],
				translatedName: 'Adaga',
				critical: new Critical(19),
			}),

			horns: new OffensiveWeaponData({
				damage: new DiceRoll(1, 6),
				damageType: DamageType.piercing,
				description: '',
				equipmentName: EquipmentName.horns,
				price: 0,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Chifres',
				isBuyable: false,
			}),
			lightCrossbow: new OffensiveWeaponData({
				damage: new DiceRoll(1, 8),
				damageType: DamageType.piercing,
				description: '',
				equipmentName: EquipmentName.lightCrossbow,
				price: 35,
				purposes: new WeaponPurposeRangedShooting({
					range: 'medium',
				}),
				translatedName: 'Besta Leve',
				critical: new Critical(19),
			}),

			mace: new OffensiveWeaponData({
				damage: new DiceRoll(1, 8),
				damageType: DamageType.impact,
				description: '',
				equipmentName: EquipmentName.mace,
				price: 12,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Maça',
			}),

			pike: new OffensiveWeaponData({
				damage: new DiceRoll(1, 8),
				damageType: DamageType.piercing,
				description: '',
				equipmentName: EquipmentName.pike,
				price: 2,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Pique',
			}),

			shortSword: new OffensiveWeaponData({
				damage: new DiceRoll(1, 6),
				damageType: DamageType.cutting,
				description: '',
				equipmentName: EquipmentName.shortSword,
				price: 10,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Espada Curta',
				critical: new Critical(19),
			}),
			shortbow: new OffensiveWeaponData({
				damage: new DiceRoll(1, 6),
				damageType: DamageType.piercing,
				description: '',
				equipmentName: EquipmentName.shortbow,
				price: 30,
				purposes: new WeaponPurposeRangedShooting({
					range: 'medium',
				}),
				translatedName: 'Arco Curto',
				critical: new Critical(20, 3),
			}),
			sickle: new OffensiveWeaponData({
				damage: new DiceRoll(1, 6),
				damageType: DamageType.cutting,
				description: '',
				equipmentName: EquipmentName.sickle,
				price: 4,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Foice',
				critical: new Critical(19, 3),
			}),
			sling: new OffensiveWeaponData({
				damage: new DiceRoll(1, 4),
				damageType: DamageType.impact,
				description: '',
				equipmentName: EquipmentName.sling,
				price: 0,
				purposes: new WeaponPurposeRangedShooting({
					range: 'short',
					damageAttribute: 'strength',
				}),
				translatedName: 'Funda',
			}),
			spear: new OffensiveWeaponData({
				damage: new DiceRoll(1, 6),
				damageType: DamageType.piercing,
				description: '',
				equipmentName: EquipmentName.spear,
				price: 2,
				purposes: [
					new WeaponPurposeMelee(),
					new WeaponPurposeRangedThrowing({
						range: 'short',
					}),
				],
				translatedName: 'Lança',
			}),
			staffStick: new OffensiveWeaponData({
				damage: new DiceRoll(1, 6),
				damageType: DamageType.impact,
				description: '',
				equipmentName: EquipmentName.staffStick,
				price: 0,
				purposes: new WeaponPurposeMelee(),
				translatedName: 'Bordão',
				slots: 2,
			}),
		};
}
