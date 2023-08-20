import {type ContextInterface} from '../Context';
import {type DefenseInterface} from '../Defense/DefenseInterface';
import {type FixedModifierInterface} from '../Modifier/FixedModifier/FixedModifier';
import {type SerializedSheetDefense} from './SerializedSheet';
import {type SheetInterface} from './SheetInterface';

export type SheetDefenseInterface = {
	addFixedModifier(modifier: FixedModifierInterface): void;
	getDefense(): DefenseInterface;
	serialize(sheet: SheetInterface, context?: ContextInterface): SerializedSheetDefense;
};
