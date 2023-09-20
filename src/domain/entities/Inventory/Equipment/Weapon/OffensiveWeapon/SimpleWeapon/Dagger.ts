import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {WeaponPurposeMelee, WeaponPurposeRangedThrowing} from '../../WeaponPurpose';
import {SimpleWeapon} from './SimpleWeapon';
import {type SimpleWeaponName} from './SimpleWeaponName';

export class Dagger extends SimpleWeapon {
	static damage = new DiceRoll(1, 4);
	static critical = new Critical(19);
	static equipmentName: SimpleWeaponName = EquipmentName.dagger;
	static purposes = [
		new WeaponPurposeMelee({
			customTestAttributes: new Set(['dexterity']),
		}),
		new WeaponPurposeRangedThrowing(),
	];

	static price = 2;

	damage: DiceRoll = Dagger.damage;
	critical: Critical = Dagger.critical;
	name = Dagger.equipmentName;
	purposes = Dagger.purposes;
	price = Dagger.price;
}
