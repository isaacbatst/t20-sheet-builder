import {AddOtherModifierToSkill} from '../../Action/AddOtherModifierToSkill';
import {ChangeVision} from '../../Action/ChangeVision';
import type {BuildingSheetInterface} from '../../BuildingSheetInterface';
import type {InGameContext} from '../../InGameContext';
import {ConditionalModifier} from '../../Modifier/ConditionalModifier';
import type {ModifierCondition} from '../../ModifierList';
import {RaceName} from '../../Race/RaceName';
import type {Dispatch} from '../../SheetInterface';
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

	override addToSheet(sheet: BuildingSheetInterface, dispatch: Dispatch): void {
		super.addToSheet(sheet, dispatch, RaceName.dwarf);
	}

	protected applyEffects(sheet: BuildingSheetInterface, dispatch: Dispatch): void {
		const modifier = new ConditionalModifier(this.name, RockKnowledge.skillModifier, RockKnowledge.condition);
		dispatch(new ChangeVision({source: this.name, vision: Vision.dark}));
		dispatch(new AddOtherModifierToSkill({modifier, skill: SkillName.perception}));
		dispatch(new AddOtherModifierToSkill({modifier, skill: SkillName.survival}));
	}
}
