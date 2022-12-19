import type {AttributeModifier} from '../Race';

type SkillParams = {
	name: string;
	characterLevel: number;
	attributeModifier: AttributeModifier;
	isTrained: boolean;
	other: number;
};

export class Skill {
	readonly name: string;
	readonly halfLevelPoints: number;
	readonly attributeModifier: AttributeModifier;
	readonly trainingPoints: number;
	readonly otherPoints: number;

	constructor(params: SkillParams) {
		this.name = params.name;
		this.attributeModifier = params.attributeModifier;
		this.otherPoints = params.other;
		this.trainingPoints = this.calculateTraining(params.isTrained, params.characterLevel);
		this.halfLevelPoints = this.calculateHalfLevel(params.characterLevel);
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
