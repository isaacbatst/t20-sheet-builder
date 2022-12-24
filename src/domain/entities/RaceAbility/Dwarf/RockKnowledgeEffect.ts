import {PassiveEffect} from '../../Ability/PassiveEffect';
import {AddOtherModifierToSkill} from '../../Action/AddOtherModifierToSkill';
import {ChangeVision} from '../../Action/ChangeVision';
import type {BuildingSheetInterface} from '../../BuildingSheetInterface';
import type {InGameContext} from '../../InGameContext';
import {ConditionalModifier} from '../../Modifier/ConditionalModifier';
import type {ModifierCondition} from '../../ModifierList';
import type {Dispatch} from '../../Sheet/SheetInterface';
import {SkillName} from '../../Skill/SkillName';
import {Vision} from '../../Vision';
import {RaceAbilityName} from '../RaceAbilityName';

export class RockKnowledgeEffect extends PassiveEffect {
	static readonly condition: ModifierCondition = {
		description: 'testes devem ser realizados no subterrâneo',
		verify: (context: InGameContext) => context.getCurrentLocation().isUnderground,
	};

	static get skillModifier() {
		return 2;
	}

	constructor() {
		super(RaceAbilityName.rockKnowledge);
	}

	addToSheet(sheet: BuildingSheetInterface, dispatch: Dispatch): void {
		const modifier = new ConditionalModifier(this.source, RockKnowledgeEffect.skillModifier, RockKnowledgeEffect.condition);
		dispatch(new ChangeVision({source: this.source, vision: Vision.dark}));
		dispatch(new AddOtherModifierToSkill({modifier, skill: SkillName.perception}));
		dispatch(new AddOtherModifierToSkill({modifier, skill: SkillName.survival}));
	}
}
