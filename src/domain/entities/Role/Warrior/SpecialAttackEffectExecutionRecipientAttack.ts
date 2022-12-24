import {TemporaryModifier} from '../../Modifier/TemporaryModifier';
import type {SheetInterface} from '../../SheetInterface';
import {RoleAbilityName} from '../RoleAbilityName';
import type {SpecialAttackEffectExecutionRecipientType} from './SpecialAttackEffectExecutionRecipient';
import {SpecialAttackEffectExecutionRecipient} from './SpecialAttackEffectExecutionRecipient';

export class SpecialAttackEffectExecutionRecipientAttack extends SpecialAttackEffectExecutionRecipient {
	type: SpecialAttackEffectExecutionRecipientType = 'attack';
	applyModifier(maxModifier: number, sheet: SheetInterface): void {
		sheet.addAttackTemporaryModifier(new TemporaryModifier(RoleAbilityName.specialAttack, maxModifier, 'next'));
	}
}
