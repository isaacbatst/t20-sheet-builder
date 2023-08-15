import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {MartialWeapon} from './MartialWeapon';
import {type MartialWeaponName} from './MartialWeaponName';

export class MountedSpear extends MartialWeapon {
	static damage = new DiceRoll(1, 8);
	static critical = new Critical(20, 3);
	static equipmentName: MartialWeaponName = EquipmentName.mountedSpear;

	damage: DiceRoll = MountedSpear.damage;
	critical: Critical = MountedSpear.critical;
	name = MountedSpear.equipmentName;
}
