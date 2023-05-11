import {FixedModifierAppliableValueCalculator} from '../Modifier';
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
		const attributes = this.transaction.sheet.getSheetAttributes().getValues();
		const calculator = new FixedModifierAppliableValueCalculator(attributes);
		const value = this.payload.modifier.getAppliableValue(calculator);
		const valueWithSign = new ModifierValue(value).getValueWithSign();
		return `${source}: ${valueWithSign} PV.`;
	}
}
