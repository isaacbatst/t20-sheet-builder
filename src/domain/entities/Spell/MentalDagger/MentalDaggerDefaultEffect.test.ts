import {EffectExecutionFake} from '../../EffectExecutionFake';
import {SheetFake} from '../../Sheet/SheetFake';
import {MentalDaggerDefaultEffect} from './MentalDaggerDefaultEffect';

describe('MentalDaggerDefaultEffect', () => {
	it('should use mana', () => {
		const effect = new MentalDaggerDefaultEffect();
		const execution = new EffectExecutionFake();
		const sheet = new SheetFake();
		effect.activate(sheet, execution);
		expect(sheet.useMana).toHaveBeenCalledWith(1);
	});
});
