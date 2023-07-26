import type {AbilityName} from '../../Ability/Ability';
import {PassiveEffect} from '../../Ability/PassiveEffect';
import {AddFixedModifierToSkill} from '../../Action/AddFixedModifierToSkill';
import {SheetBuilderError} from '../../../errors/SheetBuilderError';
import {FixedModifier} from '../../Modifier/FixedModifier/FixedModifier';
import {type TransactionInterface} from '../../Sheet/TransactionInterface';
import {SkillName} from '../../Skill/SkillName';
import {OriginPowerName} from './OriginPowerName';

export class SpecialFriendEffect extends PassiveEffect {
	get description() {
		return 'Você recebe +5 em testes de Adestramento com animais.'
		+ ' Além disso, possui um animal de estimação'
		+ ' que o auxilia e o acompanha em suas aventuras. Em'
		+ ' termos de jogo, é um parceiro que fornece +2 em'
		+ ' uma perícia a sua escolha (exceto Luta ou Pontaria'
		+ ' e aprovada pelo mestre) e não conta em seu limite'
		+ ' de parceiros.';
	}

	constructor(source: AbilityName, readonly skill: SkillName) {
		super(source);
		this.validateSkill();
	}

	apply(transaction: TransactionInterface): void {
		transaction.run(new AddFixedModifierToSkill({
			payload: {
				modifier: new FixedModifier(OriginPowerName.specialFriend, 5),
				skill: SkillName.animalHandling,
			},
			transaction,
		}));

		transaction.run(new AddFixedModifierToSkill({
			payload: {
				modifier: new FixedModifier(OriginPowerName.specialFriend, 2),
				skill: this.skill,
			},
			transaction,
		}));
	}

	private validateSkill() {
		if (this.skill === SkillName.fight || this.skill === SkillName.aim) {
			throw new SheetBuilderError('INVALID_SKILL');
		}
	}
}
