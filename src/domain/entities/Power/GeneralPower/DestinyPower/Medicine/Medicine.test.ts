import {OriginName} from '../../../../Origin/OriginName';
import {TransactionFake} from '../../../../Sheet/TransactionFake';
import {SkillName} from '../../../../Skill';
import {Medicine} from './Medicine';

describe('Medicine', () => {
	it('should require wisdom 1', () => {
		const medicine = new Medicine();
		const transaction = new TransactionFake();
		transaction.sheet.getSheetSkills().trainSkill(SkillName.cure);
		expect(() => {
			medicine.addToSheet(transaction, OriginName.acolyte);
			medicine.verifyRequirements(transaction.sheet);
		}).toThrow('UNFULFILLED_REQUIREMENT');
	});

	it('should require cure training', () => {
		const medicine = new Medicine();
		const transaction = new TransactionFake();
		transaction.sheet.getSheetAttributes().getValues().wisdom = 1;
		expect(() => {
			medicine.addToSheet(transaction, OriginName.acolyte);
			medicine.verifyRequirements(transaction.sheet);
		}).toThrow('UNFULFILLED_REQUIREMENT');
	});
});
