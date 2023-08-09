import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {MartialWeapon} from './MartialWeapon';
import {type MartialWeaponName} from './MartialWeaponName';

export class BattleAxe extends MartialWeapon {
	static damage = new DiceRoll(1, 8);
	static critical = new Critical(20, 3);
	static equipmentName: MartialWeaponName = EquipmentName.battleAxe;

	override damage: DiceRoll = BattleAxe.damage;
	override critical: Critical = BattleAxe.critical;
	override name = BattleAxe.equipmentName;
}
