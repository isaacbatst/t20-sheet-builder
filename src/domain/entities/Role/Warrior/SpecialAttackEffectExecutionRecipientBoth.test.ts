import {TemporaryModifier} from '../../Modifier/TemporaryModifier';
import {SheetFake} from '../../Sheet/SheetFake';
import {RoleAbilityName} from '../RoleAbilityName';
import {SpecialAttackEffectExecutionRecipientBoth} from './SpecialAttackEffectExecutionRecipientBoth';

describe('SpecialAttackEffectExecutionRecipientBoth', () => {
	it('should add damage modifier', () => {
		const recipient = new SpecialAttackEffectExecutionRecipientBoth();
		const sheet = new SheetFake();
		recipient.applyModifier(4, sheet);

		expect(sheet.addDamageTemporaryModifier).toHaveBeenCalledWith(new TemporaryModifier(RoleAbilityName.specialAttack, 2, 'next'));
		expect(sheet.addAttackTemporaryModifier).toHaveBeenCalledWith(new TemporaryModifier(RoleAbilityName.specialAttack, 2, 'next'));
	});
});
