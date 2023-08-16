import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {MartialWeapon} from './MartialWeapon';
import {type MartialWeaponName} from './MartialWeaponName';

export class Scimitar extends MartialWeapon {
	static damage = new DiceRoll(1, 6);
	static critical = new Critical(18);
	static equipmentName: MartialWeaponName = EquipmentName.scimitar;

	override damage: DiceRoll = Scimitar.damage;
	override critical: Critical = Scimitar.critical;
	override name = Scimitar.equipmentName;
}
