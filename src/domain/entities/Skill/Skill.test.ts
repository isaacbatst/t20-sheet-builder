import {InGameContextFake} from '../Context/InGameContextFake';
import {ContextualModifier} from '../Modifier/ContextualModifier/ContextualModifier';
import {ContextualModifiersListTotalCalculator} from '../Modifier/ContextualModifier/ContextualModifiersListTotalCalculator';
import {FixedModifier} from '../Modifier/FixedModifier/FixedModifier';
import {FixedModifiersListTotalCalculator} from '../Modifier/FixedModifier/FixedModifiersListTotalCalculator';
import {OutOfGameContext} from '../Context/OutOfGameContext';
import {RaceAbilityName} from '../Race/RaceAbilityName';
import {BuildingSheetFake} from '../Sheet/BuildingSheetFake';
import {Skill} from './Skill';
import {SkillBaseCalculator} from './SkillBaseCalculator';
import {SkillTotalCalculatorFactory} from './SkillTotalCalculatorFactory';

describe('Skill', () => {
	it('should calculate level 1 untrained skill', () => {
		const sheet = new BuildingSheetFake();
		const skill = new Skill({
			attribute: 'dexterity',
		});

		const calculator = SkillTotalCalculatorFactory.make(sheet.getAttributes(), sheet.getLevel(), new OutOfGameContext());
		expect(skill.getTotal(calculator)).toBe(0);
	});

	it('should update total by training', () => {
		const sheet = new BuildingSheetFake();
		const skill = new Skill({
			attribute: 'dexterity',
		});
		skill.train();
		const calculator = SkillTotalCalculatorFactory.make(sheet.getAttributes(), sheet.getLevel(), new OutOfGameContext());
		expect(skill.getTotal(calculator)).toBe(2);
	});

	it('should calculate level 1 untrained skill with modifier', () => {
		const sheet = new BuildingSheetFake();
		sheet.attributes = {
			...sheet.attributes,
			dexterity: 2,
		};
		const skill = new Skill({
			attribute: 'dexterity',
		});

		const calculator = SkillTotalCalculatorFactory.make(sheet.getAttributes(), sheet.getLevel(), new OutOfGameContext());
		expect(skill.getTotal(calculator)).toBe(2);
	});

	it('should calculate level 1 trained skill', () => {
		const sheet = new BuildingSheetFake();

		const skill = new Skill({
			isTrained: true,
			attribute: 'dexterity',
		});
		const calculator = SkillTotalCalculatorFactory.make(sheet.getAttributes(), sheet.getLevel(), new OutOfGameContext());
		expect(skill.getTotal(calculator)).toBe(2);
	});

	it('should calculate level 1 trained skill with attribute modifier', () => {
		const sheet = new BuildingSheetFake();
		sheet.attributes = {
			...sheet.attributes,
			dexterity: 2,
		};

		const skill = new Skill({
			isTrained: true,
			attribute: 'dexterity',
		});

		const calculator = SkillTotalCalculatorFactory.make(sheet.getAttributes(), sheet.getLevel(), new OutOfGameContext());
		expect(skill.getTotal(calculator)).toBe(4);
	});

	it('should calculate level 1 trained skill with attribute modifier and fixed modifier', () => {
		const sheet = new BuildingSheetFake();
		sheet.attributes = {
			...sheet.attributes,
			dexterity: 2,
		};

		const skill = new Skill({
			isTrained: true,
			attribute: 'dexterity',
		});
		skill.fixedModifiers.add(new FixedModifier(RaceAbilityName.versatile, 2));

		const calculator = SkillTotalCalculatorFactory.make(sheet.getAttributes(), sheet.getLevel(), new OutOfGameContext());
		expect(skill.getTotal(calculator)).toBe(6);
	});

	it('should calculate level 10 trained skill with attribute modifier and fixed modifier', () => {
		const sheet = new BuildingSheetFake();
		sheet.attributes = {
			...sheet.attributes,
			dexterity: 2,
		};
		sheet.level = 10;
		const skill = new Skill({
			isTrained: true,
			attribute: 'dexterity',
		});
		skill.fixedModifiers.add(new FixedModifier(RaceAbilityName.versatile, 2));

		const calculator = SkillTotalCalculatorFactory.make(sheet.getAttributes(), sheet.getLevel(), new OutOfGameContext());
		expect(skill.getTotal(calculator)).toBe(13);
	});

	it('should calculate level 10 trained skill with attribute modifier, fixed modifier and contextual modifier using out of game context', () => {
		const sheet = new BuildingSheetFake();
		sheet.attributes = {
			...sheet.attributes,
			dexterity: 2,
		};
		sheet.level = 10;
		const skill = new Skill({
			isTrained: true,
			attribute: 'dexterity',
		});
		skill.fixedModifiers.add(new FixedModifier(RaceAbilityName.versatile, 2));
		skill.contextualModifiers.add(new ContextualModifier(RaceAbilityName.rockKnowledge, 5, {description: 'any', verify: context => context.getCurrentLocation().isUnderground}));

		const calculator = SkillTotalCalculatorFactory.make(sheet.getAttributes(), sheet.getLevel(), new OutOfGameContext());
		expect(skill.getTotal(calculator)).toBe(13);
	});

	it('should calculate level 10 trained skill with attribute modifier, fixed modifier and contextual modifier using in game context', () => {
		const sheet = new BuildingSheetFake();
		sheet.attributes = {
			...sheet.attributes,
			dexterity: 2,
		};
		sheet.level = 10;
		const skill = new Skill({
			isTrained: true,
			attribute: 'dexterity',
		});
		skill.fixedModifiers.add(new FixedModifier(RaceAbilityName.versatile, 2));
		skill.contextualModifiers.add(new ContextualModifier(RaceAbilityName.rockKnowledge, 5, {description: 'any', verify: context => context.getCurrentLocation().isUnderground}));

		const calculator = SkillTotalCalculatorFactory.make(sheet.getAttributes(), sheet.getLevel(), new InGameContextFake());
		expect(skill.getTotal(calculator)).toBe(18);
	});
});
