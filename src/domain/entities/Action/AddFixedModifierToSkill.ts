import {FixedModifierAppliableValueCalculator} from '../Modifier';
import {ModifierValue} from '../Modifier/ModifierValue';
import {Translatable} from '../Translatable';
import {Action, type ActionSubClassParams} from './Action';

export class AddFixedModifierToSkill extends Action<'addFixedModifierToSkill'> {
	constructor(
		params: ActionSubClassParams<'addFixedModifierToSkill'>,
	) {
		super({
			...params,
			type: 'addFixedModifierToSkill',
		});
	}

	execute(): void {
		const sheetSkills = this.transaction.sheet.getSheetSkills();
		sheetSkills.addFixedModifierTo(this.payload.skill, this.payload.modifier);
	}

	getDescription(): string {
		const skill = new Translatable(this.payload.skill).getTranslation();
		const source = new Translatable(this.payload.modifier.source).getTranslation();
		const attributes = this.transaction.sheet.getSheetAttributes().getValues();
		const calculator = new FixedModifierAppliableValueCalculator(attributes);
		const value = this.payload.modifier.getAppliableValue(calculator);
		const valueWithSign = new ModifierValue(value).getValueWithSign();
		return `${source}: ${valueWithSign} ${skill} aplicado.`;
	}
}
