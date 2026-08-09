/**
 * How far `analyzePGN` replays each game's movetext.
 *
 * - `skip` — parse and count only (fastest when you do not need board data)
 * - `board` — decode and apply moves on an internal board (no {@link Action} objects)
 * - `actions` — decode into {@link Action} arrays for move trackers (required when move trackers are present)
 */
export type ReplayMode = 'skip' | 'board' | 'actions';

/**
 * Resolve replay mode from tracker presence and user override.
 * Apply an optional user {@link ReplayMode} override from {@link AnalyzeOptions.replay}.
 * Move trackers require `'actions'`, otherwise default to `'skip'`.
 */
export function resolveReplayMode(hasMoveTrackers: boolean, userReplay?: ReplayMode): ReplayMode {
    if (userReplay === undefined) return hasMoveTrackers ? 'actions' : 'skip';
    if (hasMoveTrackers && userReplay !== 'actions') {
        throw new Error('Move trackers require replay: "actions"');
    }
    return userReplay;
}
