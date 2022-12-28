import {AddActivateableEffect} from '../Action/AddActivateableEffect';
import {OriginName} from '../Origin/OriginName';
import {SheetBaseFake} from '../Sheet/SheetBaseFake';
import {Medicine} from './Medicine';
import {MedicineEffect} from './MedicineEffect';

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

	it('should add activateable effect', () => {
		const medicine = new Medicine();
		const sheet = new SheetBaseFake();
		sheet.skills.cure.train();
		sheet.attributes.wisdom = 1;

		const dispatch = jest.fn();

		medicine.addToSheet(sheet, dispatch, OriginName.acolyte);

		expect(dispatch).toHaveBeenCalledWith(new AddActivateableEffect({
			effect: new MedicineEffect(),
		}), sheet);
	});
});
