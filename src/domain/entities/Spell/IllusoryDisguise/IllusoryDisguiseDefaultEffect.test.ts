import {SheetFake} from '../../Sheet/SheetFake';
import {IllusoryDisguiseDefaultEffect} from './IllusoryDisguiseDefaultEffect';
import {IllusoryDisguiseDefaultEffectExecution} from './IllusoryDisguiseDefaultEffectExecution';

describe('IllusoryDisguiseDefaultEffect', () => {
	it('should use mana', () => {
		const effect = new IllusoryDisguiseDefaultEffect();
		const execution = new IllusoryDisguiseDefaultEffectExecution();
		const sheet = new SheetFake();
		effect.activate(sheet, execution);

		expect(sheet.useMana).toHaveBeenCalledWith(1);
	});
});
