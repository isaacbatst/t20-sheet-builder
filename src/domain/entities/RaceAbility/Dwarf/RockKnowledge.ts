import {AddOtherModifierToSkill} from '../../Action/AddOtherModifierToSkill';
import {ChangeVision} from '../../Action/ChangeVision';
import type {SheetInterface} from '../../SheetInterface';
import type {InGameContext} from '../../InGameContext';
import type {ModifierCondition} from '../../ModifierOthers';
import {SkillName} from '../../Skill/SkillName';
import {Vision} from '../../Vision';
import {RaceAbility} from '../RaceAbility';
import {RaceAbilityName} from '../RaceAbilityName';

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
		character.dispatch(new AddOtherModifierToSkill({
			source: this.name,
			value: RockKnowledge.skillModifier,
			skill: SkillName.perception,
			condition: RockKnowledge.condition,
		}));
		character.dispatch(new AddOtherModifierToSkill({
			source: this.name,
			value: RockKnowledge.skillModifier,
			skill: SkillName.survival,
			condition: RockKnowledge.condition,
		}));
		// Character.addOtherModifierToSkill(
		// 	RaceAbilityNameEnum.rockKnowledge, 2, SkillNameEnum.perception, RockKnowledge.condition,
		// );
		// character.addOtherModifierToSkill(
		// 	RaceAbilityNameEnum.rockKnowledge, 2, SkillNameEnum.survival, RockKnowledge.condition,
		// );
	}
}
