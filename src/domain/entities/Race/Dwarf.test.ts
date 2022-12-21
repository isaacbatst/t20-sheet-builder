import {ApplyRaceAbility} from '../Action/ApplyRaceAbility';
import {ApplyRaceModifiers} from '../Action/ApplyRaceModifiers';
import {CharacterFake} from '../CharacterFake';
import {RockKnowledge} from '../RaceAbility/Dwarf/RockKnowledge';
import {Dwarf} from './Dwarf';

describe('Dwarf', () => {
	it('should dispatch dwarf attributes modifiers appliance', () => {
		const dwarf = new Dwarf();
		const character = new CharacterFake();

		dwarf.applyAttributesModifiers({
			charisma: 0,
			constitution: 0,
			dexterity: 0,
			intelligence: 0,
			strength: 0,
			wisdom: 0,
		}, character.dispatch);

		expect(character.dispatch).toHaveBeenCalledWith(new ApplyRaceModifiers({
			modifiers: {
				dexterity: -1,
				constitution: 2,
				wisdom: 1,
			},
			updatedAttributes: {
				dexterity: -1,
				constitution: 2,
				wisdom: 1,
			},
		}));
	});

	it('should dispatch rock knowledge appliance', () => {
		const dwarf = new Dwarf();
		const character = new CharacterFake();
		dwarf.applyAbilities(character);

		expect(character.dispatch).toHaveBeenCalledWith(new ApplyRaceAbility({
			ability: new RockKnowledge(),
		}));
	});
});
