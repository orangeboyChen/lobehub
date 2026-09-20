/**
 * Session-scoped record of which pending interventions THIS client has actually
 * marked in flight.
 *
 * `pluginIntervention.resolving` disables every action on the card, so it must
 * never outlive the run that is waiting for the producer's ACK. The flag is
 * written to the local projection only (see `#markInterventionResolving` in
 * `conversationControl`), but rows written by earlier builds still carry it in
 * the database, and those are read back verbatim — which disabled the card and
 * pinned its Submit button in `loading` on mount, surviving every reload.
 *
 * A persisted `resolving` is therefore never authoritative: it is either a
 * leftover from a previous session/build, or a hint another subscriber (mobile,
 * another tab) stamped. Pairing the read with this session's own marks keeps the
 * in-flight semantics without letting stale rows strand a card forever.
 */
const resolvingIds = new Set<string>();

export const markInterventionResolvingLocally = (toolMessageId: string): void => {
  resolvingIds.add(toolMessageId);
};

export const isInterventionResolvingLocally = (toolMessageId: string): boolean =>
  resolvingIds.has(toolMessageId);

/** Test-only: drop every mark so one spec cannot leak into the next. */
export const resetInterventionResolvingLocally = (): void => {
  resolvingIds.clear();
};
