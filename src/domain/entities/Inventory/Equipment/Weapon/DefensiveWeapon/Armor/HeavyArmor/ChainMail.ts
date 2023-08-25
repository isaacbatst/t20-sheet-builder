import {EquipmentName} from '../../../../EquipmentName';
import {type ArmorName} from '../ArmorName';
import {HeavyArmor} from './HeavyArmor';

export class ChainMail extends HeavyArmor {
	static defenseBonus = 6;
	static armorPenalty = 2;
	static slots = 5;
	static equipmentName: ArmorName = EquipmentName.chainMail;

	defenseBonus = ChainMail.defenseBonus;
	armorPenalty = ChainMail.armorPenalty;
	slots = ChainMail.slots;
	name = ChainMail.equipmentName;
}
