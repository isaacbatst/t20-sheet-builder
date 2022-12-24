import type {Attribute, Attributes} from '../Attributes';
import {OutGameContext} from '../OutOfGameContext';
import type {Context} from '../Context';
import type {ModifierInterface} from '../ModifierList';
import {ModifiersList} from '../ModifierList';

export type SkillParams = {
	attribute: Attribute;
	isTrained?: boolean;
};

export class Skill {
	public static calculateTrainedSkillPoints(level = 1) {
		if (level <= 6) {
			return 2;
		}

		if (level <= 14) {
			return 4;
		}

		return 6;
	}

	readonly attribute: Attribute;
	private readonly others: ModifiersList = new ModifiersList();
	private isTrained: boolean;

	static get repeatedOtherModifierError() {
		return 'REPEATED_OTHER_SKILL_MODIFIER';
	}

	constructor(params: SkillParams) {
		this.isTrained = Boolean(params.isTrained);
		this.attribute = params.attribute;
	}

	addOtherModifier(modifier: ModifierInterface) {
		this.others.add(modifier);
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

	getTotal(attributes: Attributes, level = 1, context: Context = new OutGameContext()) {
		const halfLevelPoints = this.calculateHalfLevel(level);
		const trainingPoints = this.calculateTrainingPoings(level);
		const otherModifiersSum = this.others.getTotal(context);
		return halfLevelPoints + attributes[this.attribute] + trainingPoints + otherModifiersSum;
	}

	getSkillTrainingPoints(level = 1) {
		return this.calculateTrainingPoings(level);
	}

	getOthersModifiers() {
		return this.others.modifiers;
	}

	private calculateTrainingPoings(level: number): number {
		if (!this.isTrained) {
			return 0;
		}

		return Skill.calculateTrainedSkillPoints(level);
	}

	private calculateHalfLevel(level: number) {
		return Math.floor(level / 2);
	}
}
