import type {Attribute} from '../../Sheet/Attributes';
import type {TranslatableName} from '../../Translator';
import {Modifier} from '../Modifier';
import type {PerLevelModifierInterface} from './PerLevelModifierInterface';

export type PerLevelModifierParams = {
	source: TranslatableName;
	value: number;
	includeFirstLevel?: boolean;
	attributeBonuses?: Set<Attribute>;
	frequency?: number;
};

export class PerLevelModifier extends Modifier implements PerLevelModifierInterface {
	readonly includeFirstLevel: boolean;
	readonly frequency: number;
	constructor(params: PerLevelModifierParams) {
		super({
			...params,
			type: 'perLevel',
		});
		this.includeFirstLevel = params.includeFirstLevel ?? true;
		this.frequency = params.frequency ?? 1;
	}

	getPerLevelValue(): number {
		return this.baseValue;
	}
}
