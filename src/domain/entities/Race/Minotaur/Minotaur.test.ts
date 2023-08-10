import {describe, expect, it} from 'vitest';
import {BuildingSheet} from '../../Sheet';
import {SheetBuilder} from '../../Sheet/SheetBuilder';
import {Minotaur} from './Minotaur';
import {EquipmentName} from '../../Inventory';
import {DefenseTotalCalculatorFactory} from '../../Defense/DefenseTotalCalculatorFactory';

describe('Minotaur', () => {
	let sheet: BuildingSheet;

	beforeEach(() => {
		sheet = new BuildingSheet();
		const minotaur = new Minotaur();
		const builder = new SheetBuilder(sheet);
		builder.chooseRace(minotaur);
	});

	it('should apply +2 to strength, +1 to constitution and -1 to wisdom', () => {
		const attributes = sheet.getSheetAttributes().getValues();
		expect(attributes.strength).toBe(2);
		expect(attributes.dexterity).toBe(0);
		expect(attributes.constitution).toBe(1);
		expect(attributes.intelligence).toBe(0);
		expect(attributes.wisdom).toBe(-1);
		expect(attributes.charisma).toBe(0);
	});

	it('should have hornes as an attack', () => {
		const attackName: EquipmentName = EquipmentName.horns;
		const attacks = sheet.getAttacks();
		const hornsAttack = attacks.get(attackName);
		expect(hornsAttack).to.not.equal(null);
	});

	it('should have +1 in defense', () => {
		const defense = sheet.getSheetDefense().getDefense();
		const attributes = sheet.getSheetAttributes().getValues();
		const calculator = DefenseTotalCalculatorFactory.make(attributes, 0, 0);
		expect(defense.getTotal(calculator)).toBe(11);
	});
});
