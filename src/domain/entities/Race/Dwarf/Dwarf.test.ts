import {BuildingSheet} from '../../Sheet';
import {Transaction} from '../../Sheet/Transaction';
import {RaceAbilityName} from '../RaceAbilityName';
import {Dwarf} from './Dwarf';

describe('Dwarf', () => {
	let sheet: BuildingSheet;
	let transaction: Transaction;

	beforeEach(() => {
		sheet = new BuildingSheet();
		transaction = new Transaction(sheet);
	});

	it('should dispatch dwarf attributes modifiers appliance', () => {
		const dwarf = new Dwarf();
		dwarf.addToSheet(transaction);
		expect(sheet.getSheetAttributes().getValues()).toEqual({
			strength: 0,
			dexterity: -1,
			constitution: 2,
			intelligence: 0,
			wisdom: 1,
			charisma: 0,
		});
	});

	it('should dispatch rock knowledge appliance', () => {
		const dwarf = new Dwarf();
		dwarf.addToSheet(transaction);
		expect(sheet.getSheetAbilities().getRaceAbilities().get(RaceAbilityName.rockKnowledge)).toBeDefined();
	});

	it('should dispatch slow and always appliance', () => {
		const dwarf = new Dwarf();
		dwarf.addToSheet(transaction);
		expect(sheet.getSheetAbilities().getRaceAbilities().get(RaceAbilityName.slowAndAlways)).toBeDefined();
	});

	it('should dispatch Hard as Rock appliance', () => {
		const dwarf = new Dwarf();
		dwarf.addToSheet(transaction);
		expect(sheet.getSheetAbilities().getRaceAbilities().get(RaceAbilityName.hardAsRock)).toBeDefined();
	});

	it('should dispatch Heredrimm Tradition appliance', () => {
		const dwarf = new Dwarf();
		dwarf.addToSheet(transaction);
		expect(sheet.getSheetAbilities().getRaceAbilities().get(RaceAbilityName.heredrimmTradition)).toBeDefined();
	});
});
