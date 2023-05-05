import type {Attributes} from '../Sheet';
import type {Static} from '../Static';
import type {Race} from './Race';

export type RaceStatic<R = Race> = Static<R, {
	attributeModifiers: Partial<Attributes>;
}>;
