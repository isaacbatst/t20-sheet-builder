import {EquipmentName} from '../../../EquipmentName';
import {Shield} from './Shield';

export class LightShield extends Shield {
	override defenseBonus = 1;
	override armorPenalty = 1;
	override slots = 1;
	override name: EquipmentName = EquipmentName.lightShield;
	override price = 5;
}
