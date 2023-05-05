import {EquipmentName} from '../../../../EquipmentName';
import {HeavyArmor} from './HeavyArmor';

const chainMail = class ChainMail extends HeavyArmor {
	static defenseBonus = 6;
	static armorPenalty = 2;
	static slots = 5;
	static equipmentName: EquipmentName = EquipmentName.chainMail;

	defenseBonus = ChainMail.defenseBonus;
	armorPenalty = ChainMail.armorPenalty;
	slots = ChainMail.slots;
	name = ChainMail.equipmentName;
};

export {
	chainMail as ChainMail,
};
