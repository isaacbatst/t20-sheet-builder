import {TemporaryModifier} from '../../Modifier/TemporaryModifier';
import {SheetFake} from '../../SheetFake';
import {RoleAbilityName} from '../RoleAbilityName';
import {SpecialAttackEffectExecution} from './SpecialAttackEffectExecution';
import {SpecialAttackEffectExecutionRecipientAttack} from './SpecialAttackEffectExecutionRecipientAttack';
import {SpecialAttackEffectPlusFour} from './SpecialAttackEffectPlusFour';
import {SpecialAttackManaCost} from './SpecialAttackManaCost';

describe('SpecialAttackEffect', () => {
	it('should activate', () => {
		const effect = new SpecialAttackEffectPlusFour();
		const sheet = new SheetFake();
		const execution = new SpecialAttackEffectExecution(
			new SpecialAttackEffectExecutionRecipientAttack(),
			new SpecialAttackManaCost(1),
			sheet.getLevel(),
		);
		effect.activate(sheet, execution);
		expect(sheet.addAttackTemporaryModifier).toHaveBeenCalledWith(new TemporaryModifier(RoleAbilityName.specialAttack, 4, 'next'));
	});
});
