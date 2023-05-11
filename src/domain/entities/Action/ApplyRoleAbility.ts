import {Translatable} from '../Translatable';
import {Translator} from '../Translator';
import {Action, type ActionSubClassParams} from './Action';

export class ApplyRoleAbility extends Action<'applyRoleAbility'> {
	constructor(
		params: ActionSubClassParams<'applyRoleAbility'>,
	) {
		super({
			...params,
			type: 'applyRoleAbility',
		});
	}

	execute(): void {
		const sheetAbilities = this.transaction.sheet.getSheetAbilities();
		sheetAbilities.applyRoleAbility(this.payload.ability, this.transaction, this.payload.source);
	}

	getDescription(): string {
		const source = new Translatable(this.payload.source).getTranslation();
		const ability = Translator.getRoleAbilityTranslation(this.payload.ability.name);
		return `${source}: habilidade ${ability} adicionada.`;
	}
}
