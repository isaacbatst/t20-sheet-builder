import type {Attributes} from './Attributes';
import {RaceNameEnum} from './Race/RaceName';
import type {RaceInterface} from './RaceInterface';

export class RaceFake implements RaceInterface {
	name = RaceNameEnum.human;
	attributeModifiers: Partial<Attributes> = {};
	applyAbilities = jest.fn();
	applyAttributesModifiers = jest.fn((attributes: Attributes): Attributes => attributes);
}
