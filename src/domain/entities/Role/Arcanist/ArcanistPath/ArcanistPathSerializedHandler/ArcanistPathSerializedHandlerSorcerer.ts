import {type SerializedArcanistSorcerer} from '../../SerializedArcanist';
import {ArcanistPathName, type ArcanistPath} from '../ArcanistPath';
import {ArcanistPathSorcerer} from '../ArcanistPathSorcerer';
import {ArcanistLineageSerializedHandlerDraconic, ArcanistLineageSerializedHandlerFaerie, ArcanistLineageSerializedHandlerRed} from '../ArcanistPathSorcerer/ArcanistLineage/ArcanistLineageSerializedHandler';
import {ArcanistPathSerializedHandler} from './ArcanistPathSerializedHandler';

export class ArcanistPathSerializedHandlerSorcerer extends ArcanistPathSerializedHandler<SerializedArcanistSorcerer> {
	protected override handle(request: SerializedArcanistSorcerer): ArcanistPath {
		const draconic = new ArcanistLineageSerializedHandlerDraconic();
		const faerie = new ArcanistLineageSerializedHandlerFaerie();
		const red = new ArcanistLineageSerializedHandlerRed();

		draconic
			.setNext(faerie)
			.setNext(red);

		const lineage = draconic.execute(request.lineage);
		return new ArcanistPathSorcerer(lineage);
	}

	protected override shouldHandle(request: SerializedArcanistSorcerer): boolean {
		return request.name === ArcanistPathName.sorcerer;
	}
}
