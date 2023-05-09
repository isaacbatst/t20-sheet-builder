import {AddEquipment} from '../Action/AddEquipment';
import {PickGeneralPower} from '../Action/PickGeneralPower';
import {PickOriginPower} from '../Action/PickOriginPower';
import {TrainSkill} from '../Action/TrainSkill';
import {EquipmentClothing} from '../Inventory/Equipment/EquipmentClothing/EquipmentClothing';
import {EquipmentName} from '../Inventory/Equipment/EquipmentName';
import {IronWill} from '../Power/GeneralPower/DestinyPower/IronWill/IronWill';
import {Medicine} from '../Power/GeneralPower/DestinyPower/Medicine/Medicine';
import {ChurchMember} from '../Power/OriginPower/ChurchMember';
import {SpecialFriend} from '../Power/OriginPower/SpecialFriend';
import {TransactionFake} from '../Sheet/TransactionFake';
import {SkillName} from '../Skill/SkillName';
import {Acolyte} from './Acolyte';
import {OriginBenefitGeneralPower} from './OriginBenefitGeneralPower';
import {OriginBenefitOriginPower} from './OriginBenefitOriginPower';
import {OriginBenefitSkill} from './OriginBenefitSkill';
import {OriginName} from './OriginName';

describe('Acolyte', () => {
	it('should dispatch add items', () => {
		const acolyte = new Acolyte([new OriginBenefitSkill(SkillName.cure), new OriginBenefitSkill(SkillName.religion)]);
		const transaction = new TransactionFake();
		acolyte.addToSheet(transaction);

		expect(transaction.run).toHaveBeenCalledWith(new AddEquipment({
			payload: {
				equipment: new EquipmentClothing(EquipmentName.sacredSymbol),
				source: OriginName.acolyte,
			},
			transaction,
		}));

		expect(transaction.run).toHaveBeenCalledWith(new AddEquipment({
			payload: {
				equipment: new EquipmentClothing(EquipmentName.priestCostume),
				source: OriginName.acolyte,
			},
			transaction,
		}));
	});

	it('should dispatch skill benefits training', () => {
		const acolyte = new Acolyte([new OriginBenefitSkill(SkillName.cure), new OriginBenefitSkill(SkillName.religion)]);
		const transaction = new TransactionFake();
		acolyte.addToSheet(transaction);

		expect(transaction.run).toHaveBeenCalledWith(new TrainSkill({
			payload: {
				skill: SkillName.cure,
				source: OriginName.acolyte,
			},
			transaction,
		}));

		expect(transaction.run).toHaveBeenCalledWith(new TrainSkill({
			payload: {
				skill: SkillName.religion,
				source: OriginName.acolyte,
			},
			transaction,
		}));
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
		const transaction = new TransactionFake();
		acolyte.addToSheet(transaction);
		expect(transaction.actions).toContainEqual(new PickGeneralPower({
			payload: {
				power: new IronWill(),
				source: OriginName.acolyte,
			},
			transaction,
		}));

		expect(transaction.actions).toContainEqual(new PickGeneralPower({
			payload: {
				power: new Medicine(),
				source: OriginName.acolyte,
			},
			transaction,
		}));
	});

	it('should dispatch origin power as benefit appliance', () => {
		const acolyte = new Acolyte([new OriginBenefitOriginPower(new ChurchMember()), new OriginBenefitGeneralPower(new Medicine())]);
		const transaction = new TransactionFake();
		acolyte.addToSheet(transaction);

		expect(transaction.actions).toContainEqual(new PickOriginPower({
			payload: {
				power: new ChurchMember(),
				source: OriginName.acolyte,
			},
			transaction,
		}));

		expect(transaction.actions).toContainEqual(new PickGeneralPower({
			payload: {
				power: new Medicine(),
				source: OriginName.acolyte,
			},
			transaction,
		}));
	});

	it('should not allow origin power from other origin', () => {
		expect(() => {
			const acolyte = new Acolyte([
				new OriginBenefitOriginPower(new SpecialFriend(SkillName.cheat)),
				new OriginBenefitGeneralPower(new Medicine()),
			]);
		}).toThrow('INVALID_ORIGIN_POWER');
	});
});
