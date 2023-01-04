import {Equipment} from '../Inventory/Equipment/Equipment';
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
		new Equipment(EquipmentName.sacredSymbol),
		new Equipment(EquipmentName.priestCostume),
	];

	constructor(chosenBenefits: OriginBenefit[]) {
		super(chosenBenefits, {
			skills: [SkillName.cure, SkillName.religion, SkillName.will],
			generalPowers: [GeneralPowerName.medicine, GeneralPowerName.ironWill],
			originPower: OriginPowerName.churchMember,
		});
	}
}
