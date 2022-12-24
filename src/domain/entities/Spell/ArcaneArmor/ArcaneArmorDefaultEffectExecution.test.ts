import {TemporaryModifier} from '../../Modifier/TemporaryModifier';
import {SheetFake} from '../../Sheet/SheetFake';
import {ArcaneArmorDefaultEffectExecution} from './ArcaneArmorDefaultEffectExecution';
import {SpellName} from '../SpellName';

describe('ArcaneArmorDefaultEffectExecution', () => {
	it('should add defense temporary modifier', () => {
		const execution = new ArcaneArmorDefaultEffectExecution();
		const sheet = new SheetFake();
		execution.execute(sheet);

		expect(sheet.addDefenseTemporaryModifier).toHaveBeenCalledWith(new TemporaryModifier(SpellName.arcaneArmor, 5, 'scene'));
	});
});
