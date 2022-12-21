import {ChangeDisplacement} from '../../Action/ChangeDisplacement';
import {CharacterFake} from '../../CharacterFake';
import {RaceAbilityName} from '../RaceAbilityName';
import {SlowAndAlways} from './SlowAndAlways';

describe('SlowAndAlways', () => {
	it('should dispatch displacement change', () => {
		const slowAndAlways = new SlowAndAlways();
		const character = new CharacterFake();
		slowAndAlways.apply(character);

		expect(character.dispatch).toHaveBeenCalledWith(new ChangeDisplacement({
			displacement: 6,
			source: RaceAbilityName.slowAndAlways,
		}));
	});
});
