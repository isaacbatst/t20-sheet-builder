import {TemporaryModifier} from '../../Modifier/TemporaryModifier/TemporaryModifier';
import type {EffectExecution, SheetInterface} from '../../Sheet/SheetInterface';
import {ArcaneArmorDefaultEffect} from './ArcaneArmorDefaultEffect';
import {SpellName} from '../SpellName';

export class ArcaneArmorDefaultEffectExecution implements EffectExecution {
	execute(sheet: SheetInterface): void {
		sheet.addDefenseTemporaryModifier(
			new TemporaryModifier(SpellName.arcaneArmor, ArcaneArmorDefaultEffect.defenseBonus, ArcaneArmorDefaultEffect.duration),
		);
	}
}
