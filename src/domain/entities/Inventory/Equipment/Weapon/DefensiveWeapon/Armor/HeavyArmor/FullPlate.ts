import {EquipmentName} from '../../../../EquipmentName';
import {type ArmorName} from '../ArmorName';
import {HeavyArmor} from './HeavyArmor';

export class FullPlate extends HeavyArmor {
	static defenseBonus = 10;
	static armorPenalty = 5;
	static slots = 5;
	static equipmentName: ArmorName = EquipmentName.fullPlate;

	defenseBonus = FullPlate.defenseBonus;
	armorPenalty = FullPlate.armorPenalty;
	slots = FullPlate.slots;
	name = FullPlate.equipmentName;
}

