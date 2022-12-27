import type {ModifierInterface} from '../ModifierInterface';

export type PerLevelModifierInterface = ModifierInterface & {
	includeFirstLevel: boolean;
	getPerLevelValue(): number;
};
