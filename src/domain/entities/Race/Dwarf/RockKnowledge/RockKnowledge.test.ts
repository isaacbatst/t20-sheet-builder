import {AddContextualModifierToSkill} from '../../../Action/AddContextualModifierToSkill';
import {ChangeVision} from '../../../Action/ChangeVision';
import {InGameContextFake} from '../../../Context/InGameContextFake';
import {ContextualModifier} from '../../../Modifier/ContextualModifier/ContextualModifier';
import type {ModifierConditionVerify} from '../../../Modifier/ContextualModifier/ContextualModifiersListInterface';
import type {ActionInterface} from '../../../Sheet/SheetActions';
import {TransactionFake} from '../../../Sheet/TransactionFake';
import {Vision} from '../../../Sheet/Vision';
import {SkillName} from '../../../Skill/SkillName';
import {RaceAbilityName} from '../../RaceAbilityName';
import {RaceName} from '../../RaceName';
import {RockKnowledge} from './RockKnowledge';

describe('RockKnowledge', () => {
	it('should provide dark vision', () => {
		const rockKnowledge = new RockKnowledge();
		const transaction = new TransactionFake();
		rockKnowledge.addToSheet(transaction, RaceName.dwarf);

		expect(transaction.run).toHaveBeenCalledWith(new ChangeVision({
			payload: {
				source: RaceAbilityName.rockKnowledge,
				vision: Vision.dark,
			},
			transaction,
		}));
	});

	it('should dispatch +2 perception bonus', () => {
		const rockKnowledge = new RockKnowledge();
		const transaction = new TransactionFake();
		rockKnowledge.addToSheet(transaction, RaceName.dwarf);

		expect(transaction.run).toHaveBeenCalledWith(expect.objectContaining(new AddContextualModifierToSkill({
			payload: {
				modifier: new ContextualModifier(
					RaceAbilityName.rockKnowledge, 2, {
						description: 'testes devem ser realizados no subterrâneo',
						verify: expect.any(Function) as ModifierConditionVerify,
					}),
				skill: SkillName.perception,
			},
			transaction,
		})));
	});

	it('should dispatch +2 survival bonus', () => {
		const rockKnowledge = new RockKnowledge();
		const transaction = new TransactionFake();
		rockKnowledge.addToSheet(transaction, RaceName.dwarf);

		expect(transaction.run).toHaveBeenCalledWith(expect.objectContaining(new AddContextualModifierToSkill({
			payload: {
				skill: SkillName.survival,
				modifier: new ContextualModifier(
					RaceAbilityName.rockKnowledge, 2, {
						description: 'testes devem ser realizados no subterrâneo',
						verify: expect.any(Function) as ModifierConditionVerify,
					}),
			},
			transaction,
		})));
	});

	it('should not activate bonus in game context outside underground', () => {
		const rockKnowledge = new RockKnowledge();
		const transaction = new TransactionFake();
		rockKnowledge.addToSheet(transaction, RaceName.dwarf);
		const perceptionCall = transaction.run.mock.calls[1][0] as ActionInterface<'addContextualModifierToSkill'>;
		const survivalCall = transaction.run.mock.calls[2][0] as ActionInterface<'addContextualModifierToSkill'>;

		const verifyPerception = (perceptionCall.payload).modifier.condition.verify;
		const verifySurvival = (survivalCall.payload).modifier.condition.verify;
		const context = new InGameContextFake();
		context.location.isUnderground = false;
		expect(verifySurvival(context)).toBe(false);
		expect(verifyPerception(context)).toBe(false);
	});

	it('should activate bonus in game context inside underground', () => {
		const rockKnowledge = new RockKnowledge();
		const transaction = new TransactionFake();
		rockKnowledge.addToSheet(transaction, RaceName.dwarf);

		const perceptionCall = transaction.run.mock.calls[1][0] as ActionInterface<'addContextualModifierToSkill'>;
		const survivalCall = transaction.run.mock.calls[2][0] as ActionInterface<'addContextualModifierToSkill'>;

		const verifyPerception = (perceptionCall.payload).modifier.condition.verify;
		const verifySurvival = (survivalCall.payload).modifier.condition.verify;
		const context = new InGameContextFake();

		expect(verifySurvival(context)).toBe(true);
		expect(verifyPerception(context)).toBe(true);
	});
});
