const { describe, it } = intern.getInterface('bdd');

import { w, v } from '@dojo/framework/widget-core/d';
import harness from '@dojo/framework/testing/harness';

import GridRow, { GridRowProperties } from './../../index';
import * as css from './../../styles/grid-row.m.css';

describe('GridRow', () => {
	const defaultProperties: GridRowProperties = {
		gutters: true,
		marginTop: 'default',
		marginBottom: 'default',
		marginLeft: 'default',
		marginRight: 'default',
		paddingTop: 'default',
		paddingBottom: 'default',
		paddingLeft: 'default',
		paddingRight: 'default',
		display: 'default',
		flexDirection: 'default',
		reverse: false,
		justifyItems: 'default',
		alignItems: 'default',
		flexWrap: 'default',
		alignContent: 'default',
		alignSelf: 'default',
		order: 'default'
	};

	const customProperties: GridRowProperties = {
		widgetId: 'random-id',
		gutters: false,
		marginTop: '1',
		marginBottom: '2',
		marginLeft: '3',
		marginRight: '4',
		paddingTop: '1',
		paddingBottom: '1',
		paddingLeft: '1',
		paddingRight: '1',
		display: 'flex',
		flexDirection: 'row',
		reverse: true,
		justifyItems: 'start',
		alignItems: 'start',
		flexWrap: 'nowrap',
		alignContent: 'start',
		alignSelf: 'start',
		order: 0
	};

	it('should construct GridRow', () => {
		const h = harness(() => w(GridRow, {}));
		h.expect(() =>
			v(
				'div',
				{
					id: undefined,
					key: 'grid-row',
					classes: [css.root, 'row', undefined]
				},
				[]
			)
		);
	});

	it('default properties', () => {
		const h = harness(() => w(GridRow, defaultProperties));
		h.expect(() =>
			v(
				'div',
				{
					id: undefined,
					key: 'grid-row',
					classes: [css.root, 'row', undefined]
				},
				[]
			)
		);
	});

	it('custom properties', () => {
		const h = harness(() => w(GridRow, customProperties));
		h.expect(() =>
			v(
				'div',
				{
					id: 'random-id',
					key: 'grid-row',
					classes: [
						css.root,
						'row',
						'no-gutters',
						'mt-1',
						'mb-2',
						'ml-3',
						'mr-4',
						'p-1',
						'd-flex',
						'flex-row-reverse',
						'justify-content-start',
						'align-items-start',
						'flex-nowrap',
						'align-content-start',
						'align-self-start',
						'order-0'
					]
				},
				[]
			)
		);
	});

	it('direction reverse', () => {
		const h = harness(() => w(GridRow, { display: 'flex', flexDirection: 'row', reverse: false }));
		h.expect(() =>
			v(
				'div',
				{
					id: undefined,
					key: 'grid-row',
					classes: [css.root, 'row', 'd-flex', 'flex-row']
				},
				[]
			)
		);
		const h1 = harness(() => w(GridRow, { display: 'flex', flexDirection: 'row', reverse: true }));
		h1.expect(() =>
			v(
				'div',
				{
					id: undefined,
					key: 'grid-row',
					classes: [css.root, 'row', 'd-flex', 'flex-row-reverse']
				},
				[]
			)
		);
	});

	it('flexWrap', () => {
		const h = harness(() => w(GridRow, { display: 'flex', flexWrap: 'reverseWrap' }));
		h.expect(() =>
			v(
				'div',
				{
					id: undefined,
					key: 'grid-row',
					classes: [css.root, 'row', 'd-flex', 'flex-wrap-reverse']
				},
				[]
			)
		);
	});
});
