import {describe, expect, it} from 'vitest';
import {WildEmpathy} from '../../Ability/common/WildEmpathy';
import {ApplyRaceAbility} from '../../Action/ApplyRaceAbility';
import {FixedModifier} from '../../Modifier';
import {BuildingSheet} from '../../Sheet/BuildingSheet/BuildingSheet';
import {Transaction} from '../../Sheet/Transaction';
import {SpellName} from '../../Spell';
import {RaceAbilityName} from '../RaceAbilityName';
import {Dahllan} from './Dahllan';

describe('Dahllan', () => {
	let sheet: BuildingSheet;
	let transaction: Transaction;

	beforeEach(() => {
		sheet = new BuildingSheet();
		transaction = new Transaction(sheet);
	});

	it('should apply +2 to wisdom, +1 to dexterity and -1 to intelligence', () => {
		const dahllan = new Dahllan();
		dahllan.addToSheet(transaction);
		expect(sheet.getSheetAttributes().getValues()).toEqual({
			strength: 0,
			dexterity: 1,
			constitution: 0,
			intelligence: -1,
			wisdom: 2,
			charisma: 0,
		});
	});

	it('should learn Control Plants', () => {
		const dahllan = new Dahllan();
		dahllan.addToSheet(transaction);
		const spells = transaction.sheet.getSheetSpells().getSpells();
		expect(spells.get(SpellName.controlPlants)).toBeDefined();
	});

	it('should have Allihanna Armor ability', () => {
		const dahllan = new Dahllan();
		dahllan.addToSheet(transaction);
		expect(transaction.sheet
			.getSheetAbilities()
			.getRaceAbilities()
			.has(RaceAbilityName.allihannaArmor)).toBeTruthy();
	});

	it('should have Wild Empathy ability', () => {
		const dahllan = new Dahllan();
		dahllan.addToSheet(transaction);
		expect(transaction.sheet
			.getSheetAbilities()
			.getRaceAbilities()
			.has(RaceAbilityName.wildEmpathy)).toBeTruthy();
	});

	it('should add animal handling bonus if apply repeated Wild Empathy', () => {
		const dahllan = new Dahllan();
		dahllan.addToSheet(transaction);
		transaction.run(new ApplyRaceAbility({
			payload: {
				ability: new WildEmpathy(),
				source: RaceAbilityName.wildEmpathy,
			},
			transaction,
		}));
		const {animalHandling} = transaction.sheet.getSheetSkills().getSkills();
		expect(animalHandling.fixedModifiers.modifiers).toHaveLength(1);
		expect(animalHandling.fixedModifiers.modifiers).toContainEqual(new FixedModifier(RaceAbilityName.wildEmpathy, 2));
	});
});
