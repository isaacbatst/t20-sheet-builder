import type {Equipment} from '../Inventory/Equipment/Equipment';
import {EquipmentAdventure} from '../Inventory/Equipment/EquipmentAdventure/EquipmentAdventure';
import {EquipmentClothing} from '../Inventory/Equipment/EquipmentClothing/EquipmentClothing';
import {EquipmentName} from '../Inventory/Equipment/EquipmentName';
import {GeneralPowerName} from '../Power/GeneralPower/GeneralPowerName';
import {OriginPowerName} from '../Power/OriginPower/OriginPowerName';
import {SkillName} from '../Skill/SkillName';
import {Origin} from './Origin';
import type {OriginBenefit} from './OriginBenefit';
import {OriginName} from './OriginName';

export class Acolyte extends Origin {
	name: OriginName = OriginName.acolyte;

	equipments: Equipment[] = [
		new EquipmentAdventure(EquipmentName.sacredSymbol),
		new EquipmentClothing(EquipmentName.priestCostume),
	];

	constructor(chosenBenefits: OriginBenefit[]) {
		super(chosenBenefits, {
			skills: [SkillName.cure, SkillName.religion, SkillName.will],
			generalPowers: [GeneralPowerName.medicine, GeneralPowerName.ironWill],
			originPower: OriginPowerName.churchMember,
		});
	}
}
