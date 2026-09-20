import { describe, expect, it } from 'vitest';

import {
  isInterventionResolvingLocally,
  markInterventionResolvingLocally,
  resetInterventionResolvingLocally,
} from './interventionResolvingSession';

describe('interventionResolvingSession', () => {
  it('reports false until this session marks the message', () => {
    resetInterventionResolvingLocally();
    expect(isInterventionResolvingLocally('tool-1')).toBe(false);

    markInterventionResolvingLocally('tool-1');
    expect(isInterventionResolvingLocally('tool-1')).toBe(true);
  });

  // Regression: `pluginIntervention.resolving` is also read back from the
  // database. Rows written by earlier builds still carry it, which disabled the
  // card and pinned Submit in `loading` on mount — and no reload cleared it,
  // because the flag is durable. A row this session never marked is stale by
  // definition, so the card must stay actionable.
  it('does not leak a mark across sessions', () => {
    resetInterventionResolvingLocally();
    markInterventionResolvingLocally('tool-1');
    resetInterventionResolvingLocally();

    expect(isInterventionResolvingLocally('tool-1')).toBe(false);
  });

  it('scopes a mark to the message that was marked', () => {
    resetInterventionResolvingLocally();
    markInterventionResolvingLocally('tool-1');

    expect(isInterventionResolvingLocally('tool-2')).toBe(false);
  });
});
