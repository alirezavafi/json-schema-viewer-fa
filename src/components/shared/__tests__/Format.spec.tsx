import 'jest-enzyme';

import { TreeState } from '@stoplight/tree-list';
import { mount } from 'enzyme';
import { JSONSchema4 } from 'json-schema';
import * as React from 'react';

import { SchemaTree } from '../../../tree';
import { SchemaRow } from '../../SchemaRow';
import { Format } from '../Format';

describe('Format component', () => {
  let tree: SchemaTree;

  beforeEach(() => {
    const schema: JSONSchema4 = require('../../../__fixtures__/formats-schema.json');

    tree = new SchemaTree(schema, new TreeState(), {
      expandedDepth: Infinity,
      mergeAllOf: false,
      resolveRef: void 0,
      shouldResolveEagerly: false,
      onPopulate: void 0,
    });

    tree.populate();
  });

  it('should render next to a single type with and inherit its color', () => {
    const wrapper = mount(<SchemaRow node={tree.itemAt(3)!} rowOptions={{}} />);
    expect(wrapper.find(Format)).toHaveHTML('<span class="ml-2 text-red-7 dark:text-red-6">&lt;float&gt;</span>');
    wrapper.unmount();
  });

  it('should render next to an array of types in default (black) color', () => {
    const wrapper = mount(<SchemaRow node={tree.itemAt(1)!} rowOptions={{}} />);
    expect(wrapper.find(Format)).toHaveHTML('<span class="ml-2">&lt;date-time&gt;</span>');
    wrapper.unmount();
  });

  it('should not render when the type(s) is/are missing', () => {
    const wrapper = mount(<SchemaRow node={tree.itemAt(4)!} rowOptions={{}} />);
    expect(wrapper).not.toContain(Format);
    wrapper.unmount();
  });
});