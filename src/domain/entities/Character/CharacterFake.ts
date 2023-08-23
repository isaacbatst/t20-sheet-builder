import type {CharacterInterface} from './CharacterInterface';
import {CharacterModifiers} from './CharacterModifiers';

export class CharacterFake implements CharacterInterface {
	modifiers: CharacterModifiers = new CharacterModifiers();
	toggleEquipItem = vi.fn();

	toggleWieldItem = vi.fn();
	selectFightStyle = vi.fn();

	unselectFightStyle = vi.fn();

	getAttributes = vi.fn();

	getAttacks = vi.fn();

	getWieldedItems = vi.fn();

	getFightStyle = vi.fn();
}
