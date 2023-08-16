import {Translatable} from '../Translatable';
import {Action, type ActionSubClassParams} from './Action';

export class AddResistance extends Action<'addResistance'> {
	constructor(
		params: ActionSubClassParams<'addResistance'>,
	) {
		super({
			...params,
			type: 'addResistance',
		});
	}

	execute(): void {
		const {resistance, source, value} = this.payload;
		const resistances = this.transaction.sheet.getSheetResistences();
		resistances.addResistance(resistance, value, source);
	}

	getDescription(): string {
		const source = new Translatable(this.payload.source).getTranslation();
		const resistance = new Translatable(this.payload.resistance).getTranslation();
		return `${source}: você ganha resistência a ${resistance} de +${this.payload.value}.`;
	}
}
