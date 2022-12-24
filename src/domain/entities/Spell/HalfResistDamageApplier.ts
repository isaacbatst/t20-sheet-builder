import type {AffectableTargetCreature} from '../Affectable/AffectableTarget';
import type {DamageType} from '../Damage/DamageType';
import type {SkillName} from '../Skill/SkillName';

export class HalfResistanceDamageApplier {
	constructor(
		readonly maxDamage: number,
		readonly difficulty: number,
		readonly damageType: DamageType,
		readonly resistSkill: SkillName,
	) {

	}

	apply(creature: AffectableTargetCreature) {
		const resisted = creature.resist(this.difficulty, this.resistSkill);

		if (resisted) {
			creature.receiveDamage(Math.floor(this.maxDamage / 2), this.damageType);
			return;
		}

		creature.receiveDamage(this.maxDamage, this.damageType);
	}
}
