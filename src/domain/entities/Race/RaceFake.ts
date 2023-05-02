import type {Attributes} from '../Sheet/Attributes';
import {RaceName} from './RaceName';
import type {RaceInterface} from './RaceInterface';
import {vi} from 'vitest';

export class RaceFake implements RaceInterface {
	name = RaceName.human;
	attributeModifiers: Partial<Attributes> = {};
	applyAbilities = vi.fn();
	applyAttributesModifiers = vi.fn((attributes: Attributes): Attributes => attributes);
	addToSheet = vi.fn();
}
