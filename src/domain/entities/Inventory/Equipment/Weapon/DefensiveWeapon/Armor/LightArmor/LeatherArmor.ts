import {EquipmentName} from '../../../../EquipmentName';
import {LightArmor} from './LightArmor';
import {type LightArmorName} from './LightArmorName';

export class LeatherArmor extends LightArmor {
	static defenseBonus = 2;
	static armorPenalty = 0;
	static slots = 2;
	static equipmentName: LightArmorName = EquipmentName.leatherArmor;
	static price = 20;

	defenseBonus = LeatherArmor.defenseBonus;
	armorPenalty = LeatherArmor.armorPenalty;
	slots = LeatherArmor.slots;
	name = LeatherArmor.equipmentName;
	price = LeatherArmor.price;
}
