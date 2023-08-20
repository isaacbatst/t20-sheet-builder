import {type ContextInterface} from '../Context';
import {type PerLevelModifiersList, type FixedModifiersListInterface} from '../Modifier';
import {type FixedModifierInterface} from '../Modifier/FixedModifier/FixedModifier';
import {type PerLevelModifierInterface} from '../Modifier/PerLevelModifier/PerLevelModifierInterface';
import {type Attributes} from './Attributes';
import {type Level} from './Level';
import {type SerializedSheetPoints} from './SerializedSheet';
import {type SheetInterface} from './SheetInterface';

export type SheetPointsInterface = {
	addFixedModifier(modifier: FixedModifierInterface): void;
	addPerLevelModifier(modifier: PerLevelModifierInterface): void;
	getMax(attributes: Attributes, level: Level): number;
	getFixedModifiers(): FixedModifiersListInterface;
	getPerLevelModifiers(): PerLevelModifiersList;
	serialize(sheet: SheetInterface, context: ContextInterface): SerializedSheetPoints;
};
