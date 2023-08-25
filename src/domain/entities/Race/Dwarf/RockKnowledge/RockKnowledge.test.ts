import {InGameContextFake} from '../../../Context/InGameContextFake';
import {BuildingSheet} from '../../../Sheet';
import {Transaction} from '../../../Sheet/Transaction';
import {Vision} from '../../../Sheet/Vision';
import {SkillName} from '../../../Skill/SkillName';
import {RaceAbilityName} from '../../RaceAbilityName';
import {RaceName} from '../../RaceName';
import {RockKnowledge} from './RockKnowledge';

describe('RockKnowledge', () => {
	let sheet: BuildingSheet;
	let transaction: Transaction;

	beforeEach(() => {
		sheet = new BuildingSheet();
		transaction = new Transaction(sheet);
	});

	it('should provide dark vision', () => {
		const rockKnowledge = new RockKnowledge();
		rockKnowledge.addToSheet(transaction, RaceName.dwarf);
		expect(sheet.getSheetVision().getVision()).toBe(Vision.dark);
	});

	it('should dispatch +2 perception bonus', () => {
		const rockKnowledge = new RockKnowledge();
		rockKnowledge.addToSheet(transaction, RaceName.dwarf);
		const perceptionModifier = sheet.getSkills()[SkillName.perception].skill.contextualModifiers.get(RaceAbilityName.rockKnowledge);
		expect(perceptionModifier).toBeDefined();
		expect(perceptionModifier?.baseValue).toBe(2);
	});

	it('should dispatch +2 survival bonus', () => {
		const rockKnowledge = new RockKnowledge();
		rockKnowledge.addToSheet(transaction, RaceName.dwarf);
		const survivalModifier = sheet.getSkills()[SkillName.survival].skill.contextualModifiers.get(RaceAbilityName.rockKnowledge);
		expect(survivalModifier).toBeDefined();
		expect(survivalModifier?.baseValue).toBe(2);
	});

	it('should not activate bonus in game context outside underground', () => {
		const rockKnowledge = new RockKnowledge();
		rockKnowledge.addToSheet(transaction, RaceName.dwarf);

		const perceptionModifier = sheet.getSkills()[SkillName.perception].skill.contextualModifiers.get(RaceAbilityName.rockKnowledge);
		const survivalModifier = sheet.getSkills()[SkillName.survival].skill.contextualModifiers.get(RaceAbilityName.rockKnowledge);
		const context = new InGameContextFake();
		context.location.isUnderground = false;
		expect(survivalModifier?.condition.verify(context)).toBe(false);
		expect(perceptionModifier?.condition.verify(context)).toBe(false);
	});

	it('should activate bonus in game context inside underground', () => {
		const rockKnowledge = new RockKnowledge();
		rockKnowledge.addToSheet(transaction, RaceName.dwarf);
		const perceptionModifier = sheet.getSkills()[SkillName.perception].skill.contextualModifiers.get(RaceAbilityName.rockKnowledge);
		const survivalModifier = sheet.getSkills()[SkillName.survival].skill.contextualModifiers.get(RaceAbilityName.rockKnowledge);
		const context = new InGameContextFake();
		context.location.isUnderground = true;
		expect(survivalModifier?.condition.verify(context)).toBe(true);
		expect(perceptionModifier?.condition.verify(context)).toBe(true);
	});
});
