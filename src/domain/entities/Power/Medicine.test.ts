import {OriginName} from '../Origin/OriginName';
import {SheetBaseFake} from '../Sheet/SheetBaseFake';
import {Medicine} from './Medicine';

describe('Medicine', () => {
	it('should require wisdom 1', () => {
		const medicine = new Medicine();
		const sheet = new SheetBaseFake();
		sheet.skills.cure.train();
		expect(() => {
			medicine.addToSheet(sheet, jest.fn(), OriginName.acolyte);
		}).toThrow('UNFULFILLED_REQUIREMENT');
	});

	it('should require cure training', () => {
		const medicine = new Medicine();
		const sheet = new SheetBaseFake();
		sheet.attributes.wisdom = 1;
		expect(() => {
			medicine.addToSheet(sheet, jest.fn(), OriginName.acolyte);
		}).toThrow('UNFULFILLED_REQUIREMENT');
	});
});
