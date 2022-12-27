import {TemporaryModifier} from '../../../Modifier/TemporaryModifier/TemporaryModifier';
import {SheetFake} from '../../../Sheet/SheetFake';
import {RoleAbilityName} from '../../RoleAbilityName';
import {SpecialAttackEffectExecution} from './SpecialAttackEffectExecution';
import {SpecialAttackEffectExecutionRecipientAttack} from './SpecialAttackEffectExecutionRecipientAttack';
import {SpecialAttackManaCost} from './SpecialAttackManaCost';

describe('SpecialAttackEffectExecution', () => {
	it('should execute', () => {
		const execution = new SpecialAttackEffectExecution(new SpecialAttackEffectExecutionRecipientAttack(), new SpecialAttackManaCost(1), 1);
		const sheet = new SheetFake();
		execution.execute(sheet);

		expect(sheet.addAttackTemporaryModifier).toHaveBeenCalledWith(new TemporaryModifier(RoleAbilityName.specialAttack, 4, 'next'));
	});

	it('should not execute with forbidden cost for level', () => {
		expect(() => {
			const execution = new SpecialAttackEffectExecution(new SpecialAttackEffectExecutionRecipientAttack(), new SpecialAttackManaCost(2), 1);
		}).toThrow('FORBIDDEN_COST_FOR_LEVEL');
	});
});
