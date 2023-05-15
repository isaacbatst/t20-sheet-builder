import {Acolyte} from './Acolyte/Acolyte';
import {AnimalsFriend} from './AnimalsFriend/AnimalsFriend';
import {OriginName} from './OriginName';
import {type OriginStatic} from './OriginStatic';

export class Origins {
	static getAll(): OriginStatic[] {
		return Object.values(Origins.map);
	}

	static getByName(name: OriginName): OriginStatic | undefined {
		return Origins.map[name];
	}

	private static readonly map: Record<OriginName, OriginStatic> = {
		[OriginName.acolyte]: Acolyte,
		[OriginName.animalsFriend]: AnimalsFriend,
	};
}
