import {AffectableTargetCreatureFake} from '../../Affectable/AffectableTargetCreatureFake';
import {SpellRoleFake} from '../../Role/SpellRolleFake';
import {RollerFake} from '../../Roller/RollerFake';
import {SheetFake} from '../../SheetFake';
import {MentalDaggerDefaultEffectExecution} from './MentalDaggerDefaultEffectExecution';

describe('MentalDaggerDefaultEffectExecution', () => {
	it('should roll 2d6', () => {
		const roller = new RollerFake();
		const creature = new AffectableTargetCreatureFake();
		const role = new SpellRoleFake();
		const execution = new MentalDaggerDefaultEffectExecution(roller, creature, role);
		const sheet = new SheetFake();
		execution.execute(sheet);

		expect(roller.roll).toHaveBeenCalledWith(2, 6);
	});

	it('should deal damage to creature', () => {
		const roller = new RollerFake();
		const creature = new AffectableTargetCreatureFake();
		const role = new SpellRoleFake();
		const execution = new MentalDaggerDefaultEffectExecution(roller, creature, role);
		const sheet = new SheetFake();
		execution.execute(sheet);

		expect(creature.receiveDamage).toHaveBeenCalledWith(10, 'psychic');
	});
});
