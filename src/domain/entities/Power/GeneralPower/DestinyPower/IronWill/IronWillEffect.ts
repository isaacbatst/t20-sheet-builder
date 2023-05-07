import {PassiveEffect} from '../../../../Ability/PassiveEffect';
import {AddFixedModifierToSkill} from '../../../../Action/AddFixedModifierToSkill';
import {AddPerLevelModifierToManaPoints} from '../../../../Action/AddPerLevelModifierToManaPoints';
import {FixedModifier} from '../../../../Modifier/FixedModifier/FixedModifier';
import {PerLevelModifier} from '../../../../Modifier/PerLevelModifier/PerLevelModifier';
import type {SheetBaseInterface} from '../../../../Sheet/SheetBaseInterface';
import {SkillName} from '../../../../Skill/SkillName';
import type {Dispatch} from '../../../../Sheet/Transaction';

export class IronWillEffect extends PassiveEffect {
	applyToSheet(sheet: SheetBaseInterface, dispatch: Dispatch): void {
		dispatch(new AddPerLevelModifierToManaPoints({
			modifier: new PerLevelModifier(
				this.source,
				1,
				true,
				new Set(),
				2,
			),
		}), sheet);

		dispatch(new AddFixedModifierToSkill({
			modifier: new FixedModifier(this.source, 2),
			skill: SkillName.will,
		}), sheet);
	}
}
