import {type DefenseInterface} from '../Defense/DefenseInterface';
import {type FixedModifierInterface} from '../Modifier/FixedModifier/FixedModifier';

export type SheetDefenseInterface = {
	addFixedModifier(modifier: FixedModifierInterface): void;
	getDefense(): DefenseInterface;
};
