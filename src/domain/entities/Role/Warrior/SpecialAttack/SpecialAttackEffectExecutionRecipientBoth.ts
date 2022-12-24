import {TemporaryModifier} from '../../../Modifier/TemporaryModifier';
import type {SheetInterface} from '../../../Sheet/SheetInterface';
import {RoleAbilityName} from '../../RoleAbilityName';
import type {SpecialAttackEffectExecutionRecipientType} from './SpecialAttackEffectExecutionRecipient';
import {SpecialAttackEffectExecutionRecipient} from './SpecialAttackEffectExecutionRecipient';

export class SpecialAttackEffectExecutionRecipientBoth extends SpecialAttackEffectExecutionRecipient {
	type: SpecialAttackEffectExecutionRecipientType = 'damage';
	applyModifier(maxModifier: number, sheet: SheetInterface): void {
		sheet.addDamageTemporaryModifier(new TemporaryModifier(RoleAbilityName.specialAttack, maxModifier / 2, 'next'));
		sheet.addAttackTemporaryModifier(new TemporaryModifier(RoleAbilityName.specialAttack, maxModifier / 2, 'next'));
	}
}
