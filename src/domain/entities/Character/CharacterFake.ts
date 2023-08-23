import {type CharacterSheetInterface} from '../Sheet';
import {CharacterSheetFake} from '../Sheet/CharacterSheet/CharacterSheetFake';
import type {CharacterInterface} from './CharacterInterface';
import {CharacterModifiers} from './CharacterModifiers';

export class CharacterFake implements CharacterInterface {
	serialize = vi.fn();
	sheet: CharacterSheetInterface = new CharacterSheetFake();

	modifiers: CharacterModifiers = new CharacterModifiers();
	toggleEquipItem = vi.fn();

	toggleWieldItem = vi.fn();
	selectFightStyle = vi.fn();

	unselectFightStyle = vi.fn();

	getAttributes = vi.fn();

	getAttacks = vi.fn();

	getWieldedItems = vi.fn();

	getFightStyle = vi.fn();
	changeAttackTestAttribute = vi.fn();
}
