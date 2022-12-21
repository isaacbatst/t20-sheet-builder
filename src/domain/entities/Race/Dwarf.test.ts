import {ApplyRaceAbility} from '../Action/ApplyRaceAbility';
import {ApplyRaceModifiers} from '../Action/ApplyRaceModifiers';
import {SheetFake} from '../SheetFake';
import {RockKnowledge} from '../RaceAbility/Dwarf/RockKnowledge';
import {SlowAndAlways} from '../RaceAbility/Dwarf/SlowAndAlways';
import {Dwarf} from './Dwarf';
import {HardAsRock} from '../RaceAbility/Dwarf/HardAsRock';

describe('Dwarf', () => {
	it('should dispatch dwarf attributes modifiers appliance', () => {
		const dwarf = new Dwarf();
		const sheet = new SheetFake();

		dwarf.applyAttributesModifiers({
			charisma: 0,
			constitution: 0,
			dexterity: 0,
			intelligence: 0,
			strength: 0,
			wisdom: 0,
		}, sheet.dispatch);

		expect(sheet.dispatch).toHaveBeenCalledWith(new ApplyRaceModifiers({
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
		const sheet = new SheetFake();
		dwarf.applyAbilities(sheet);

		expect(sheet.dispatch).toHaveBeenCalledWith(new ApplyRaceAbility({
			ability: new RockKnowledge(),
		}));
	});

	it('should dispatch slow and always appliance', () => {
		const dwarf = new Dwarf();
		const sheet = new SheetFake();
		dwarf.applyAbilities(sheet);
		expect(sheet.dispatch).toHaveBeenCalledWith(new ApplyRaceAbility({
			ability: new SlowAndAlways(),
		}));
	});

	it('should dispatch Hard as Rock appliance', () => {
		const dwarf = new Dwarf();
		const sheet = new SheetFake();
		dwarf.applyAbilities(sheet);
		expect(sheet.dispatch).toHaveBeenCalledWith(new ApplyRaceAbility({
			ability: new HardAsRock(),
		}));
	});
});
