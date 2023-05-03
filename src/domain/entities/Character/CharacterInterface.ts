import type {EquipmentName} from '../Inventory';
import type {FightStyle} from '../Power/GeneralPower/FightStyle/FightStyle';
import type {Attributes} from '../Sheet';
import type {CharacterAppliedFightStyle} from './CharacterAppliedFightStyle';
import type {CharacterAttack} from './CharacterAttack';

export type CharacterInterface = {
	selectFightStyle(fightStyle: FightStyle): void;
	unselectFightStyle(): void;

	toggleWieldItem(name: EquipmentName): void;

	getAttributes(): Attributes;
	getAttacks(): Map<EquipmentName, CharacterAttack>;

	getWieldedItems(): EquipmentName[];

	getFightStyle(): CharacterAppliedFightStyle | undefined;
};
