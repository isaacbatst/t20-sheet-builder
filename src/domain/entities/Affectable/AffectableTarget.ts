import type {Condition} from '../Condition/Condition';
import type {DamageType} from '../Damage/DamageType';
import type {SkillName} from '../Skill/SkillName';
import type {Affectable, AffectableType} from './Affectable';
export type TargetType = 'creature' | 'object' | 'self';
export type AffectableTargetInterface = Affectable & {
	targetType: TargetType;
};

export class AffectableTarget implements AffectableTargetInterface {
	get affectableType(): AffectableType {
		return 'target';
	}

	constructor(
		readonly targetType: TargetType,
	) {}
}

export abstract class AffectableTargetCreature extends AffectableTarget {
	constructor(
	) {
		super('creature');
	}

	abstract receiveDamage(damage: number, type: DamageType): void;
	abstract resist(difficulty: number, skill: SkillName): boolean;
	abstract setCondition(condition: Condition): void;
}
