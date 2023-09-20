import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {type WeaponPurpose, WeaponPurposeMelee} from '../../WeaponPurpose';
import {MartialWeapon} from './MartialWeapon';
import {type MartialWeaponName} from './MartialWeaponName';

export class Pickaxe extends MartialWeapon {
	static damage = new DiceRoll(1, 6);
	static critical = new Critical(20, 4);
	static equipmentName: MartialWeaponName = EquipmentName.pickaxe;
	static purposes = [new WeaponPurposeMelee()];
	static price = 8;

	override damage: DiceRoll = Pickaxe.damage;
	override critical: Critical = Pickaxe.critical;
	override name = Pickaxe.equipmentName;
	override purposes: WeaponPurpose[] = Pickaxe.purposes;
	override price = Pickaxe.price;
}
