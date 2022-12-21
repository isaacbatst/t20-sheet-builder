import {AddOtherModifierToSkill} from '../../Action/AddOtherModifierToSkill';
import {ChangeVision} from '../../Action/ChangeVision';
import {BuildContext} from '../../BuildContext';
import type {ActionPayload} from '../../CharacterAction';
import {CharacterFake} from '../../CharacterFake';
import {InGameContext} from '../../InGameContext';
import type {ConditionVerify} from '../../ModifierOthers';
import {SkillNameEnum} from '../../Skill/SkillName';
import {Vision} from '../../Vision';
import {RaceAbilityNameEnum} from '../RaceAbilityName';
import {RockKnowledge} from './RockKnowledge';

describe('RockKnowledge', () => {
	it('should provide dark vision', () => {
		const rockKnowledge = new RockKnowledge();
		const character = new CharacterFake();
		rockKnowledge.apply(character);

		expect(character.dispatch).toHaveBeenCalledWith(new ChangeVision({
			source: RaceAbilityNameEnum.rockKnowledge,
			vision: Vision.dark,
		}));
	});

	it('should dispatch +2 perception bonus', () => {
		const rockKnowledge = new RockKnowledge();
		const character = new CharacterFake();
		rockKnowledge.apply(character);

		expect(character.dispatch).toHaveBeenCalledWith(expect.objectContaining(new AddOtherModifierToSkill({
			skill: SkillNameEnum.perception,
			source: RaceAbilityNameEnum.rockKnowledge,
			value: 2,
			condition: {description: 'testes realizados no subterrâneo', verify: expect.any(Function) as ConditionVerify},
		})));
	});

	it('should dispatch +2 survival bonus', () => {
		const rockKnowledge = new RockKnowledge();
		const character = new CharacterFake();
		rockKnowledge.apply(character);

		expect(character.dispatch).toHaveBeenCalledWith(expect.objectContaining(new AddOtherModifierToSkill({
			skill: SkillNameEnum.survival,
			source: RaceAbilityNameEnum.rockKnowledge,
			value: 2,
			condition: {description: 'testes realizados no subterrâneo', verify: expect.any(Function) as ConditionVerify},
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
