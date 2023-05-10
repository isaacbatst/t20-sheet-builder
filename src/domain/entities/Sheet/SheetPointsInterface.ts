import {type FixedModifiersListInterface, type PerLevelModifiersListInterface} from '../Modifier';
import {type FixedModifierInterface} from '../Modifier/FixedModifier/FixedModifier';
import {type PerLevelModifierInterface} from '../Modifier/PerLevelModifier/PerLevelModifierInterface';
import {type Attributes} from './Attributes';
import {type Level} from './Level';

export type SheetPointsInterface = {
	addFixedModifier(modifier: FixedModifierInterface): void;
	addPerLevelModifier(modifier: PerLevelModifierInterface): void;
	getMax(attributes: Attributes, level: Level): number;
	getFixedModifiers(): FixedModifiersListInterface;
	getPerLevelModifiers(): PerLevelModifiersListInterface;
};
