import type {AffectableTargetCreature} from '../../Affectable/AffectableTarget';
import type {SpellRoleInterface} from '../../Role/SpellRole';
import type {Roller} from '../../Roller/Roller';
import type {EffectExecution, SheetInterface} from '../../Sheet/SheetInterface';
import {SkillName} from '../../Skill/SkillName';
import {HalfResistanceDamageApplier} from '../HalfResistDamageApplier';
import {SpellResistanceDifficultyCalculator} from '../SpellResistanceDifficultyCalculator';

export class MentalDaggerDefaultEffectExecution implements EffectExecution {
	constructor(
		readonly roller: Roller,
		readonly target: AffectableTargetCreature,
		readonly role: SpellRoleInterface,
	) {}

	execute(sheet: SheetInterface): void {
		const maxDamage = this.roller.roll(2, 6);
		const difficulty = SpellResistanceDifficultyCalculator.calculate(sheet, this.role);

		const damageApplier = new HalfResistanceDamageApplier(maxDamage, difficulty, 'psychic', SkillName.war);

		damageApplier.apply(this.target);
	}
}
