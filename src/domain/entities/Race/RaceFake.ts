import {vi} from 'vitest';
import type {Attributes} from '../Sheet/Attributes';
import {type RaceAbility} from './RaceAbility';
import type {RaceInterface} from './RaceInterface';
import {RaceName} from './RaceName';

export class RaceFake implements RaceInterface {
	serialize = vi.fn();
	abilities: Record<string, RaceAbility> = {};
	name = RaceName.human;
	attributeModifiers: Partial<Attributes> = {};
	applyAbilities = vi.fn();
	applyAttributesModifiers = vi.fn((attributes: Attributes): Attributes => attributes);
	addToSheet = vi.fn();
}
