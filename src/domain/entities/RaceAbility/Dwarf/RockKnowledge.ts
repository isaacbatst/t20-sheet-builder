import {AddOtherModifierToSkill} from '../../Action/AddOtherModifierToSkill';
import {ChangeVision} from '../../Action/ChangeVision';
import type {SheetInterface} from '../../SheetInterface';
import type {InGameContext} from '../../InGameContext';
import type {ModifierCondition} from '../../ModifierList';
import {SkillName} from '../../Skill/SkillName';
import {Vision} from '../../Vision';
import {RaceAbility} from '../RaceAbility';
import {RaceAbilityName} from '../RaceAbilityName';
import {ConditionalModifier} from '../../Modifier/ConditionalModifier';

export class RockKnowledge extends RaceAbility {
	private static readonly condition: ModifierCondition = {
		description: 'testes devem ser realizados no subterrâneo',
		verify: (context: InGameContext) => context.getCurrentLocation().isUnderground,
	};

	private static get skillModifier() {
		return 2;
	}

	constructor() {
		super(
			RaceAbilityName.rockKnowledge,
			'passive',
		);
	}

	apply(character: SheetInterface): void {
		character.dispatch(new ChangeVision({source: this.name, vision: Vision.dark}));

		const modifier = new ConditionalModifier(this.name, RockKnowledge.skillModifier, RockKnowledge.condition);

		character.dispatch(new AddOtherModifierToSkill({modifier, skill: SkillName.perception}));
		character.dispatch(new AddOtherModifierToSkill({modifier, skill: SkillName.survival}));
	}
}
