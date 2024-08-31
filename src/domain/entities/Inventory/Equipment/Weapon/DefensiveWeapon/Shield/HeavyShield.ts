import {EquipmentName} from '../../../EquipmentName';
import {Shield} from './Shield';
import {type ShieldName} from './ShieldName';

export class HeavyShield extends Shield {
	static readonly equipmentName = EquipmentName.heavyShield;

	static get price() {
		return 15;
	}

	static get defenseBonus() {
		return 2;
	}

	static get armorPenalty() {
		return 2;
	}

	static get slots() {
		return 2;
	}

	override defenseBonus = HeavyShield.defenseBonus;
	override armorPenalty = HeavyShield.armorPenalty;
	override slots = HeavyShield.slots;
	override name: ShieldName = HeavyShield.equipmentName;
	override price = HeavyShield.price;
}
