import { describe, expect, it } from 'bun:test';

import { resolveReplayMode } from '#replay/replay-mode';

describe('resolveReplayMode', () => {
    it('defaults to actions when move trackers are present, else skip', () => {
        expect(resolveReplayMode(true)).toBe('actions');
        expect(resolveReplayMode(false)).toBe('skip');
    });

    it('allows explicit actions without move trackers', () => {
        expect(resolveReplayMode(false, 'actions')).toBe('actions');
    });

    it('allows explicit board or skip without move trackers', () => {
        expect(resolveReplayMode(false, 'board')).toBe('board');
        expect(resolveReplayMode(false, 'skip')).toBe('skip');
    });

    it('throws when move trackers are present and replay is not actions', () => {
        expect(() => resolveReplayMode(true, 'skip')).toThrow(
            'Move trackers require replay: "actions"',
        );
        expect(() => resolveReplayMode(true, 'board')).toThrow(
            'Move trackers require replay: "actions"',
        );
    });
});
