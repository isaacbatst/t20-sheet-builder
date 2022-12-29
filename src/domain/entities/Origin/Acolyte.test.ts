import {AddEquipment} from '../Action/AddEquipment';
import {PickGeneralPower} from '../Action/PickGeneralPower';
import {PickOriginPower} from '../Action/PickOriginPower';
import {TrainSkill} from '../Action/TrainSkill';
import {Equipment} from '../Equipment/Equipment';
import {EquipmentName} from '../Equipment/EquipmentName';
import {IronWill} from '../Power/IronWill';
import {Medicine} from '../Power/Medicine';
import {ChurchMember} from '../Power/OriginPower/ChurchMember';
import {SpecialFriend} from '../Power/OriginPower/SpecialFriend';
import {BuildingSheetFake} from '../Sheet/BuildingSheetFake';
import {SheetBaseFake} from '../Sheet/SheetBaseFake';
import {SkillName} from '../Skill/SkillName';
import {Acolyte} from './Acolyte';
import {OriginBenefitGeneralPower} from './OriginBenefitGeneralPower';
import {OriginBenefitOriginPower} from './OriginBenefitOriginPower';
import {OriginBenefitSkill} from './OriginBenefitSkill';
import {OriginName} from './OriginName';

describe('Acolyte', () => {
	it('should dispatch add items', () => {
		const acolyte = new Acolyte([new OriginBenefitSkill(SkillName.cure), new OriginBenefitSkill(SkillName.religion)]);
		const sheet = new BuildingSheetFake();
		const dispatch = jest.fn();
		acolyte.addToSheet(sheet, dispatch);

		expect(dispatch).toHaveBeenCalledWith(new AddEquipment({
			equipment: new Equipment(EquipmentName.sacredSymbol),
		}), sheet);

		expect(dispatch).toHaveBeenCalledWith(new AddEquipment({
			equipment: new Equipment(EquipmentName.priestCostume),
		}), sheet);
	});

	it('should dispatch skill benefits training', () => {
		const acolyte = new Acolyte([new OriginBenefitSkill(SkillName.cure), new OriginBenefitSkill(SkillName.religion)]);
		const sheet = new BuildingSheetFake();
		const dispatch = jest.fn();
		acolyte.addToSheet(sheet, dispatch);

		expect(dispatch).toHaveBeenCalledWith(new TrainSkill({
			name: SkillName.cure,
			source: OriginName.acolyte,
		}), sheet);

		expect(dispatch).toHaveBeenCalledWith(new TrainSkill({
			name: SkillName.religion,
			source: OriginName.acolyte,
		}), sheet);
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
		const sheet = new SheetBaseFake();
		sheet.attributes.wisdom = 1;
		sheet.skills.cure.train();
		const dispatch = jest.fn();
		acolyte.addToSheet(sheet, dispatch);

		expect(dispatch).toHaveBeenCalledWith(new PickGeneralPower({
			power: new IronWill(),
			source: OriginName.acolyte,
		}), sheet);

		expect(dispatch).toHaveBeenCalledWith(new PickGeneralPower({
			power: new Medicine(),
			source: OriginName.acolyte,
		}), sheet);
	});

	it('should dispatch origin power as benefit appliance', () => {
		const acolyte = new Acolyte([new OriginBenefitOriginPower(new ChurchMember()), new OriginBenefitGeneralPower(new Medicine())]);
		const sheet = new SheetBaseFake();
		sheet.attributes.wisdom = 1;
		sheet.skills.cure.train();
		const dispatch = jest.fn();
		acolyte.addToSheet(sheet, dispatch);

		expect(dispatch).toHaveBeenCalledWith(new PickOriginPower({
			power: new ChurchMember(),
		}), sheet);

		expect(dispatch).toHaveBeenCalledWith(new PickGeneralPower({
			power: new Medicine(),
			source: OriginName.acolyte,
		}), sheet);
	});

	it('should not allow origin power from other origin', () => {
		expect(() => {
			const acolyte = new Acolyte([new OriginBenefitOriginPower(new SpecialFriend(SkillName.cheat)), new OriginBenefitGeneralPower(new Medicine())]);
		}).toThrow('INVALID_ORIGIN_POWER');
	});

	it('should not allow power with unfulfilled requirements', () => {
		expect(() => {
			const sheet = new SheetBaseFake();
			const dispatch = jest.fn();
			const acolyte = new Acolyte([new OriginBenefitOriginPower(new ChurchMember()), new OriginBenefitGeneralPower(new Medicine())]);
			acolyte.addToSheet(sheet, dispatch);
		}).toThrow('UNFULFILLED_REQUIREMENT');
	});
});
