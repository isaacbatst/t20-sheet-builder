import {EquipmentName} from '../../../EquipmentName';
import {Shield} from './Shield';
import {type ShieldName} from './ShieldName';

export class LightShield extends Shield {
	static readonly equipmentName = EquipmentName.lightShield;
	static get price() {
		return 5;
	}

	static get defenseBonus() {
		return 1;
	}

	static get armorPenalty() {
		return 1;
	}

	static get slots() {
		return 1;
	}

	override defenseBonus = LightShield.defenseBonus;
	override armorPenalty = LightShield.armorPenalty;
	override slots = LightShield.slots;
	override name: ShieldName = LightShield.equipmentName;
	override price = LightShield.price;
}
