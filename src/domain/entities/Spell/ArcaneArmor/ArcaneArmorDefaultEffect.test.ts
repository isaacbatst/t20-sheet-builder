import {TemporaryModifier} from '../../Modifier/TemporaryModifier/TemporaryModifier';
import {SheetFake} from '../../Sheet/SheetFake';
import {ArcaneArmorDefaultEffect} from './ArcaneArmorDefaultEffect';
import {ArcaneArmorDefaultEffectExecution} from './ArcaneArmorDefaultEffectExecution';
import {SpellName} from '../SpellName';

describe('ArcaneArmorDefaultEffect', () => {
	it('should activate', () => {
		const effect = new ArcaneArmorDefaultEffect();
		const sheet = new SheetFake();
		const execution = new ArcaneArmorDefaultEffectExecution();
		effect.activate(sheet, execution);
		expect(sheet.addDefenseTemporaryModifier).toHaveBeenCalledWith(new TemporaryModifier(SpellName.arcaneArmor, 5, 'scene'));
	});

	it('should use mana', () => {
		const effect = new ArcaneArmorDefaultEffect();
		const sheet = new SheetFake();
		const execution = new ArcaneArmorDefaultEffectExecution();
		effect.activate(sheet, execution);
		expect(sheet.useMana).toHaveBeenCalledWith(1);
	});
});
