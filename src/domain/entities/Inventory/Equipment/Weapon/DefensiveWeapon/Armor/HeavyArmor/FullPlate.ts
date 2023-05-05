import {EquipmentName} from '../../../../EquipmentName';
import type {ArmorStatic} from '../ArmorStatic';
import {HeavyArmor} from './HeavyArmor';

const fullPlate: ArmorStatic = class FullPlate extends HeavyArmor {
	static defenseBonus = 10;
	static armorPenalty = 5;
	static slots = 5;
	static equipmentName: EquipmentName = EquipmentName.fullPlate;

	defenseBonus = FullPlate.defenseBonus;
	armorPenalty = FullPlate.armorPenalty;
	slots = FullPlate.slots;
	name = FullPlate.equipmentName;
};

export {
	fullPlate as FullPlate,
};
