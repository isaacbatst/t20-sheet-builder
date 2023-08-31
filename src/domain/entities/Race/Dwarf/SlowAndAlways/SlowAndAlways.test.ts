import {BuildingSheet} from '../../../Sheet';
import {Transaction} from '../../../Sheet/Transaction';
import {RaceName} from '../../RaceName';
import {SlowAndAlways} from './SlowAndAlways';

describe('SlowAndAlways', () => {
	it('should dispatch displacement change', () => {
		const slowAndAlways = new SlowAndAlways();
		const sheet = new BuildingSheet();
		const transaction = new Transaction(sheet);
		slowAndAlways.addToSheet(transaction);
		expect(sheet.getSheetDisplacement().getDisplacement()).toBe(6);
	});
});
