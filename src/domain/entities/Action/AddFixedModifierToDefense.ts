import {ModifierValue} from '../Modifier/ModifierValue';
import {Translatable} from '../Translatable';
import {Action, type ActionSubClassParams} from './Action';

export class AddFixedModifierToDefense extends Action<'addFixedModifierToDefense'> {
	constructor(
		params: ActionSubClassParams<'addFixedModifierToDefense'>,
	) {
		super({
			...params,
			type: 'addFixedModifierToDefense',
		});
	}

	execute(): void {
		const sheetDefense = this.transaction.sheet.getSheetDefense();
		sheetDefense.addFixedModifier(this.payload.modifier);
	}

	getDescription(): string {
		const source = new Translatable(this.payload.modifier.source).getTranslation();
		const value = new ModifierValue(this.payload.modifier.baseValue).getValueWithSign();
		return `${source}: ${value} Defesa adicionado.`;
	}
}
