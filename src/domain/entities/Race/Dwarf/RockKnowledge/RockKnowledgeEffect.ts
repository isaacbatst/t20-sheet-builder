import {PassiveEffect} from '../../../Ability/PassiveEffect';
import {AddContextualModifierToSkill} from '../../../Action/AddContextualModifierToSkill';
import {ChangeVision} from '../../../Action/ChangeVision';
import type {InGameContextInterface} from '../../../Context/InGameContextInterface';
import {ContextualModifier} from '../../../Modifier/ContextualModifier/ContextualModifier';
import type {ModifierCondition} from '../../../Modifier/ContextualModifier/ContextualModifiersListInterface';
import {type TransactionInterface} from '../../../Sheet/TransactionInterface';
import {Vision} from '../../../Sheet/Vision';
import {SkillName} from '../../../Skill/SkillName';
import {RaceAbilityName} from '../../RaceAbilityName';

export class RockKnowledgeEffect extends PassiveEffect {
	get description() {
		return 'Você recebe visão no escuro e +2 em testes de Percepção e Sobrevivência realizados no subterrâneo.';
	}

	static readonly condition: ModifierCondition = {
		description: 'testes devem ser realizados no subterrâneo',
		verify: (context: InGameContextInterface) => context.getCurrentLocation().isUnderground,
	};

	static get skillModifier() {
		return 2;
	}

	constructor() {
		super(RaceAbilityName.rockKnowledge);
	}

	apply(transaction: TransactionInterface): void {
		const modifier = new ContextualModifier({
			source: this.source,
			value: RockKnowledgeEffect.skillModifier,
			condition: RockKnowledgeEffect.condition,
		});
		transaction.run(new ChangeVision({payload: {source: this.source, vision: Vision.dark}, transaction}));
		transaction.run(new AddContextualModifierToSkill({payload: {modifier, skill: SkillName.perception}, transaction}));
		transaction.run(new AddContextualModifierToSkill({payload: {modifier, skill: SkillName.survival}, transaction}));
	}
}
