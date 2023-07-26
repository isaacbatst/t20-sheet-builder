import {ModifierValue} from '../Modifier/ModifierValue';
import {Translatable} from '../Translatable';
import {Action, type ActionSubClassParams} from './Action';

export class AddPerLevelModifierToManaPoints extends Action<'addPerLevelModifierToManaPoints'> {
	constructor(
		params: ActionSubClassParams<'addPerLevelModifierToManaPoints'>,
	) {
		super({
			...params,
			type: 'addPerLevelModifierToManaPoints',
		});
	}

	execute(): void {
		const manaPoints = this.transaction.sheet.getSheetManaPoints();
		manaPoints.addPerLevelModifier(this.payload.modifier);
	}

	getDescription(): string {
		const source = new Translatable(this.payload.modifier.source).getTranslation();
		const value = new ModifierValue(this.payload.modifier.baseValue).getValueWithSign();
		const includeFirstLevel = this.payload.modifier.includeFirstLevel ? '' : ' após o nivel 1';
		return `${source}: ${value} PM por nível${includeFirstLevel}.`;
	}
}
