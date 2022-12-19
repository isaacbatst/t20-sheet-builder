import type {Attribute} from '../Attributes';
import type {AttributesCharacter} from '../Character';
import type {AttributeModifier} from '../Race';
import {SkillName} from './SkillName';

type SkillParams = {
	character: AttributesCharacter;
	attribute: Attribute;
	isTrained?: boolean;
	other?: number;
	name: string;
};

export class Skill {
	readonly name: SkillName;
	readonly attributeModifier: AttributeModifier;
	readonly otherPoints: number;
	isTrained: boolean;

	constructor(params: SkillParams) {
		this.name = new SkillName(params.name);
		this.isTrained = Boolean(params.isTrained);

		const characterAttributes = params.character.getAttributes();

		this.attributeModifier = {attribute: params.attribute, modifier: characterAttributes[params.attribute]};
		this.otherPoints = params.other ?? 0;
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
		return halfLevelPoints + this.attributeModifier.modifier + trainingPoints + this.otherPoints;
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
