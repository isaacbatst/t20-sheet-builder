import {ModifierValue} from '../Modifier/ModifierValue';
import {Translatable} from '../Translatable';
import {Action, type ActionSubClassParams} from './Action';

export class AddFixedModifierToLifePoints extends Action<'addFixedModifierToLifePoints'> {
	constructor(
		params: ActionSubClassParams<'addFixedModifierToLifePoints'>,
	) {
		super({
			...params,
			type: 'addFixedModifierToLifePoints',
		});
	}

	execute(): void {
		const sheetLifePoints = this.transaction.sheet.getSheetLifePoints();
		sheetLifePoints.addFixedModifier(this.payload.modifier);
	}

	getDescription(): string {
		const source = new Translatable(this.payload.modifier.source).getTranslation();
		const value = new ModifierValue(this.payload.modifier.value).getValueWithSign();
		return `${source}: ${value} PV.`;
	}
}
