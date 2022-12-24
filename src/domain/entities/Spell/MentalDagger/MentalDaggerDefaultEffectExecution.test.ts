import {AffectableTargetCreatureFake} from '../../Affectable/AffectableTargetCreatureFake';
import {RollerFake} from '../../Roller/RollerFake';
import {SheetFake} from '../../Sheet/SheetFake';
import {MentalDaggerDefaultEffectExecution} from './MentalDaggerDefaultEffectExecution';

describe('MentalDaggerDefaultEffectExecution', () => {
	it('should roll 2d6', () => {
		const roller = new RollerFake();
		const creature = new AffectableTargetCreatureFake();
		const execution = new MentalDaggerDefaultEffectExecution(roller, creature, 'charisma');
		const sheet = new SheetFake();
		execution.execute(sheet);

		expect(roller.roll).toHaveBeenCalledWith(2, 6);
	});

	it('should deal damage to creature', () => {
		const roller = new RollerFake();
		const creature = new AffectableTargetCreatureFake();
		const execution = new MentalDaggerDefaultEffectExecution(roller, creature, 'charisma');
		const sheet = new SheetFake();
		execution.execute(sheet);

		expect(creature.receiveDamage).toHaveBeenCalledWith(10, 'psychic');
	});
});
