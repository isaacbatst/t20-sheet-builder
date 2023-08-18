import type {EquipmentName} from '../Inventory';
import {type FightStyle} from '../Power/GeneralPower/CombatPower/FightStyle/FightStyle';
import type {Attributes} from '../Sheet';
import type {CharacterAppliedFightStyle} from './CharacterAppliedFightStyle';
import type {CharacterAttack} from './CharacterAttack';

export type CharacterInterface = {
	selectFightStyle(fightStyle: FightStyle): void;
	unselectFightStyle(): void;

	getAttributes(): Attributes;
	getAttacks(): Map<EquipmentName, CharacterAttack>;

	toggleEquipItem(name: EquipmentName): void;
	getWieldedItems(): EquipmentName[];

	getFightStyle(): CharacterAppliedFightStyle | undefined;
};
