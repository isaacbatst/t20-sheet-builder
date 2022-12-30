import type {Attribute, Attributes} from '../Sheet/Attributes';
import type {Level} from '../Sheet/Levels';
import {Skill} from './Skill';

export type SkillBaseCalculatorInterface = {
	calculate(attribute: Attribute, isTrained: boolean): number;
};

export class SkillBaseCalculator implements SkillBaseCalculatorInterface {
	constructor(
		readonly level: Level,
		readonly attributes: Attributes,
	) {}

	calculate(attribute: Attribute, isTrained: boolean): number {
		const trainingPoints = Skill.calculateTrainingPoints(this.level, isTrained);
		const levelPoints = Skill.calculateLevelPoints(this.level);
		return levelPoints + this.attributes[attribute] + trainingPoints;
	}
}
