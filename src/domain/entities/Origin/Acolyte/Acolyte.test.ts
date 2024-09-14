import {PickGeneralPower} from '../../Action/PickGeneralPower';
import {PickOriginPower} from '../../Action/PickOriginPower';
import {EquipmentName} from '../../Inventory/Equipment/EquipmentName';
import {GeneralPowerName, OriginPowerName} from '../../Power';
import {IronWill} from '../../Power/GeneralPower/DestinyPower/IronWill/IronWill';
import {Medicine} from '../../Power/GeneralPower/DestinyPower/Medicine/Medicine';
import {ChurchMember} from '../../Power/OriginPower/ChurchMember/ChurchMember';
import {BuildingSheet} from '../../Sheet';
import {Transaction} from '../../Sheet/Transaction';
import {SkillName} from '../../Skill/SkillName';
import {OriginBenefitGeneralPower} from '../OriginBenefit/OriginBenefitGeneralPower';
import {OriginBenefitOriginPower} from '../OriginBenefit/OriginBenefitOriginPower';
import {OriginBenefitSkill} from '../OriginBenefit/OriginBenefitSkill';
import {OriginName} from '../OriginName';
import {Acolyte} from './Acolyte';

describe('Acolyte', () => {
	let sheet: BuildingSheet;
	let transaction: Transaction;

	beforeEach(() => {
		sheet = new BuildingSheet();
		transaction = new Transaction(sheet);
	});

	it('should dispatch add items', () => {
		const acolyte = new Acolyte([new OriginBenefitSkill(SkillName.cure), new OriginBenefitSkill(SkillName.religion)]);
		const sheet = new BuildingSheet();
		const transaction = new Transaction(sheet);
		acolyte.addToSheet(transaction);

		expect(sheet.getSheetInventory().getEquipment(EquipmentName.sacredSymbol)).toBeDefined();
		expect(sheet.getSheetInventory().getEquipment(EquipmentName.priestCostume)).toBeDefined();
	});

	it('should dispatch skill benefits training', () => {
		const acolyte = new Acolyte([new OriginBenefitSkill(SkillName.cure), new OriginBenefitSkill(SkillName.religion)]);
		acolyte.addToSheet(transaction);

		const firstSkill = sheet.getSkills()[SkillName.cure].skill;
		const secondSkill = sheet.getSkills()[SkillName.religion].skill;

		expect(firstSkill.getIsTrained()).toBe(true);
		expect(secondSkill.getIsTrained()).toBe(true);
	});

	it('should not allow not listed skills', () => {
		expect(() => {
			const acolyte = new Acolyte([new OriginBenefitSkill(SkillName.cure), new OriginBenefitSkill(SkillName.aim)]);
		}).toThrow('INVALID_ORIGIN_SKILL');
	});

	it('should not allow more than two benefits', () => {
		expect(() => {
			const acolyte = new Acolyte([new OriginBenefitSkill(SkillName.cure), new OriginBenefitSkill(SkillName.cure), new OriginBenefitSkill(SkillName.will)]);
		}).toThrow('INVALID_ORIGIN_BENEFITS');
	});

	it('should not allow less than two benefits', () => {
		expect(() => {
			const acolyte = new Acolyte([new OriginBenefitSkill(SkillName.cure)]);
		}).toThrow('INVALID_ORIGIN_BENEFITS');
	});

	it('should dispatch general power benefits appliance', () => {
		const acolyte = new Acolyte([new OriginBenefitGeneralPower(new IronWill()), new OriginBenefitGeneralPower(new Medicine())]);
		acolyte.addToSheet(transaction);
		const powers = sheet.getSheetPowers().getGeneralPowers();
		expect(powers.get(GeneralPowerName.ironWill)).toBeDefined();
		expect(powers.get(GeneralPowerName.medicine)).toBeDefined();
	});

	it('should dispatch origin power as benefit appliance', () => {
		const acolyte = new Acolyte([new OriginBenefitOriginPower(new ChurchMember()), new OriginBenefitGeneralPower(new Medicine())]);
		acolyte.addToSheet(transaction);

		const originPowers = sheet.getSheetPowers().getOriginPowers();
		const generalPowers = sheet.getSheetPowers().getGeneralPowers();

		expect(originPowers.get(OriginPowerName.churchMember)).toBeDefined();
		expect(generalPowers.get(GeneralPowerName.medicine)).toBeDefined();
	});
});
