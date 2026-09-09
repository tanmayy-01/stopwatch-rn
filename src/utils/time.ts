export interface TimeDuration {
    hours: number;
    minutes: number;
    seconds: number;
}

export const pad = (value: number): string => {
    return value.toString().padStart(2, "0");
}

export const formatStopwatch = (milliseconds: number): string => {
    const centiseconds = Math.floor(milliseconds / 10);
    const minutes = Math.floor(centiseconds / 6000);
    const seconds = Math.floor((centiseconds % 6000) / 100);
    const cs = centiseconds % 100;

    return `${pad(minutes)}:${pad(seconds)}:${pad(cs)}`;
}

export const formatTimer = (milliseconds: number): string => {
    const totalSeconds = Math.max(0, Math.ceil(milliseconds / 1000));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export const durationToMilliseconds = (duration: TimeDuration): number => {
    return(
        duration.hours * 60 * 60 * 1000 +
        duration.minutes * 60 * 1000 +
        duration.seconds * 1000
    )
}

export const millisecondsToDuration = (milliseconds: number): TimeDuration => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { hours, minutes, seconds };
}