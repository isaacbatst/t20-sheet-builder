import {InGameContextFake} from '../Context/InGameContextFake';
import {OutOfGameContext} from '../Context/OutOfGameContext';
import {ContextualModifier} from '../Modifier/ContextualModifier/ContextualModifier';
import {FixedModifier} from '../Modifier/FixedModifier/FixedModifier';
import {RaceAbilityName} from '../Race/RaceAbilityName';
import {BuildingSheetFake} from '../Sheet/BuildingSheet/BuildingSheetFake';
import {Skill} from './Skill';
import {SkillName} from './SkillName';
import {SkillTotalCalculatorFactory} from './SkillTotalCalculatorFactory';

describe('Skill', () => {
	let sheet: BuildingSheetFake;

	beforeEach(() => {
		sheet = new BuildingSheetFake();
	});

	it('should calculate level 1 untrained skill', () => {
		const skill = new Skill({
			name: SkillName.acrobatics,
			attribute: 'dexterity',
		});

		const calculator = SkillTotalCalculatorFactory.make(sheet.getSheetAttributes().getValues(), sheet.getLevel(), new OutOfGameContext());
		expect(skill.getTotal(calculator)).toBe(0);
	});

	it('should update total by training', () => {
		const skill = new Skill({
			name: SkillName.acrobatics,
			attribute: 'dexterity',
		});
		skill.train();
		const calculator = SkillTotalCalculatorFactory.make(sheet.getSheetAttributes().getValues(), sheet.getLevel(), new OutOfGameContext());
		expect(skill.getTotal(calculator)).toBe(2);
	});

	it('should calculate level 1 untrained skill with modifier', () => {
		sheet.getSheetAttributes().getValues().dexterity = 2;
		const skill = new Skill({
			name: SkillName.acrobatics,
			attribute: 'dexterity',
		});

		const calculator = SkillTotalCalculatorFactory.make(sheet.getSheetAttributes().getValues(), sheet.getLevel(), new OutOfGameContext());
		expect(skill.getTotal(calculator)).toBe(2);
	});

	it('should calculate level 1 trained skill', () => {
		const skill = new Skill({
			name: SkillName.acrobatics,
			isTrained: true,
			attribute: 'dexterity',
		});
		const sheetAttributes = sheet.getSheetAttributes().getValues();
		const calculator = SkillTotalCalculatorFactory.make(sheetAttributes, sheet.getLevel(), new OutOfGameContext());
		expect(skill.getTotal(calculator)).toBe(2);
	});

	it('should calculate level 1 trained skill with attribute modifier', () => {
		sheet.getSheetAttributes().getValues().dexterity = 2;

		const skill = new Skill({
			name: SkillName.acrobatics,
			isTrained: true,
			attribute: 'dexterity',
		});

		const calculator = SkillTotalCalculatorFactory.make(sheet.getSheetAttributes().getValues(), sheet.getLevel(), new OutOfGameContext());
		expect(skill.getTotal(calculator)).toBe(4);
	});

	it('should calculate level 1 trained skill with attribute modifier and fixed modifier', () => {
		sheet.getSheetAttributes().getValues().dexterity = 2;

		const skill = new Skill({
			name: SkillName.acrobatics,
			isTrained: true,
			attribute: 'dexterity',
		});
		skill.fixedModifiers.add(new FixedModifier(RaceAbilityName.versatile, 2));

		const calculator = SkillTotalCalculatorFactory.make(sheet.getSheetAttributes().getValues(), sheet.getLevel(), new OutOfGameContext());
		expect(skill.getTotal(calculator)).toBe(6);
	});

	it('should calculate level 10 trained skill with attribute modifier and fixed modifier', () => {
		sheet.getSheetAttributes().getValues().dexterity = 2;

		sheet.setLevel(10);
		const skill = new Skill({
			name: SkillName.acrobatics,
			isTrained: true,
			attribute: 'dexterity',
		});
		skill.fixedModifiers.add(new FixedModifier(RaceAbilityName.versatile, 2));

		const calculator = SkillTotalCalculatorFactory.make(sheet.getSheetAttributes().getValues(), sheet.getLevel(), new OutOfGameContext());
		expect(skill.getTotal(calculator)).toBe(13);
	});

	it('should calculate level 10 trained skill with attribute modifier, fixed modifier and contextual modifier using out of game context', () => {
		sheet.getSheetAttributes().getValues().dexterity = 2;

		sheet.setLevel(10);
		const skill = new Skill({
			name: SkillName.acrobatics,
			isTrained: true,
			attribute: 'dexterity',
		});
		skill.fixedModifiers.add(new FixedModifier(RaceAbilityName.versatile, 2));
		skill.contextualModifiers.add(new ContextualModifier({
			source: RaceAbilityName.rockKnowledge,
			value: 5,
			condition: {description: 'any', verify: context => context.getCurrentLocation()?.isUnderground ?? false},
		}));

		const calculator = SkillTotalCalculatorFactory.make(sheet.getSheetAttributes().getValues(), sheet.getLevel(), new OutOfGameContext());
		expect(skill.getTotal(calculator)).toBe(13);
	});

	it('should calculate level 10 trained skill with attribute modifier, fixed modifier and contextual modifier using in game context', () => {
		sheet.getSheetAttributes().getValues().dexterity = 2;
		sheet.setLevel(10);
		const skill = new Skill({
			name: SkillName.acrobatics,
			isTrained: true,
			attribute: 'dexterity',
		});
		skill.fixedModifiers.add(new FixedModifier(RaceAbilityName.versatile, 2));
		skill.contextualModifiers.add(new ContextualModifier({
			source: RaceAbilityName.rockKnowledge,
			value: 5,
			condition: {
				description: 'any', verify: context => context.getCurrentLocation()?.isUnderground ?? false,
			},
		}));
		const calculator = SkillTotalCalculatorFactory.make(
			sheet.getSheetAttributes().getValues(), sheet.getLevel(), new InGameContextFake(),
		);
		expect(skill.getTotal(calculator)).toBe(18);
	});
});
