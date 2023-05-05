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
import type {OriginStatic} from './OriginStatic';

const acolyte: OriginStatic = class Acolyte extends Origin {
	static equipments: Equipment[] = [
		new EquipmentAdventure(EquipmentName.sacredSymbol),
		new EquipmentClothing(EquipmentName.priestCostume),
	];

	static originName: OriginName = OriginName.acolyte;
	static skills: SkillName[] = [SkillName.cure, SkillName.religion, SkillName.will];
	static generalPowers: GeneralPowerName[] = [GeneralPowerName.medicine, GeneralPowerName.ironWill];
	static originPower = OriginPowerName.churchMember;

	name = Acolyte.originName;
	equipments = Acolyte.equipments;

	constructor(chosenBenefits: OriginBenefit[]) {
		super(chosenBenefits, {
			skills: Acolyte.skills,
			generalPowers: Acolyte.generalPowers,
			originPower: Acolyte.originPower,
		});
	}
};

export {
	acolyte as Acolyte,
};
