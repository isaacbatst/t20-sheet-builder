import {BuildingSheet} from '../../Sheet';
import {Transaction} from '../../Sheet/Transaction';
import {SkillName} from '../../Skill/SkillName';
import {ArcaneArmor, IllusoryDisguise, SpellName, SpellSchool} from '../../Spell';
import {RoleAbilityName} from '../RoleAbilityName';
import {Bard} from './Bard';

describe('Bard', () => {
	let sheet: BuildingSheet;
	let transaction: Transaction;

	beforeEach(() => {
		sheet = new BuildingSheet();
		transaction = new Transaction(sheet);
		const chosenSkills = [SkillName.acrobatics, SkillName.animalRide, SkillName.knowledge, SkillName.diplomacy, SkillName.cheat, SkillName.stealth];
		const chosenSchools = [SpellSchool.abjuration, SpellSchool.illusion, SpellSchool.divination];
		const chosenSpells = [new ArcaneArmor(), new IllusoryDisguise()];
		const bard = new Bard(chosenSkills, chosenSchools, chosenSpells);
		bard.addToSheet(transaction);
	});

	it('should have inspiration', () => {
		expect(sheet.getSheetAbilities().getRoleAbilities()
			.get(RoleAbilityName.inspiration)).toBeDefined();
	});

	it('should have bard spells', () => {
		expect(sheet.getSheetAbilities().getRoleAbilities()
			.get(RoleAbilityName.bardSpells)).toBeDefined();
	});

	it('should choose 3 spell schools', () => {
		const learnedSchools = sheet.getSheetSpells().getLearnedSchools();
		expect(learnedSchools.arcane).toHaveLength(3);
		expect(learnedSchools.arcane).toEqual(new Set([
			SpellSchool.abjuration,
			SpellSchool.illusion,
			SpellSchool.divination,
		]));
	});

	it('should learn 2 spells', () => {
		const spells = sheet.getSheetSpells().getSpells();
		expect(spells).toHaveLength(2);
		expect(spells.get(SpellName.arcaneArmor)).toBeDefined();
		expect(spells.get(SpellName.illusoryDisguise)).toBeDefined();
	});

	it('should have charisma modifier for mana', () => {
		const modifiers = sheet.getSheetManaPoints().getFixedModifiers();
		const charismaModifier = modifiers.get(RoleAbilityName.bardSpells);
		expect(charismaModifier).toBeDefined();
		expect(charismaModifier?.attributeBonuses).toEqual(['charisma']);
	});
});
