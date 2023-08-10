import {SelectableAttributesRace} from '../../SelectableAttributesRace';
import type {Attribute, Attributes} from '../../Sheet/Attributes';
import {type SkillName} from '../../Skill';
import {RaceName} from '../RaceName';
import {Deformity} from './Deformity/Deformity';
import {SonOfTormenta} from './SonOfTormenta';

export class Lefeu extends SelectableAttributesRace {
	static raceName = RaceName.lefeu;
	static attributeModifiers: Partial<Attributes> = {charisma: -1};

	readonly abilities = {
		sonOfTormenta: new SonOfTormenta(),
		deformity: new Deformity(),
	};

	/**
 * Returns an instance of lefeu race.
 * @param selectedAttributes - 2 different attributes
 * @param deformity - +2 on 2 skills
  **/

	constructor(selectedAttributes: Attribute[]) {
		super(selectedAttributes, RaceName.human);
	}

	addDeformities(skills: SkillName[]) {
		skills.forEach(skill => {
			this.abilities.deformity.addDeformity(skill);
		});
	}

	protected get restrictedAttributes(): string[] {
		return ['charisma'];
	}

	protected get fixedModifier(): number {
		return 1;
	}

	protected get selectableQuantity(): number {
		return 3;
	}
}
