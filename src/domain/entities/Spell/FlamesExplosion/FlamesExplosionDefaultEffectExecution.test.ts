import {AffectableAreaFake} from '../../Affectable/AffectableAreaFake';
import {SpellRoleFake} from '../../Role/SpellRolleFake';
import {RollerFake} from '../../Roller/RollerFake';
import {SheetFake} from '../../SheetFake';
import {FlamesExplosionDefaultEffectExecution} from './FlamesExplosionDefaultEffectExecution';

describe('FlamesExplosionDefaultEffectExecution', () => {
	it('should roll 2d6', () => {
		const roller = new RollerFake();
		const area = new AffectableAreaFake();
		const role = new SpellRoleFake();
		const execution = new FlamesExplosionDefaultEffectExecution(roller, area, role);
		const sheet = new SheetFake();
		execution.execute(sheet);

		expect(roller.roll).toHaveBeenCalledWith(2, 6);
	});

	it('should deal damage to area creatures', () => {
		const roller = new RollerFake();
		const area = new AffectableAreaFake();
		const role = new SpellRoleFake();
		const execution = new FlamesExplosionDefaultEffectExecution(roller, area, role);
		const sheet = new SheetFake();
		execution.execute(sheet);

		expect(area.creaturesInside[0].receiveDamage).toHaveBeenCalledWith(10, 'fire');
		expect(area.creaturesInside[1].receiveDamage).toHaveBeenCalledWith(5, 'fire');
	});
});
