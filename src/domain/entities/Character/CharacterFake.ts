import {type EquipmentName} from '../Inventory';
import type {CharacterInterface} from './CharacterInterface';

export class CharacterFake implements CharacterInterface {
	toggleEquipItem = vi.fn();

	toggleWieldItem = vi.fn();
	selectFightStyle = vi.fn();

	unselectFightStyle = vi.fn();

	getAttributes = vi.fn();

	getAttacks = vi.fn();

	getWieldedItems = vi.fn();

	getFightStyle = vi.fn();
}
