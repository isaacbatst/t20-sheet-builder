import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {WeaponPurposeMelee} from '../../WeaponPurpose';
import {MartialWeapon} from './MartialWeapon';
import {type MartialWeaponName} from './MartialWeaponName';

export class Flail extends MartialWeapon {
	static damage = new DiceRoll(1, 8);
	static critical = new Critical();
	static equipmentName: MartialWeaponName = EquipmentName.flail;
	static purposes = [new WeaponPurposeMelee()];
	static price = 8;

	override damage: DiceRoll = Flail.damage;
	override critical: Critical = Flail.critical;
	override name = Flail.equipmentName;
	override purposes = Flail.purposes;
	override price = Flail.price;
}
