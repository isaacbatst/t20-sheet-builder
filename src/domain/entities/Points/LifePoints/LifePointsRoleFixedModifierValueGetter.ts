import type {ModifierValueGetterInterface} from '../../Modifier/ModifierInterface';

export class LifePointsRoleFixedModifierValueGetter implements ModifierValueGetterInterface {
	constructor(readonly constitution: number) {}

	get(value: number): number {
		return value + this.constitution;
	}
}
