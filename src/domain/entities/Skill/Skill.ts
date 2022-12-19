import type {Attribute, Attributes} from '../Attributes';
import {ModifierOthers} from '../ModifierOthers';
import type {AttributeModifier} from '../Race/Race';
import {SkillName} from './SkillName';

type SkillParams = {
	characterAttributes: Attributes;
	attribute: Attribute;
	isTrained?: boolean;
	otherModifiers?: Array<{sourceName: string; value: number}>;
	name: string;
};

export class Skill {
	readonly name: SkillName;
	readonly attributeModifier: AttributeModifier;
	readonly modifierOthers: ModifierOthers = new ModifierOthers(Skill.repeatedOtherModifierError);
	private isTrained: boolean;

	static get repeatedOtherModifierError() {
		return 'REPEATED_OTHER_SKILL_MODIFIER';
	}

	constructor(params: SkillParams) {
		this.name = new SkillName(params.name);
		this.isTrained = Boolean(params.isTrained);

		this.attributeModifier = {attribute: params.attribute, modifier: params.characterAttributes[params.attribute]};

		params.otherModifiers?.forEach(modifier => {
			this.modifierOthers.addOtherModifier(modifier);
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

	getTotal(level = 1) {
		const halfLevelPoints = this.calculateHalfLevel(level);
		const trainingPoints = this.calculateTrainingPoints(level);
		const otherModifiersSum = this.modifierOthers.getTotal();
		return halfLevelPoints + this.attributeModifier.modifier + trainingPoints + otherModifiersSum;
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
