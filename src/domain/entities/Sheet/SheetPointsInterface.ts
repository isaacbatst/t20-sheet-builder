import {type FixedModifierInterface} from '../Modifier/FixedModifier/FixedModifier';
import {type PerLevelModifierInterface} from '../Modifier/PerLevelModifier/PerLevelModifierInterface';
import {type Attributes} from './Attributes';
import {type Level} from './Level';

export type SheetPointsInterface = {
	addModifier(modifier: FixedModifierInterface): void;
	addPerLevelModifier(modifier: PerLevelModifierInterface): void;
	getMax(attributes: Attributes, level: Level): number;
};
