import type {Attributes} from './Attributes';
import {RaceName} from './Race/RaceName';
import type {RaceInterface} from './RaceInterface';

export class RaceFake implements RaceInterface {
	name = RaceName.human;
	attributeModifiers: Partial<Attributes> = {};
	applyAbilities = jest.fn();
	applyAttributesModifiers = jest.fn((attributes: Attributes): Attributes => attributes);
	addToSheet = jest.fn();
}
