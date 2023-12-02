import {type Static} from '../Static';
import {type AbilityEffect} from './AbilityEffect';

export type AbilityEffectStatic = Static<AbilityEffect, {
	description: string;
}>;
