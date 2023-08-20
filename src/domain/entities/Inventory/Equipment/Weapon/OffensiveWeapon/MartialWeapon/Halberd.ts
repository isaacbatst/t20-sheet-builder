import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {WeaponPurposeMelee} from '../../WeaponPurpose';
import {MartialWeapon} from './MartialWeapon';
import {type MartialWeaponName} from './MartialWeaponName';

export class Halberd extends MartialWeapon {
	static damage = new DiceRoll(1, 10);
	static critical = new Critical(20, 3);
	static equipmentName: MartialWeaponName = EquipmentName.halberd;
	static purposes = [new WeaponPurposeMelee()];

	override damage: DiceRoll = Halberd.damage;
	override critical: Critical = Halberd.critical;
	override name = Halberd.equipmentName;
	override purposes = Halberd.purposes;
}
