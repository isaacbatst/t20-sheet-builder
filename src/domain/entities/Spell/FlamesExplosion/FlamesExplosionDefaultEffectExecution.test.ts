import {AffectableAreaFake} from '../../Affectable/AffectableAreaFake';
import {RollerFake} from '../../Roller/RollerFake';
import {SheetFake} from '../../Sheet/SheetFake';
import {FlamesExplosionDefaultEffectExecution} from './FlamesExplosionDefaultEffectExecution';

describe('FlamesExplosionDefaultEffectExecution', () => {
	it('should roll 2d6', () => {
		const roller = new RollerFake();
		const area = new AffectableAreaFake();
		const execution = new FlamesExplosionDefaultEffectExecution(roller, area, 'charisma');
		const sheet = new SheetFake();
		execution.execute(sheet);

		expect(roller.roll).toHaveBeenCalledWith(2, 6);
	});

	it('should deal damage to area creatures', () => {
		const roller = new RollerFake();
		const area = new AffectableAreaFake();
		const execution = new FlamesExplosionDefaultEffectExecution(roller, area, 'charisma');
		const sheet = new SheetFake();
		execution.execute(sheet);

		expect(area.creaturesInside[0].receiveDamage).toHaveBeenCalledWith(10, 'fire');
		expect(area.creaturesInside[1].receiveDamage).toHaveBeenCalledWith(5, 'fire');
	});
});
