import type {ContextInterface} from './Context';
import {LifePoints} from './LifePoints';
import type {PerLevelModifier} from './Modifier/PerLevelModifier';
import type {ModifierInterface} from './ModifierList';
import {ModifiersList} from './ModifierList';
import {PerLevelModifiersList} from './PerLevelModifiersList';
import type {RoleInterface} from './Role/RoleInterface';

type BuildParams = {
	context: ContextInterface; role: RoleInterface; constitution: number; level: number;

};

export class LifePointsBuilder {
	readonly modifiers: ModifiersList = new ModifiersList();
	readonly perLevelModifiers: PerLevelModifiersList = new PerLevelModifiersList();

	addModifier(modifier: ModifierInterface) {
		this.modifiers.add(modifier);
	}

	addPerLevelModifier(modifier: PerLevelModifier) {
		this.perLevelModifiers.add(modifier);
	}

	build(params: BuildParams): LifePoints {
		return new LifePoints({
			constitution: params.constitution,
			context: params.context,
			level: params.level,
			role: params.role,
			modifiers: this.modifiers,
			perLevelModifiers: this.perLevelModifiers,
		});
	}
}
