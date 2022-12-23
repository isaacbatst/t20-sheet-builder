import {ApplyRaceAbility} from '../Action/ApplyRaceAbility';
import {ApplyRaceModifiers} from '../Action/ApplyRaceModifiers';
import {BuildingSheetFake} from '../BuildingSheetFake';
import {RockKnowledge} from '../RaceAbility/Dwarf/RockKnowledge';
import {SlowAndAlways} from '../RaceAbility/Dwarf/SlowAndAlways';
import {Dwarf} from './Dwarf';
import {HardAsRock} from '../RaceAbility/Dwarf/HardAsRock';
import {RaceName} from './RaceName';

describe('Dwarf', () => {
	it('should dispatch dwarf attributes modifiers appliance', () => {
		const dwarf = new Dwarf();
		const sheet = new BuildingSheetFake();
		const dispatch = jest.fn();
		dwarf.addToSheet(sheet, dispatch);
		expect(dispatch).toHaveBeenCalledWith(new ApplyRaceModifiers({
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
		const sheet = new BuildingSheetFake();
		const dispatch = jest.fn();
		dwarf.addToSheet(sheet, dispatch);
		expect(dispatch).toHaveBeenCalledWith(new ApplyRaceAbility({
			ability: new RockKnowledge(),
			source: RaceName.dwarf,
		}));
	});

	it('should dispatch slow and always appliance', () => {
		const dwarf = new Dwarf();
		const sheet = new BuildingSheetFake();
		const dispatch = jest.fn();
		dwarf.addToSheet(sheet, dispatch);
		expect(dispatch).toHaveBeenCalledWith(new ApplyRaceAbility({
			ability: new SlowAndAlways(),
			source: RaceName.dwarf,
		}));
	});

	it('should dispatch Hard as Rock appliance', () => {
		const dwarf = new Dwarf();
		const sheet = new BuildingSheetFake();
		const dispatch = jest.fn();
		dwarf.addToSheet(sheet, dispatch);
		expect(dispatch).toHaveBeenCalledWith(new ApplyRaceAbility({
			ability: new HardAsRock(),
			source: RaceName.dwarf,
		}));
	});
});
