import {ModifierValue} from '../Modifier/ModifierValue';
import {Translatable} from '../Translatable';
import {Action, type ActionSubClassParams} from './Action';

export class AddPerLevelModifierToLifePoints extends Action<'addPerLevelModifierToLifePoints'> {
	constructor(params: ActionSubClassParams<'addPerLevelModifierToLifePoints'>) {
		super({
			...params,
			type: 'addPerLevelModifierToLifePoints',
		});
	}

	execute(): void {
		const sheetLifePoints = this.transaction.sheet.getSheetLifePoints();
		sheetLifePoints.addModifier(this.payload.modifier);
	}

	getDescription(): string {
		const source = new Translatable(this.payload.modifier.source).getTranslation();
		const value = new ModifierValue(this.payload.modifier.value).getValueWithSign();
		const includeFirstLevel = this.payload.modifier.includeFirstLevel ? '' : ' após o nivel 1';
		return `${source}: ${value} PV por nível${includeFirstLevel}.`;
	}
}
