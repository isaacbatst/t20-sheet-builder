import {type ArcanistPath} from '../ArcanistPath';

export abstract class ArcanistPathFactory {
	abstract make(): ArcanistPath;
}
