import {EquipmentName} from '../../../../EquipmentName';
import {type ArmorName} from '../ArmorName';
import {LightArmor} from './LightArmor';
import {type LightArmorName} from './LightArmorName';

export class StuddedLeatherArmor extends LightArmor {
	static defenseBonus = 3;
	static armorPenalty = 1;
	static slots = 2;
	static equipmentName: LightArmorName = EquipmentName.studdedLeather;
	static price = 35;

	defenseBonus = StuddedLeatherArmor.defenseBonus;
	armorPenalty = StuddedLeatherArmor.armorPenalty;
	slots = StuddedLeatherArmor.slots;
	name = StuddedLeatherArmor.equipmentName;
	price = StuddedLeatherArmor.price;
}
