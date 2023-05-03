import {AddContextualModifierToSkill} from '../../../Action/AddContextualModifierToSkill';
import {ChangeVision} from '../../../Action/ChangeVision';
import {InGameContext} from '../../../Context/InGameContext';
import {ContextualModifier} from '../../../Modifier/ContextualModifier/ContextualModifier';
import type {ModifierConditionVerify} from '../../../Modifier/ContextualModifier/ContextualModifiersListInterface';
import {RaceName} from '../../RaceName';
import {BuildingSheetFake} from '../../../Sheet/BuildingSheetFake';
import type {ActionInterface} from '../../../Sheet/SheetActions';
import {SkillName} from '../../../Skill/SkillName';
import {Vision} from '../../../Sheet/Vision';
import {RaceAbilityName} from '../../RaceAbilityName';
import {RockKnowledge} from './RockKnowledge';
import {vi} from 'vitest';
import {InGameContextFake} from '../../../Context/InGameContextFake';

describe('RockKnowledge', () => {
	it('should provide dark vision', () => {
		const rockKnowledge = new RockKnowledge();
		const sheet = new BuildingSheetFake();
		const dispatch = vi.fn();
		rockKnowledge.addToSheet(sheet, dispatch, RaceName.dwarf);

		expect(dispatch).toHaveBeenCalledWith(new ChangeVision({
			source: RaceAbilityName.rockKnowledge,
			vision: Vision.dark,
		}), sheet);
	});

	it('should dispatch +2 perception bonus', () => {
		const rockKnowledge = new RockKnowledge();
		const sheet = new BuildingSheetFake();
		const dispatch = vi.fn();
		rockKnowledge.addToSheet(sheet, dispatch, RaceName.dwarf);

		expect(dispatch).toHaveBeenCalledWith(expect.objectContaining(new AddContextualModifierToSkill({
			modifier: new ContextualModifier(
				RaceAbilityName.rockKnowledge, 2, {
					description: 'testes devem ser realizados no subterrâneo',
					verify: expect.any(Function) as ModifierConditionVerify,
				}),
			skill: SkillName.perception,
		})), sheet);
	});

	it('should dispatch +2 survival bonus', () => {
		const rockKnowledge = new RockKnowledge();
		const sheet = new BuildingSheetFake();
		const dispatch = vi.fn();
		rockKnowledge.addToSheet(sheet, dispatch, RaceName.dwarf);

		expect(dispatch).toHaveBeenCalledWith(expect.objectContaining(new AddContextualModifierToSkill({
			skill: SkillName.survival,
			modifier: new ContextualModifier(
				RaceAbilityName.rockKnowledge, 2, {
					description: 'testes devem ser realizados no subterrâneo',
					verify: expect.any(Function) as ModifierConditionVerify,
				}),
		})), sheet);
	});

	it('should not activate bonus in game context outside underground', () => {
		const rockKnowledge = new RockKnowledge();
		const sheet = new BuildingSheetFake();
		const dispatch = vi.fn();
		rockKnowledge.addToSheet(sheet, dispatch, RaceName.dwarf);

		const perceptionCall = dispatch.mock.calls[2][0] as ActionInterface<'addContextualModifierToSkill'>;
		const survivalCall = dispatch.mock.calls[3][0] as ActionInterface<'addContextualModifierToSkill'>;

		const verifyPerception = (perceptionCall.payload).modifier.condition.verify;
		const verifySurvival = (survivalCall.payload).modifier.condition.verify;
		const context = new InGameContextFake();
		context.location.isUnderground = false;
		expect(verifySurvival(context)).toBe(false);
		expect(verifyPerception(context)).toBe(false);
	});

	it('should activate bonus in game context inside underground', () => {
		const rockKnowledge = new RockKnowledge();
		const sheet = new BuildingSheetFake();
		const dispatch = vi.fn();
		rockKnowledge.addToSheet(sheet, dispatch, RaceName.dwarf);

		const perceptionCall = dispatch.mock.calls[2][0] as ActionInterface<'addContextualModifierToSkill'>;
		const survivalCall = dispatch.mock.calls[3][0] as ActionInterface<'addContextualModifierToSkill'>;

		const verifyPerception = (perceptionCall.payload).modifier.condition.verify;
		const verifySurvival = (survivalCall.payload).modifier.condition.verify;
		const context = new InGameContextFake();

		expect(verifySurvival(context)).toBe(true);
		expect(verifyPerception(context)).toBe(true);
	});
});
