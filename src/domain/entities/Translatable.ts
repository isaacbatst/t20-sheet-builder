import {Translator, type TranslatableName} from './Translator';

export class Translatable {
	constructor(readonly value: TranslatableName) {}

	getTranslation() {
		return Translator.getTranslation(this.value);
	}
}
