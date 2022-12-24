import {EffectExecutionFake} from '../../EffectExecutionFake';
import {SheetFake} from '../../SheetFake';
import {FlamesExplosionDefaultEffect} from './FlamesExplosionDefaultEffect';

describe('FlameExplosionDefaultEffect', () => {
	it('should use mana', () => {
		const sheet = new SheetFake();
		const execution = new EffectExecutionFake();
		const effect = new FlamesExplosionDefaultEffect();
		effect.activate(sheet, execution);

		expect(sheet.useMana).toHaveBeenCalledWith(1);
	});
});
