import {Translator} from '../Translator';
import {Action, type ActionSubClassParams} from './Action';

export class ApplyRaceAbility extends Action<'applyRaceAbility'> {
	constructor(
		params: ActionSubClassParams<'applyRaceAbility'>,
	) {
		super({
			...params,
			type: 'applyRaceAbility',
		});
	}

	override execute(): void {
		const sheetAbilities = this.transaction.sheet.getSheetAbilities();
		sheetAbilities.applyRaceAbility(this.payload.ability, this.transaction, this.payload.source);
	}

	override getDescription(): string {
		const ability = Translator.getRaceAbilityTranslation(this.payload.ability.name);
		return `Habilidade de raça: ${ability} adicionada.`;
	}
}
