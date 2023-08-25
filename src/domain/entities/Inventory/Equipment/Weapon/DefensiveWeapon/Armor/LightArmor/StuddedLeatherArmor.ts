import {EquipmentName} from '../../../../EquipmentName';
import {type ArmorName} from '../ArmorName';
import {LightArmor} from './LightArmor';

export class StuddedLeatherArmor extends LightArmor {
	static defenseBonus = 3;
	static armorPenalty = 1;
	static slots = 2;
	static equipmentName: ArmorName = EquipmentName.studdedLeather;

	defenseBonus = StuddedLeatherArmor.defenseBonus;
	armorPenalty = StuddedLeatherArmor.armorPenalty;
	slots = StuddedLeatherArmor.slots;
	name = StuddedLeatherArmor.equipmentName;
}
