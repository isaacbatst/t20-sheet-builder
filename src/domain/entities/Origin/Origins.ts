import {Acolyte} from './Acolyte';
import {AnimalsFriend} from './AnimalsFriend';
import {type OriginStatic} from './OriginStatic';

export class Origins {
	static getAll(): OriginStatic[] {
		return [
			Acolyte,
			AnimalsFriend,
		];
	}
}
