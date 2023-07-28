import {PassiveEffect} from '../../../Ability';
import {AddFixedModifierToSkill} from '../../../Action/AddFixedModifierToSkill';
import {FixedModifier} from '../../../Modifier';
import {type TransactionInterface} from '../../../Sheet/TransactionInterface';
import {SkillName} from '../../../Skill';
import {GrantedPowerName} from '../GrantedPowerName';

export class EmptyMindEffect extends PassiveEffect {
	override description = 'Você recebe +2 em Iniciativa, Percepção e Vontade.';

	constructor() {
		super(GrantedPowerName.emptyMind);
	}

	override apply(transaction: TransactionInterface): void {
		const modifier = new FixedModifier(this.source, 2);
		transaction.run(new AddFixedModifierToSkill({
			payload: {
				modifier,
				skill: SkillName.initiative,
			},
			transaction,
		}));
		transaction.run(new AddFixedModifierToSkill({
			payload: {
				modifier,
				skill: SkillName.perception,
			},
			transaction,
		}));
		transaction.run(new AddFixedModifierToSkill({
			payload: {
				modifier,
				skill: SkillName.will,
			},
			transaction,
		}));
	}
}
