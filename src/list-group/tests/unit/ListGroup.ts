const { describe, it } = intern.getInterface('bdd');

import { w, v } from '@dojo/widget-core/d';
import harness from '@dojo/test-extras/harness';

import ListGroup, { ListGroupProperties } from './../../index';
import { Button } from '../../../button';
import { ListItem } from '../../../list-item';
import { Link } from '../../../link';
import { VNode } from '@dojo/widget-core/interfaces';

describe('ListGroup', () => {
	const defaultProperties: ListGroupProperties = {
		flush: false,
		marginTop: 'default',
		marginBottom: 'default',
		marginLeft: 'default',
		marginRight: 'default',
		paddingTop: 'default',
		paddingBottom: 'default',
		paddingLeft: 'default',
		paddingRight: 'default'
	};

	const customProperties: ListGroupProperties = {
		widgetId: 'random-id',
		flush: true,
		marginTop: '0',
		marginBottom: '0',
		marginLeft: '1',
		marginRight: '1',
		paddingTop: '0',
		paddingBottom: '0',
		paddingLeft: '1',
		paddingRight: '1'
	};

	it('should construct ListGroup', () => {
		const h = harness(() => w(ListGroup, {}));
		h.expect(() =>
			v(
				'ul',
				{
					id: undefined,
					classes: ['list-group', undefined]
				},
				[]
			)
		);
	});

	it('default properties', () => {
		const h = harness(() => w(ListGroup, defaultProperties));
		h.expect(() =>
			v(
				'ul',
				{
					id: undefined,
					classes: ['list-group', undefined]
				},
				[]
			)
		);
	});

	it('custom properties', () => {
		const h = harness(() => w(ListGroup, customProperties));
		h.expect(() =>
			v(
				'ul',
				{
					id: 'random-id',
					classes: ['list-group', 'list-group-flush', 'my-0', 'mx-1', 'py-0', 'px-1']
				},
				[]
			)
		);
	});

	it('child is button', () => {
		const buttonH = harness(() => w(Button, {}));
		const h = harness(() => w(ListGroup, {}, [buttonH.getRender() as VNode]));
		h.expect(() =>
			v(
				'div',
				{
					id: undefined,
					classes: ['list-group', undefined]
				},
				[
					v(
						'button',
						{
							id: undefined,
							classes: ['btn', undefined, undefined, undefined, undefined],
							disabled: false,
							type: undefined,
							onclick: () => {}
						},
						[]
					)
				]
			)
		);
	});

	it('child is link', () => {
		const linkH = harness(() => w(Link, {}));
		const h = harness(() => w(ListGroup, {}, [linkH.getRender() as VNode]));
		h.expect(() =>
			v(
				'div',
				{
					id: undefined,
					classes: ['list-group', undefined]
				},
				[
					v('a', {
						classes: [],
						href: undefined,
						id: undefined,
						styles: {},
						target: undefined
					})
				]
			)
		);
	});

	it('child is listItem', () => {
		const listItemH = harness(() => w(ListItem, {}));
		const h = harness(() => w(ListGroup, {}, [listItemH.getRender() as VNode]));
		h.expect(() =>
			v(
				'ul',
				{
					id: undefined,
					classes: ['list-group', undefined]
				},
				[
					v('li', {
						classes: ['list-group-item', undefined, undefined, undefined],
						disabled: false,
						id: undefined,
						styles: {}
					})
				]
			)
		);
	});

	it('child is button and listItem', () => {
		const buttonH = harness(() => w(Button, {}));
		const listItemH = harness(() => w(ListItem, {}));
		const h = harness(() => w(ListGroup, {}, [buttonH.getRender() as VNode, listItemH.getRender() as VNode]));
		h.expect(() =>
			v(
				'div',
				{
					id: undefined,
					classes: ['list-group', undefined]
				},
				[
					v(
						'button',
						{
							id: undefined,
							classes: ['btn', undefined, undefined, undefined, undefined],
							disabled: false,
							type: undefined,
							onclick: () => {}
						},
						[]
					),
					v('li', {
						classes: ['list-group-item', undefined, undefined, undefined],
						disabled: false,
						id: undefined,
						styles: {}
					})
				]
			)
		);
	});
});
