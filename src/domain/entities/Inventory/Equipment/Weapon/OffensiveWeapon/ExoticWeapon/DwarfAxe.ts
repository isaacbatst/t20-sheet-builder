import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {WeaponPurposeMelee} from '../../WeaponPurpose';
import {ExoticWeapon} from './ExoticWeapon';
import {type ExoticWeaponName} from './ExoticWeaponName';

export class DwarfAxe extends ExoticWeapon {
	static damage = new DiceRoll(1, 10);
	static critical = new Critical(20, 3);
	static equipmentName: ExoticWeaponName = EquipmentName.dwarfAxe;
	static purposes = [
		new WeaponPurposeMelee(),
	];

	override damage: DiceRoll = DwarfAxe.damage;
	override critical: Critical = DwarfAxe.critical;
	override name = DwarfAxe.equipmentName;
	override purposes = DwarfAxe.purposes;
}
