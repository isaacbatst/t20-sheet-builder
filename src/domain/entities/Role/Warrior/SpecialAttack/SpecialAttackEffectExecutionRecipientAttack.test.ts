import {TemporaryModifier} from '../../../Modifier/TemporaryModifier';
import {SheetFake} from '../../../Sheet/SheetFake';
import {RoleAbilityName} from '../../RoleAbilityName';
import {SpecialAttackEffectExecutionRecipientAttack} from './SpecialAttackEffectExecutionRecipientAttack';

describe('SpecialAttackEffectExecutionRecipientAttack', () => {
	it('should add attack modifier', () => {
		const recipient = new SpecialAttackEffectExecutionRecipientAttack();
		const sheet = new SheetFake();
		recipient.applyModifier(4, sheet);

		expect(sheet.addAttackTemporaryModifier).toHaveBeenCalledWith(new TemporaryModifier(RoleAbilityName.specialAttack, 4, 'next'));
	});
});
