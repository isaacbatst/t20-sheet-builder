import {AffectableTargetCreatureFake} from '../../Affectable/AffectableTargetCreatureFake';
import {RollerFake} from '../../Roller/RollerFake';
import {SheetFake} from '../../Sheet/SheetFake';
import {MentalDagger} from './MentalDagger';
import {MentalDaggerDefaultEffectExecution} from './MentalDaggerDefaultEffectExecution';

describe('MentalDagger', () => {
	describe('MentalDaggerDefaultEffect', () => {
		it('should damage area to area creatures', () => {
			const roller = new RollerFake();
			const creature = new AffectableTargetCreatureFake();
			const execution = new MentalDaggerDefaultEffectExecution(roller, creature, 'charisma');
			const sheet = new SheetFake();
			const flamesExplosion = new MentalDagger();

			flamesExplosion.effects.default.activate(sheet, execution);

			expect(creature.receiveDamage).toHaveBeenCalledWith(10, 'psychic');
		});

		it('should use mana', () => {
			const roller = new RollerFake();
			const creature = new AffectableTargetCreatureFake();
			const execution = new MentalDaggerDefaultEffectExecution(roller, creature, 'charisma');
			const sheet = new SheetFake();
			const flamesExplosion = new MentalDagger();

			flamesExplosion.effects.default.activate(sheet, execution);

			expect(sheet.useMana).toHaveBeenCalledWith(1);
		});
	});
});
