import {EquipmentName} from '../../../../EquipmentName';
import {HeavyArmor} from './HeavyArmor';
import {type HeavyArmorName} from './HeavyArmorName';

export class FullPlate extends HeavyArmor {
	static defenseBonus = 10;
	static armorPenalty = 5;
	static slots = 5;
	static equipmentName: HeavyArmorName = EquipmentName.fullPlate;
	static price = 3000;

	defenseBonus = FullPlate.defenseBonus;
	armorPenalty = FullPlate.armorPenalty;
	slots = FullPlate.slots;
	name = FullPlate.equipmentName;
	price = FullPlate.price;
}

