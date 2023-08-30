import {FixedModifierAppliableValueCalculator} from '../Modifier';
import {ModifierValue} from '../Modifier/ModifierValue';
import {Translatable} from '../Translatable';
import {Action, type ActionSubClassParams} from './Action';

export class AddFixedModifierToManaPoints extends Action<'addFixedModifierToManaPoints'> {
	constructor(
		params: ActionSubClassParams<'addFixedModifierToManaPoints'>,
	) {
		super({
			...params,
			type: 'addFixedModifierToManaPoints',
		});
	}

	execute(): void {
		const sheetManaPoints = this.transaction.sheet.getSheetManaPoints();
		sheetManaPoints.addFixedModifier(this.payload.modifier);
	}

	getDescription(): string {
		const source = new Translatable(this.payload.modifier.source).getTranslation();
		const attributes = this.transaction.sheet.getSheetAttributes().getValues();
		const calculator = new FixedModifierAppliableValueCalculator(attributes);
		const value = this.payload.modifier.getAppliableValue(calculator);
		const valueWithSign = new ModifierValue(value).getValueWithSign();
		return `${source}: ${valueWithSign} PM.`;
	}
}
