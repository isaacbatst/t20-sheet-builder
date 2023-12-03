import {PassiveEffect} from '../../../Ability';
import {AddFixedModifierToSkill} from '../../../Action/AddFixedModifierToSkill';
import {FixedModifier} from '../../../Modifier';
import {type TransactionInterface} from '../../../Sheet/TransactionInterface';
import {SkillName} from '../../../Skill';
import {GrantedPowerName} from '../GrantedPowerName';

export class AnalyticMindEffect extends PassiveEffect {
	static description = 'Você recebe +2 em Intuição, Investigação e Vontade.';
	override description = AnalyticMindEffect.description;

	constructor() {
		super(GrantedPowerName.analyticMind);
	}

	override apply(transaction: TransactionInterface): void {
		const modifier = new FixedModifier(this.source, 2);
		transaction.run(new AddFixedModifierToSkill({
			payload: {
				modifier,
				skill: SkillName.intuition,
			},
			transaction,
		}));
		transaction.run(new AddFixedModifierToSkill({
			payload: {
				modifier,
				skill: SkillName.investigation,
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
