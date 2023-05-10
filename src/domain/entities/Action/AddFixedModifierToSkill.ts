import {ModifierValue} from '../Modifier/ModifierValue';
import {Translatable} from '../Translatable';
import {Translator} from '../Translator';
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
		const value = new ModifierValue(this.payload.modifier.baseValue).getValueWithSign();
		return `${source}: ${value} ${skill} aplicado ao modificador "outros".`;
	}
}
