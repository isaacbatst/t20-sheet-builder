import type {Attribute} from '../../../Sheet';
import {RoleAbility} from '../../RoleAbility';
import {RoleAbilityName} from '../../RoleAbilityName';
import type {SpellLearnFrequency} from '../../SpellsAbility';
import {type SerializedArcanistPath} from '../SerializedArcanist';

export enum ArcanistPathName {
	wizard = 'wizard',
	sorcerer = 'sorcerer',
	mage = 'mage',
}

export abstract class ArcanistPath extends RoleAbility {
	abstract pathName: ArcanistPathName;
	abstract spellsAttribute: Attribute;
	abstract spellLearnFrequency: SpellLearnFrequency;
	constructor() {
		super(RoleAbilityName.arcanistPath);
	}
	abstract serializePath(): SerializedArcanistPath;
}
