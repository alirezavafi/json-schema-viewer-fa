import { Flex, Icon } from '@stoplight/mosaic';
import * as React from 'react';

import { CARET_ICON_SIZE } from '../../consts';

export interface ICaret {
  isExpanded: boolean;
}

export const Caret: React.FunctionComponent<ICaret> = ({ isExpanded }) => (
  <Flex pr={3} w={8} mr={-8} color="muted" role="button" justifyContent="center">
    <Icon size={CARET_ICON_SIZE} fixedWidth icon={isExpanded ? 'chevron-down' : 'chevron-left'} />
  </Flex>
);
