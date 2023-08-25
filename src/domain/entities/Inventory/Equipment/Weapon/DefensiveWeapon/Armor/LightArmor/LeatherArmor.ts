import {EquipmentName} from '../../../../EquipmentName';
import {type ArmorName} from '../ArmorName';
import {LightArmor} from './LightArmor';

export class LeatherArmor extends LightArmor {
	static defenseBonus = 2;
	static armorPenalty = 0;
	static slots = 2;
	static equipmentName: ArmorName = EquipmentName.leatherArmor;

	defenseBonus = LeatherArmor.defenseBonus;
	armorPenalty = LeatherArmor.armorPenalty;
	slots = LeatherArmor.slots;
	name = LeatherArmor.equipmentName;
}
