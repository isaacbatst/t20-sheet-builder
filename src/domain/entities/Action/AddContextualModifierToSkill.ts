import {ModifierValue} from '../Modifier/ModifierValue';
import {StringHelper} from '../StringHelper';
import {Translatable} from '../Translatable';
import {Translator} from '../Translator';
import {Action, type ActionSubClassParams} from './Action';

export class AddContextualModifierToSkill extends Action<'addContextualModifierToSkill'> {
	constructor(
		params: ActionSubClassParams<'addContextualModifierToSkill'>,
	) {
		super({
			...params,
			type: 'addContextualModifierToSkill',
		});
	}

	execute(): void {
		const sheetSkills = this.transaction.sheet.getSheetSkills();
		sheetSkills.addContextualModifierTo(this.payload.skill, this.payload.modifier);
	}

	getDescription(): string {
		const source = new Translatable(this.payload.modifier.source).getTranslation();
		const value = new ModifierValue(this.payload.modifier.value).getValueWithSign();
		const skill = new Translatable(this.payload.skill).getTranslation();
		const {description: conditionDescription} = this.payload.modifier.condition;
		return `${source}: ${value} ${skill} aplicado ao modificador "outros". Ativação em: ${conditionDescription}.`;
	}
}
