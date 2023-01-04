import {ContextualModifiersList} from '../Modifier/ContextualModifier/ContextualModifierList';
import {FixedModifiersList} from '../Modifier/FixedModifier/FixedModifiersList';
import type {Attribute} from '../Sheet/Attributes';
import type {SkillTotalCalculator} from './SkillTotalCalculator';

export type SkillParams = {
	attribute: Attribute;
	isTrained?: boolean;
};

export class Skill {
	static calculateTrainedPoints(level = 1) {
		if (level <= 6) {
			return 2;
		}

		if (level <= 14) {
			return 4;
		}

		return 6;
	}

	static calculateTrainingPoints(level = 1, isTrained = false) {
		if (!isTrained) {
			return 0;
		}

		return Skill.calculateTrainedPoints(level);
	}

	static calculateLevelPoints(level: number) {
		return Math.floor(level / 2);
	}

	readonly attribute: Attribute;
	readonly contextualModifiers: ContextualModifiersList = new ContextualModifiersList();
	readonly fixedModifiers: FixedModifiersList = new FixedModifiersList();
	private isTrained: boolean;

	static get repeatedOtherModifierError() {
		return 'REPEATED_OTHER_SKILL_MODIFIER';
	}

	constructor(params: SkillParams) {
		this.isTrained = Boolean(params.isTrained);
		this.attribute = params.attribute;
	}

	train() {
		if (this.isTrained) {
			throw new Error('TRAINING_TRAINED_SKILL');
		}

		this.isTrained = true;
	}

	getIsTrained() {
		return this.isTrained;
	}

	getTotal(
		calculator: SkillTotalCalculator,
	) {
		return calculator.calculate(this);
	}

	getTrainingPoints(level = 1) {
		return Skill.calculateTrainingPoints(level, this.isTrained);
	}
}
