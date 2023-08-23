import { type ContextInterface } from '../Context';
import { type ContextualModifierInterface } from '../Modifier/ContextualModifier/ContextualModifierInterface';
import { type ModifierInterface } from '../Modifier/ModifierInterface';
import { type SkillName } from '../Skill';
import { InitialSkillsGenerator } from '../Skill/InitialSkillsGenerator';
import { type Skill } from '../Skill/Skill';
import { type SkillTotalCalculator } from '../Skill/SkillTotalCalculator';
import { SkillTotalCalculatorFactory } from '../Skill/SkillTotalCalculatorFactory';
import { type SerializedSheetSkill, type SerializedSheetSkills } from './SerializedSheet/SerializedSheetInterface';
import { type SheetInterface } from './SheetInterface';
import { type SheetSkillsInterface } from './SheetSkillsInterface';

export class SheetSkills implements SheetSkillsInterface {
	readonly intelligenceSkills: SkillName[] = []

	constructor(
		private readonly skills = InitialSkillsGenerator.generate(),
	) {}

	trainSkill(name: SkillName): void {
		this.skills[name].train();
	}

	getSkill(name: SkillName): Skill {
		return this.skills[name];
	}

	addContextualModifierTo(skill: SkillName, modifier: ContextualModifierInterface): void {
		this.skills[skill].addContextualModifier(modifier);
	}

	addFixedModifierTo(skill: SkillName, modifier: ModifierInterface): void {
		this.skills[skill].addFixedModifier(modifier);
	}

	trainIntelligenceSkills(skills: SkillName[]): void {
		skills.forEach(skill => {
			this.skills[skill].train();
			this.intelligenceSkills.push(skill);
		});
	}

	getSkills(): Record<SkillName, Skill> {
		return this.skills;
	}

	serialize(sheet: SheetInterface, context: ContextInterface): SerializedSheetSkills {
		const attributes = sheet.getSheetAttributes().getValues();
		const level = sheet.getLevel();
		const calculator = SkillTotalCalculatorFactory.make(attributes, level, context);
		const entries = Object.entries(this.skills);
		const serialized = entries.reduce<SerializedSheetSkills>((acc, [skillName, skill]) => {
			acc.skills[skillName as SkillName] = this.serializeSkill(skill, calculator, sheet, context);
			return acc;
			// eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
		}, {} as SerializedSheetSkills);
		serialized.intelligenceSkills = this.intelligenceSkills;
		return serialized;
	}

	private serializeSkill(skill: Skill, totalCalculator: SkillTotalCalculator, sheet: SheetInterface, context: ContextInterface): SerializedSheetSkill {
		return {
			attribute: skill.attribute,
			contextualModifiers: skill.contextualModifiers.serialize(sheet, context),
			fixedModifiers: skill.fixedModifiers.serialize(sheet, context),
			isTrained: skill.getIsTrained(),
			total: skill.getTotal(totalCalculator),
			trainingPoints: skill.getTrainingPoints(),
		};
	}
}
