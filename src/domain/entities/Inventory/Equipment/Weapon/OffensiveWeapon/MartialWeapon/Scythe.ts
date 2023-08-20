import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {WeaponPurposeMelee} from '../../WeaponPurpose';
import {MartialWeapon} from './MartialWeapon';
import {type MartialWeaponName} from './MartialWeaponName';

export class Scythe extends MartialWeapon {
	static damage = new DiceRoll(2, 4);
	static critical = new Critical(20, 4);
	static equipmentName: MartialWeaponName = EquipmentName.scythe;
	static purposes = [new WeaponPurposeMelee()];

	damage: DiceRoll = Scythe.damage;
	critical: Critical = Scythe.critical;
	name = Scythe.equipmentName;
	override purposes = Scythe.purposes;
}
