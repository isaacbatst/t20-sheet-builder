import {PassiveEffect} from '../../../Ability';
import {AddFixedModifierToSkill} from '../../../Action/AddFixedModifierToSkill';
import {FixedModifier} from '../../../Modifier';
import {type TransactionInterface} from '../../../Sheet/TransactionInterface';
import {SkillName} from '../../../Skill';
import {OriginPowerName} from '../OriginPowerName';

export class ArtisticDomainActingBonus extends PassiveEffect {
	static description = 'Você recebe +2 em testes de Atuação,';

	override description = 'Você recebe +2 em testes de Atuação,';

	constructor() {
		super(OriginPowerName.artisticDomain);
	}

	override apply(transaction: TransactionInterface): void {
		const fixed = new FixedModifier(this.source, 2);
		transaction.run(new AddFixedModifierToSkill({
			payload: {
				modifier: fixed,
				skill: SkillName.acting,
			},
			transaction,
		}));
	}
}
