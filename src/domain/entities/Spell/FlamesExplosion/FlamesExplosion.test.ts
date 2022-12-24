import {AffectableAreaFake} from '../../Affectable/AffectableAreaFake';
import {SpellRoleFake} from '../../Role/SpellRolleFake';
import {RollerFake} from '../../Roller/RollerFake';
import {SheetFake} from '../../SheetFake';
import {FlamesExplosion} from './FlamesExplosion';
import {FlamesExplosionDefaultEffectExecution} from './FlamesExplosionDefaultEffectExecution';

describe('FlameExplosion', () => {
	describe('FlameExplosionDefaultEffect', () => {
		it('should damage area to area creatures', () => {
			const roller = new RollerFake();
			const area = new AffectableAreaFake();
			const role = new SpellRoleFake();
			const execution = new FlamesExplosionDefaultEffectExecution(roller, area, role);
			const sheet = new SheetFake();
			const flamesExplosion = new FlamesExplosion();

			flamesExplosion.effects.default.activate(sheet, execution);

			expect(area.creaturesInside[0].receiveDamage).toHaveBeenCalledWith(10, 'fire');
			expect(area.creaturesInside[1].receiveDamage).toHaveBeenCalledWith(5, 'fire');
		});

		it('should use mana', () => {
			const roller = new RollerFake();
			const area = new AffectableAreaFake();
			const role = new SpellRoleFake();
			const execution = new FlamesExplosionDefaultEffectExecution(roller, area, role);
			const sheet = new SheetFake();
			const flamesExplosion = new FlamesExplosion();

			flamesExplosion.effects.default.activate(sheet, execution);

			expect(sheet.useMana).toHaveBeenCalledWith(1);
		});
	});
});
