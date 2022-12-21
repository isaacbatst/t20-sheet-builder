import {AddOtherModifierToSkill} from '../../Action/AddOtherModifierToSkill';
import {ChangeVision} from '../../Action/ChangeVision';
import {BuildingSheetContext} from '../../BuildingSheetContext';
import type {ActionPayload} from '../../CharacterAction';
import {CharacterFake} from '../../CharacterFake';
import {InGameContext} from '../../InGameContext';
import type {ConditionVerify} from '../../ModifierOthers';
import {SkillName} from '../../Skill/SkillName';
import {Vision} from '../../Vision';
import {RaceAbilityName} from '../RaceAbilityName';
import {RockKnowledge} from './RockKnowledge';

describe('RockKnowledge', () => {
	it('should provide dark vision', () => {
		const rockKnowledge = new RockKnowledge();
		const character = new CharacterFake();
		rockKnowledge.apply(character);

		expect(character.dispatch).toHaveBeenCalledWith(new ChangeVision({
			source: RaceAbilityName.rockKnowledge,
			vision: Vision.dark,
		}));
	});

	it('should dispatch +2 perception bonus', () => {
		const rockKnowledge = new RockKnowledge();
		const character = new CharacterFake();
		rockKnowledge.apply(character);

		expect(character.dispatch).toHaveBeenCalledWith(expect.objectContaining(new AddOtherModifierToSkill({
			skill: SkillName.perception,
			source: RaceAbilityName.rockKnowledge,
			value: 2,
			condition: {description: 'testes devem ser realizados no subterrâneo', verify: expect.any(Function) as ConditionVerify},
		})));
	});

	it('should dispatch +2 survival bonus', () => {
		const rockKnowledge = new RockKnowledge();
		const character = new CharacterFake();
		rockKnowledge.apply(character);

		expect(character.dispatch).toHaveBeenCalledWith(expect.objectContaining(new AddOtherModifierToSkill({
			skill: SkillName.survival,
			source: RaceAbilityName.rockKnowledge,
			value: 2,
			condition: {description: 'testes devem ser realizados no subterrâneo', verify: expect.any(Function) as ConditionVerify},
		})));
	});

	it('should not activate bonus in game context outside underground', () => {
		const rockKnowledge = new RockKnowledge();
		const character = new CharacterFake();
		rockKnowledge.apply(character);
		const [_, secondStep, thirdStep] = character.progressionSteps;

		const verifyPerception = (secondStep.action.payload as ActionPayload<'addOtherModifierToSkill'>).condition!.verify;
		const verifySurvival = (thirdStep.action.payload as ActionPayload<'addOtherModifierToSkill'>).condition!.verify;

		expect(verifySurvival(new InGameContext({isUnderground: false}))).toBe(false);
		expect(verifyPerception(new InGameContext({isUnderground: false}))).toBe(false);
	});

	it('should activate bonus in game context inside underground', () => {
		const rockKnowledge = new RockKnowledge();
		const character = new CharacterFake();
		rockKnowledge.apply(character);
		const [_, secondStep, thirdStep] = character.progressionSteps;

		const verifyPerception = (secondStep.action.payload as ActionPayload<'addOtherModifierToSkill'>).condition!.verify;
		const verifySurvival = (thirdStep.action.payload as ActionPayload<'addOtherModifierToSkill'>).condition!.verify;

		expect(verifySurvival(new InGameContext({isUnderground: true}))).toBe(true);
		expect(verifyPerception(new InGameContext({isUnderground: true}))).toBe(true);
	});
});
