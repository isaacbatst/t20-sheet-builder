import type {Attribute, Attributes} from '../Attributes';
import {BuildingSheetContext} from '../BuildingSheetContext';
import type {Context} from '../Context';
import type {Modifier} from '../ModifierOthers';
import {ModifierOthers} from '../ModifierOthers';

export type SkillParams = {
	attribute: Attribute;
	isTrained?: boolean;
	otherModifiers?: Modifier[];
};

export class Skill {
	readonly attribute: Attribute;
	readonly modifierOthers: ModifierOthers = new ModifierOthers(Skill.repeatedOtherModifierError);
	private isTrained: boolean;

	static get repeatedOtherModifierError() {
		return 'REPEATED_OTHER_SKILL_MODIFIER';
	}

	constructor(params: SkillParams) {
		this.isTrained = Boolean(params.isTrained);
		this.attribute = params.attribute;

		params.otherModifiers?.forEach(modifier => {
			this.modifierOthers.add(modifier);
		});
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

	getTotal(attributes: Attributes, level = 1, context: Context = new BuildingSheetContext()) {
		const halfLevelPoints = this.calculateHalfLevel(level);
		const trainingPoints = this.calculateTrainingPoints(level);
		const otherModifiersSum = this.modifierOthers.getTotal(context);
		return halfLevelPoints + attributes[this.attribute] + trainingPoints + otherModifiersSum;
	}

	getTrainingPoints(level = 1) {
		return this.calculateTrainingPoints(level);
	}

	private calculateTrainingPoints(level: number): number {
		if (!this.isTrained) {
			return 0;
		}

		if (level <= 6) {
			return 2;
		}

		if (level <= 14) {
			return 4;
		}

		return 6;
	}

	private calculateHalfLevel(characterLevel: number) {
		return Math.floor(characterLevel / 2);
	}
}
