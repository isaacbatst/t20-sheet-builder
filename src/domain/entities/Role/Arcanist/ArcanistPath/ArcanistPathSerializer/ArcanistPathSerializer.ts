import {type SerializedArcanistPath} from '../../SerializedArcanist';

export abstract class ArcanistPathSerializer<
	S extends SerializedArcanistPath = SerializedArcanistPath,
> {
	abstract serialize(): S;
}
