import {TemporaryModifier} from '../../../Modifier/TemporaryModifier';
import {SheetFake} from '../../../Sheet/SheetFake';
import {RoleAbilityName} from '../../RoleAbilityName';
import {SpecialAttackEffectExecutionRecipientDamage} from './SpecialAttackEffectExecutionRecipientDamage';

describe('SpecialAttackEffectExecutionRecipientDamage', () => {
	it('should add damage modifier', () => {
		const recipient = new SpecialAttackEffectExecutionRecipientDamage();
		const sheet = new SheetFake();
		recipient.applyModifier(4, sheet);

		expect(sheet.addDamageTemporaryModifier).toHaveBeenCalledWith(new TemporaryModifier(RoleAbilityName.specialAttack, 4, 'next'));
	});
});
