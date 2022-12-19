import type {Attribute} from '../Attributes';
import type {Character} from '../Character';
import type {AttributeModifier} from '../Race';

type SkillParams = {
	character: Character;
	attribute: Attribute;
	isTrained?: boolean;
	other?: number;
};

export class Skill {
	readonly halfLevelPoints: number;
	readonly attributeModifier: AttributeModifier;
	readonly trainingPoints: number;
	readonly otherPoints: number;

	constructor(params: SkillParams) {
		const characterAttributes = params.character.getAttributes();
		const characterLevel = params.character.getLevel();

		this.attributeModifier = {attribute: params.attribute, modifier: characterAttributes[params.attribute]};
		this.otherPoints = params.other ?? 0;
		this.trainingPoints = this.calculateTraining(params.isTrained ?? false, characterLevel);
		this.halfLevelPoints = this.calculateHalfLevel(characterLevel);
	}

	getTotal() {
		return this.halfLevelPoints + this.attributeModifier.modifier + this.trainingPoints + this.otherPoints;
	}

	private calculateTraining(isTrained: boolean, level: number): number {
		if (!isTrained) {
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
