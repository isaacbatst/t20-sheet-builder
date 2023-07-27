import {describe, expect, it} from 'vitest';
import {BuildingSheet, Vision} from '../../Sheet';
import {SheetBuilder} from '../../Sheet/SheetBuilder';
import {Goblin} from './Goblin';
import {RaceAbilityName} from '../RaceAbilityName';

describe('Elf', () => {
	let sheet: BuildingSheet;

	beforeEach(() => {
		sheet = new BuildingSheet();
		const goblin = new Goblin();
		const builder = new SheetBuilder(sheet);
		builder.chooseRace(goblin);
	});

	it('should apply +2 to dexterity, +1 to intelligence and -1 to charisma', () => {
		const attributes = sheet.getSheetAttributes().getValues();
		expect(attributes.strength).toBe(0);
		expect(attributes.dexterity).toBe(2);
		expect(attributes.constitution).toBe(0);
		expect(attributes.intelligence).toBe(1);
		expect(attributes.wisdom).toBe(0);
		expect(attributes.charisma).toBe(-1);
	});

	it('should have ingenious ability', () => {
		const abilities = sheet.getSheetAbilities().getRaceAbilities();
		expect(abilities.has(RaceAbilityName.ingenious)).toBe(true);
	});

	it('should have dark vision', () => {
		const vision = sheet.getSheetVision().getVision();
		expect(vision).toBe(Vision.dark);
	});

	it('should have climbing displacement equal to terrestrial displacement', () => {
		const displacement = sheet.getSheetDisplacement().getDisplacement();
		const climbingDisplacement = sheet.getSheetDisplacement().getClimbingDisplacement();
		expect(climbingDisplacement).toBe(displacement);
	});

	it('should have small size', () => {
		const size = sheet.getSheetSize().getSize();
		expect(size).toBe('small');
	});

	it('should have 9m displacement', () => {
		const displacement = sheet.getSheetDisplacement().getDisplacement();
		expect(displacement).toBe(9);
	});

	it('should add +2 modifier to fortitude', () => {
		const {fortitude} = sheet.getSheetSkills().getSkills();
		const modifier = fortitude.fixedModifiers.modifiers[0];
		expect(modifier.baseValue).toBe(2);
		expect(modifier.source).toBe(RaceAbilityName.streetRat);
	});
});
