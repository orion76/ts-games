export type TIntervalId = ReturnType<typeof setInterval>;
export type UEvents = 'move_right' | 'move_left' | 'move_down' | 'rotate_left' | 'rotate_right'
export type TEventIntervals = Record<UEvents, TIntervalId | null>;