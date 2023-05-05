import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {Critical} from '../../../../../Attack/Critical';
import {SimpleWeapon} from './SimpleWeapon';
import type {OffensiveWeaponStatic} from '../OffensiveWeaponStatic';

const dagger: OffensiveWeaponStatic = class Dagger extends SimpleWeapon {
	static damage = new DiceRoll(1, 4);
	static critical = new Critical(19);
	static equipmentName = EquipmentName.dagger;

	damage: DiceRoll = Dagger.damage;
	critical: Critical = Dagger.critical;
	name: EquipmentName = Dagger.equipmentName;
};

export {
	dagger as Dagger,
};
