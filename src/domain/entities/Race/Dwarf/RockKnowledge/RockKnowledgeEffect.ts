import {PassiveEffect} from '../../../Ability/PassiveEffect';
import {AddContextualModifierToSkill} from '../../../Action/AddContextualModifierToSkill';
import {ChangeVision} from '../../../Action/ChangeVision';
import type {InGameContextInterface} from '../../../Context/InGameContextInterface';
import {ContextualModifier} from '../../../Modifier/ContextualModifier/ContextualModifier';
import type {ModifierCondition} from '../../../Modifier/ContextualModifier/ContextualModifiersListInterface';
import type {SheetBaseInterface} from '../../../Sheet/SheetBaseInterface';
import type {Dispatch} from '../../../Sheet/Transaction';
import {SkillName} from '../../../Skill/SkillName';
import {Vision} from '../../../Sheet/Vision';
import {RaceAbilityName} from '../../RaceAbilityName';

export class RockKnowledgeEffect extends PassiveEffect {
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

	applyToSheet(sheet: SheetBaseInterface, dispatch: Dispatch): void {
		const modifier = new ContextualModifier(this.source, RockKnowledgeEffect.skillModifier, RockKnowledgeEffect.condition);
		dispatch(new ChangeVision({source: this.source, vision: Vision.dark}), sheet);
		dispatch(new AddContextualModifierToSkill({modifier, skill: SkillName.perception}), sheet);
		dispatch(new AddContextualModifierToSkill({modifier, skill: SkillName.survival}), sheet);
	}
}
