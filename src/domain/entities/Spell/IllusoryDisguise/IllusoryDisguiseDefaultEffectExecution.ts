import {TemporaryModifier} from '../../Modifier/TemporaryModifier';
import type {EffectExecution, SheetInterface} from '../../SheetInterface';
import {SkillName} from '../../Skill/SkillName';
import {SpellName} from '../SpellName';
import {IllusoryDisguiseDefaultEffect} from './IllusoryDisguiseDefaultEffect';

export class IllusoryDisguiseDefaultEffectExecution implements EffectExecution {
	execute(sheet: SheetInterface): void {
		sheet.addSkillTemporaryModifier(
			SkillName.cheat,
			new TemporaryModifier(SpellName.illusoryDisguise, IllusoryDisguiseDefaultEffect.modifierValue, IllusoryDisguiseDefaultEffect.duration),
		);
	}
}
