import {describe, expect, it} from 'vitest';
import {FixedModifier, FixedModifiersListTotalCalculator, PerLevelModifiersListTotalCalculator} from '../../Modifier';
import {BuildingSheet, Level, Vision} from '../../Sheet';
import {SheetBuilder} from '../../Sheet/SheetBuilder';
import {Elf} from './Elf';
import {RaceAbilityName} from '../RaceAbilityName';

describe('Elf', () => {
	let sheet: BuildingSheet;

	beforeEach(() => {
		sheet = new BuildingSheet();
		const elf = new Elf();
		const builder = new SheetBuilder(sheet);
		builder.chooseRace(elf);
	});

	it('should apply +2 to intelligence, +1 to dexterity and -1 to constitution', () => {
		const attributes = sheet.getSheetAttributes().getValues();
		expect(attributes.strength).toBe(0);
		expect(attributes.dexterity).toBe(1);
		expect(attributes.constitution).toBe(-1);
		expect(attributes.intelligence).toBe(2);
		expect(attributes.wisdom).toBe(0);
		expect(attributes.charisma).toBe(0);
	});

	it('should change default displacement to 12m', () => {
		expect(sheet.getSheetDisplacement().getDisplacement()).toEqual(12);
	});

	it('should add +1 mana points per level modifier', () => {
		const modifiers = sheet.getSheetManaPoints().getPerLevelModifiers();
		expect(modifiers.modifiers).toHaveLength(1);
		expect(modifiers.modifiers[0].baseValue).toBe(1);
		expect(modifiers.modifiers[0].source).toBe(RaceAbilityName.magicBlood);
		expect(modifiers.getTotal(new PerLevelModifiersListTotalCalculator(sheet.getSheetAttributes().getValues(), Level.one))).toBe(1);
	});

	it('should have penumbra vision', () => {
		const vision = sheet.getSheetVision().getVision();
		expect(vision).toBe(Vision.penumbra);
	});

	it('should add +2 to mysticism and perception', () => {
		const skills = sheet.getSheetSkills().getSkills();
		const mysticismModifier = skills.mysticism.fixedModifiers.modifiers[0];
		const perceptionModifier = skills.perception.fixedModifiers.modifiers[0];
		expect(mysticismModifier.baseValue).toBe(2);
		expect(mysticismModifier.source).toBe(RaceAbilityName.elvenSenses);
		expect(perceptionModifier.baseValue).toBe(2);
		expect(perceptionModifier.source).toBe(RaceAbilityName.elvenSenses);
	});
});
