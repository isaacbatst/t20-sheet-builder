import type {EquipmentName} from '../Inventory';
import type {FightStyle} from '../Power/GeneralPower/FightStyle/FightStyle';
import type {Attributes} from '../Sheet';
import type {CharacterAppliedFightStyle} from './CharacterAppliedFightStyle';
import type {CharacterAttack} from './CharacterAttack';
import type {CharacterInterface} from './CharacterInterface';

export class CharacterFake implements CharacterInterface {
	toggleWieldItem = vi.fn();
	selectFightStyle = vi.fn();

	unselectFightStyle = vi.fn();

	getAttributes = vi.fn();

	getAttacks = vi.fn();

	getWieldedItems = vi.fn();

	getFightStyle = vi.fn();
}
