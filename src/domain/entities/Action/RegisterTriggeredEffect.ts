import {Translatable} from '../Translatable';
import {Action, type ActionSubClassParams} from './Action';

export class RegisterTriggeredEffect extends Action<'registerTriggeredEffect'> {
	constructor(
		params: ActionSubClassParams<'registerTriggeredEffect'>,
	) {
		super({
			...params,
			type: 'registerTriggeredEffect',
		});
	}

	override execute(): void {
		const effects = this.transaction.sheet.getSheetTriggeredEffects();
		effects.registerEffect(this.payload.events, this.payload.effect);
	}

	getDescription(): string {
		const source = new Translatable(this.payload.effect.source).getTranslation();
		return `${source}: habilidade engatilhada.`;
	}
}
