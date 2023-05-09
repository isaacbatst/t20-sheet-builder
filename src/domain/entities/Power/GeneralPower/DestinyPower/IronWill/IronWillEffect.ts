import {PassiveEffect} from '../../../../Ability/PassiveEffect';
import {AddFixedModifierToSkill} from '../../../../Action/AddFixedModifierToSkill';
import {AddPerLevelModifierToManaPoints} from '../../../../Action/AddPerLevelModifierToManaPoints';
import {FixedModifier} from '../../../../Modifier/FixedModifier/FixedModifier';
import {PerLevelModifier} from '../../../../Modifier/PerLevelModifier/PerLevelModifier';
import {type TransactionInterface} from '../../../../Sheet/TransactionInterface';
import {SkillName} from '../../../../Skill/SkillName';

export class IronWillEffect extends PassiveEffect {
	applyToSheet(transaction: TransactionInterface): void {
		transaction.run(new AddPerLevelModifierToManaPoints({
			payload: {
				modifier: new PerLevelModifier(
					this.source,
					1,
					true,
					new Set(),
					2,
				),
			},
			transaction,
		}));

		transaction.run(new AddFixedModifierToSkill({
			payload: {
				modifier: new FixedModifier(this.source, 2),
				skill: SkillName.will,
			},
			transaction,
		}));
	}
}
