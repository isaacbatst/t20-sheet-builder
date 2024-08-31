import {Dagger, FullPlate} from '../../Inventory';
import {EquipmentName} from '../../Inventory/Equipment/EquipmentName';
import {Scimitar} from '../../Inventory/Equipment/Weapon/OffensiveWeapon/MartialWeapon/Scimitar';
import {BuildingSheet} from '../../Sheet';
import {Transaction} from '../../Sheet/Transaction';
import {Amnesic} from './Amnesic';

describe('Amnesic', () => {
	let sheet: BuildingSheet;
	let transaction: Transaction;

	beforeEach(() => {
		sheet = new BuildingSheet();
		transaction = new Transaction(sheet);
	});

	it('should add items to sheet', () => {
		const origin = new Amnesic([new Dagger(), new Scimitar()]);
		const sheet = new BuildingSheet();
		const transaction = new Transaction(sheet);
		origin.addToSheet(transaction);

		expect(sheet.getSheetInventory().getEquipment(EquipmentName.dagger)).toBeDefined();
		expect(sheet.getSheetInventory().getEquipment(EquipmentName.scimitar)).toBeDefined();
	});

	it('should throw an error if the total equipment cost exceeds 500', () => {
		expect(() => {
			const origin = new Amnesic([new FullPlate()]);
		}).toThrowError('MAX_AMNESIC_EQUIPMENTS_COST_EXCEEDED');
	});
});
