const { describe, it } = intern.getInterface('bdd');

import { w, v } from '@dojo/widget-core/d';
import harness from '@dojo/test-extras/harness';

import Addon, { AddonProperties } from './../../index';
import Checkbox from '../../../checkbox';
import { VNode } from '@dojo/widget-core/interfaces';
import Button from '../../../button/index';
import * as css from './../../styles/addon.m.css';
import * as cssButton from './../../../button/styles/button.m.css';
import * as cssCheckbox from './../../../checkbox/styles/checkbox.m.css';

describe('Addon', () => {
	const customProperties: AddonProperties = {
		widgetId: 'random-id',
		value: 'prepare',
		position: 'append'
	};

	it('should construct Addon', () => {
		const h = harness(() => w(Addon, {}));
		h.expect(() =>
			v(
				'div',
				{
					id: undefined,
					key: 'addon',
					classes: [css.root, 'input-group-prepend']
				},
				[v('div', {})]
			)
		);
	});

	it('custom properties', () => {
		const h = harness(() => w(Addon, customProperties));
		h.expect(() =>
			v(
				'div',
				{
					id: 'random-id',
					key: 'addon',
					classes: [css.root, 'input-group-append']
				},
				[
					v(
						'span',
						{
							classes: ['input-group-text']
						},
						['prepare']
					)
				]
			)
		);
	});

	it('child is checkbox or radio', () => {
		const checkboxH = harness(() => w(Checkbox, {}));
		const h = harness(() => w(Addon, {}, [checkboxH.getRender() as VNode]));
		h.expect(() =>
			v(
				'div',
				{
					id: undefined,
					key: 'addon',
					classes: [css.root, 'input-group-prepend']
				},
				[
					v(
						'div',
						{
							classes: ['input-group-text']
						},
						[
							v(
								'div',
								{
									key: 'checkbox',
									classes: [cssCheckbox.root, 'form-check', undefined, 'form-check-inline', undefined]
								},
								[
									v('input', {
										type: 'checkbox',
										id: undefined,
										name: undefined,
										value: undefined,
										checked: false,
										disabled: false,
										required: false,
										readOnly: false,
										classes: ['form-check-input']
									}),
									null,
									null
								]
							)
						]
					)
				]
			)
		);
	});

	it('child is button', () => {
		const buttonH = harness(() => w(Button, {}));
		const h = harness(() => w(Addon, {}, [buttonH.getRender() as VNode]));
		h.expect(() =>
			v(
				'div',
				{
					id: undefined,
					key: 'addon',
					classes: [css.root, 'input-group-prepend']
				},
				[
					v('div', {}, [
						v(
							'button',
							{
								id: undefined,
								key: 'button',
								classes: [cssButton.root, 'btn', undefined, undefined, undefined, undefined],
								disabled: false,
								type: undefined,
								onclick: () => {}
							},
							[]
						)
					])
				]
			)
		);
	});
});
