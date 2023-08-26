import {type SerializedCharacter} from '.';
import {type Context} from '../Context';
import type {EquipmentName} from '../Inventory';
import {type FightStyle} from '../Power/GeneralPower/CombatPower/FightStyle/FightStyle';
import {type CharacterSheetInterface} from '../Sheet';
import {type Attributes} from '../Sheet/Attributes';
import type {CharacterAppliedFightStyle} from './CharacterAppliedFightStyle';
import type {CharacterAttack} from './CharacterAttack';
import {type CharacterModifiers} from './CharacterModifiers';

export type CharacterInterface = {
	modifiers: CharacterModifiers;
	sheet: CharacterSheetInterface;
	selectFightStyle(fightStyle: FightStyle): void;
	unselectFightStyle(): void;
	serialize(context: Context): SerializedCharacter;
	getAttributes(): Attributes;
	getAttacks(context: Context): Map<EquipmentName, CharacterAttack>;
	toggleEquipItem(name: EquipmentName): void;
	getWieldedItems(): EquipmentName[];
	getFightStyle(): CharacterAppliedFightStyle | undefined;
};
