import {type DefenseInterface} from '../Defense/DefenseInterface';
import {type FixedModifierInterface} from '../Modifier/FixedModifier/FixedModifier';
import {type Attributes} from './Attributes';

export type SheetDefenseInterface = {
	addFixedModifier(modifier: FixedModifierInterface): void;
	getDefense(): DefenseInterface;
	getTotal(attributes: Attributes, armorBonus: number, shieldBonus: number): number;
};
