import {EquipmentName} from '../../../../EquipmentName';
import {LightArmor} from './LightArmor';

const studdedLeatherArmor = class StuddedLeatherArmor extends LightArmor {
	static defenseBonus = 3;
	static armorPenalty = 1;
	static slots = 2;
	static equipmentName: EquipmentName = EquipmentName.studdedLeather;

	defenseBonus = StuddedLeatherArmor.defenseBonus;
	armorPenalty = StuddedLeatherArmor.armorPenalty;
	slots = StuddedLeatherArmor.slots;
	name = StuddedLeatherArmor.equipmentName;
};

export {
	studdedLeatherArmor as StuddedLeatherArmor,
};
