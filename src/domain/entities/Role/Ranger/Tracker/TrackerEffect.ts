import {PassiveEffect} from '../../../Ability';
import {AddFixedModifierToSkill} from '../../../Action/AddFixedModifierToSkill';
import {FixedModifier} from '../../../Modifier';
import {type TransactionInterface} from '../../../Sheet/TransactionInterface';
import {SkillName} from '../../../Skill';
import {RoleAbilityName} from '../../RoleAbilityName';

export class TrackerEffect extends PassiveEffect {
	override description = 'Você recebe +2 em Sobrevivência.'
  + ' Além disso, pode se mover com seu deslocamento'
  + ' normal enquanto rastreia sem sofrer penalidades no'
  + ' teste de Sobrevivência.';

	constructor() {
		super(RoleAbilityName.tracker);
	}

	override apply(transaction: TransactionInterface): void {
		transaction.run(new AddFixedModifierToSkill({
			payload: {
				modifier: new FixedModifier(this.source, 2),
				skill: SkillName.survival,
			},
			transaction,
		}));
	}
}
