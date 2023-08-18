import {EquipmentName} from '../../../EquipmentName';
import {Shield} from './Shield';

export class HeavyShield extends Shield {
	override defenseBonus = 2;
	override armorPenalty = 2;
	override slots = 2;
	override name: EquipmentName = EquipmentName.heavyShield;
}
