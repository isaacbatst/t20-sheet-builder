import type {ContextInterface} from './Context';
import {ManaPoints} from './ManaPoints';
import type {PerLevelModifier} from './Modifier/PerLevelModifier';
import type {ModifierInterface} from './ModifierList';
import {ModifiersList} from './ModifierList';
import {PerLevelModifiersList} from './PerLevelModifiersList';
import type {RoleInterface} from './Role/RoleInterface';

type BuildParams = {
	context: ContextInterface; role: RoleInterface; level: number;

};

export class ManaPointsBuilder {
	static get repeatedModifierError() {
		return 'REPEATED_MANA_POINTS_MODIFIER';
	}

	readonly modifiers: ModifiersList = new ModifiersList();
	readonly perLevelModifiers: PerLevelModifiersList = new PerLevelModifiersList();

	addModifier(modifier: ModifierInterface) {
		this.modifiers.add(modifier);
	}

	addPerLevelModifier(modifier: PerLevelModifier) {
		this.perLevelModifiers.add(modifier);
	}

	build(params: BuildParams): ManaPoints {
		return new ManaPoints({
			context: params.context,
			level: params.level,
			role: params.role,
			modifiers: this.modifiers,
			perLevelModifiers: this.perLevelModifiers,
		});
	}
}
