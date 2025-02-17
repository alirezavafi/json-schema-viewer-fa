import { Box } from '@stoplight/mosaic';
import { Dictionary } from '@stoplight/types';
import * as React from 'react';

import { useJSVOptionsContext } from '../../contexts';

export interface IProperties {
  required: boolean;
  deprecated: boolean;
  validations: Dictionary<unknown>;
}

export const useHasProperties = ({ required, deprecated, validations: { readOnly, writeOnly } }: IProperties) => {
  const { viewMode } = useJSVOptionsContext();

  const showVisibilityValidations = viewMode === 'standalone' && !!readOnly !== !!writeOnly;

  return deprecated || showVisibilityValidations || required;
};

export const Properties: React.FunctionComponent<IProperties> = ({
  required,
  deprecated,
  validations: { readOnly, writeOnly },
}) => {
  const { viewMode } = useJSVOptionsContext();

  // Show readOnly writeOnly validations only in standalone mode and only if just one of them is present
  const showVisibilityValidations = viewMode === 'standalone' && !!readOnly !== !!writeOnly;
  const visibility = showVisibilityValidations ? (
    readOnly ? (
      <Box as="span" ml={2} color="muted">
        غیرقابل تغییر
      </Box>
    ) : (
      <Box as="span" ml={2} color="muted">
        قابل تغییر
      </Box>
    )
  ) : null;

  return (
    <>
      {deprecated ? (
        <Box as="span" ml={2} color="warning">
          منقضی
        </Box>
      ) : null}
      {visibility}
      {required && (
        <Box as="span" ml={2} color="warning">
          اجباری
        </Box>
      )}
    </>
  );
};
