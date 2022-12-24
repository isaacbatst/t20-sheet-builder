import type {AffectableArea} from '../../Affectable/AffectableArea';
import type {Attribute} from '../../Attributes';
import type {Roller} from '../../Roller/Roller';
import type {EffectExecution, SheetInterface} from '../../Sheet/SheetInterface';
import {SkillName} from '../../Skill/SkillName';
import {HalfResistanceDamageApplier} from '../HalfResistDamageApplier';
import {SpellResistanceDifficultyCalculator} from '../SpellResistanceDifficultyCalculator';

export class FlamesExplosionDefaultEffectExecution implements EffectExecution {
	constructor(
		readonly roller: Roller,
		readonly area: AffectableArea,
		readonly spellAttribute: Attribute,
	) {}

	execute(sheet: SheetInterface): void {
		const maxDamage = this.roller.roll(2, 6);
		const creatures = this.area.getCreaturesInside();
		const difficulty = SpellResistanceDifficultyCalculator.calculate(sheet, this.spellAttribute);

		const damageApplier = new HalfResistanceDamageApplier(maxDamage, difficulty, 'fire', SkillName.reflexes);

		creatures.forEach(creature => {
			damageApplier.apply(creature);
		});
	}
}
