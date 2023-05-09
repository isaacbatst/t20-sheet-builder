import {Proficiency} from './Proficiency';
import {type SheetProficienciesInterface} from './SheetProficienciesInterface';

export class SheetProficiencies implements SheetProficienciesInterface {
	constructor(
		private readonly proficiencies = new Set<Proficiency>([Proficiency.simple, Proficiency.lightArmor]),
	) {}

	addProficiency(proficiency: Proficiency): void {
		this.proficiencies.add(proficiency);
	}

	has(proficiency: Proficiency): boolean {
		return this.proficiencies.has(proficiency);
	}

	getProficiencies(): Proficiency[] {
		return Array.from(this.proficiencies);
	}
}
