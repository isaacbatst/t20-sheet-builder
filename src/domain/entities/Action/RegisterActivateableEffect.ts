import {Translatable} from '../Translatable';
import {Action, type ActionSubClassParams} from './Action';

export class RegisterActivateableEffect extends Action<'registerActivateableEffect'> {
	constructor(
		params: ActionSubClassParams<'registerActivateableEffect'>,
	) {
		super({
			...params,
			type: 'registerActivateableEffect',
		});
	}

	override execute(): void {
		const effects = this.transaction.sheet.getSheetActivateableEffects();
		effects.register(this.payload.effect);
	}

	getDescription(): string {
		const source = new Translatable(this.payload.effect.source).getTranslation();
		return `${source}: habilidade ativável adicionada.`;
	}
}
