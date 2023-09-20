import {EquipmentName} from '../../../../EquipmentName';
import {HeavyArmor} from './HeavyArmor';
import {type HeavyArmorName} from './HeavyArmorName';

export class ChainMail extends HeavyArmor {
	static defenseBonus = 6;
	static armorPenalty = 2;
	static slots = 5;
	static equipmentName: HeavyArmorName = EquipmentName.chainMail;
	static price = 150;

	defenseBonus = ChainMail.defenseBonus;
	armorPenalty = ChainMail.armorPenalty;
	slots = ChainMail.slots;
	name = ChainMail.equipmentName;
	price = ChainMail.price;
}
