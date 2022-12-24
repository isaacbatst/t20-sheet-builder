import {TemporaryModifier} from '../../Modifier/TemporaryModifier';
import {SheetFake} from '../../SheetFake';
import {SkillName} from '../../Skill/SkillName';
import {SpellName} from '../SpellName';
import {IllusoryDisguiseDefaultEffectExecution} from './IllusoryDisguiseDefaultEffectExecution';

describe('IllusoryDisguiseDefaultEffectExecution', () => {
	it('should add temporary cheat modifier', () => {
		const execution = new IllusoryDisguiseDefaultEffectExecution();
		const sheet = new SheetFake();
		execution.execute(sheet);

		expect(sheet.addSkillTemporaryModifier).toHaveBeenCalledWith(SkillName.cheat, new TemporaryModifier(SpellName.illusoryDisguise, 10, 'scene'));
	});
});
