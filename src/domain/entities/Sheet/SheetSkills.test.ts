import {OutOfGameContext} from '../Context';
import {BuildingSheet} from './BuildingSheet';

describe('SheetSkills', () => {
	it('should be serialized', () => {
		const sheet = new BuildingSheet();
		const context = new OutOfGameContext();
		const serialized = sheet.getSheetSkills().serialize(sheet, context);
		expect(serialized.intelligenceSkills).toHaveLength(0);
	});
});
