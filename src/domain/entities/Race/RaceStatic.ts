import type {Attributes} from '../Sheet';
import type {Static} from '../Static';
import type {Race} from './Race';
import {type RaceName} from './RaceName';

export type RaceStatic<R = Race> = Static<R, {
	attributeModifiers: Partial<Attributes>;
	raceName: RaceName;
}>;
