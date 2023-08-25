import {OriginName} from '../../../../Origin/OriginName';
import {BuildingSheet} from '../../../../Sheet';
import {Transaction} from '../../../../Sheet/Transaction';
import {SkillName} from '../../../../Skill';
import {Medicine} from './Medicine';

describe('Medicine', () => {
	let sheet: BuildingSheet;
	let transaction: Transaction;

	beforeEach(() => {
		sheet = new BuildingSheet();
		transaction = new Transaction(sheet);
	});

	it('should require wisdom 1', () => {
		const medicine = new Medicine();
		transaction.sheet.getSheetSkills().trainSkill(SkillName.cure);
		expect(() => {
			medicine.addToSheet(transaction, OriginName.acolyte);
			medicine.verifyRequirements(transaction.sheet);
		}).toThrow('UNFULFILLED_REQUIREMENT');
	});

	it('should require cure training', () => {
		const medicine = new Medicine();
		transaction.sheet.getSheetAttributes().getValues().wisdom = 1;
		expect(() => {
			medicine.addToSheet(transaction, OriginName.acolyte);
			medicine.verifyRequirements(transaction.sheet);
		}).toThrow('UNFULFILLED_REQUIREMENT');
	});
});
