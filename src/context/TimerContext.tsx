import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

export type TimerStatus =
  | 'running'
  | 'paused';

export interface SavedTimer {
  id: string;
  name: string;
  duration: number;
}

export interface ActiveTimer {
  duration: number;
  remaining: number;
  status: TimerStatus;
}

interface TimerContextType {
  /*
   * SAVED TIMERS
   */

  savedTimers: SavedTimer[];

  addSavedTimer: (
    timer: SavedTimer,
  ) => Promise<void>;

  removeSavedTimer: (
    id: string,
  ) => Promise<void>;

  /*
   * ACTIVE TIMER
   */

  activeTimer: ActiveTimer | null;

  startTimer: (
    duration: number,
  ) => void;

  updateRemaining: (
    remaining: number,
  ) => void;

  pauseTimer: () => void;

  resumeTimer: () => void;

  cancelTimer: () => void;
}

const TimerContext =
  createContext<
    TimerContextType | undefined
  >(undefined);

const STORAGE_KEY =
  '@stopwatch_saved_timers';

interface Props {
  children: ReactNode;
}

export const TimerProvider = ({
  children,
}: Props): React.JSX.Element => {
  /*
   * SAVED TIMERS
   */

  const [
    savedTimers,
    setSavedTimers,
  ] = useState<SavedTimer[]>([]);

  /*
   * ACTIVE TIMER
   */

  const [
    activeTimer,
    setActiveTimer,
  ] = useState<ActiveTimer | null>(
    null,
  );

  /*
   * LOAD SAVED TIMERS
   */

  useEffect(() => {
    loadSavedTimers();
  }, []);

  const loadSavedTimers =
    async (): Promise<void> => {
      try {
        const data =
          await AsyncStorage.getItem(
            STORAGE_KEY,
          );

        if (data) {
          setSavedTimers(
            JSON.parse(data),
          );
        }
      } catch (error) {
        console.log(
          'Failed to load timers',
          error,
        );
      }
    };

  /*
   * PERSIST TIMERS
   */

  const persistTimers = async (
    timers: SavedTimer[],
  ): Promise<void> => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(timers),
      );
    } catch (error) {
      console.log(
        'Failed to save timers',
        error,
      );
    }
  };

  /*
   * ADD SAVED TIMER
   */

  const addSavedTimer = async (
    timer: SavedTimer,
  ): Promise<void> => {
    const updatedTimers = [
      ...savedTimers,
      timer,
    ];

    setSavedTimers(updatedTimers);

    await persistTimers(
      updatedTimers,
    );
  };

  /*
   * REMOVE SAVED TIMER
   */

  const removeSavedTimer = async (
    id: string,
  ): Promise<void> => {
    const updatedTimers =
      savedTimers.filter(
        timer => timer.id !== id,
      );

    setSavedTimers(updatedTimers);

    await persistTimers(
      updatedTimers,
    );
  };

  /*
   * START TIMER
   */

  const startTimer = (
    duration: number,
  ): void => {
    setActiveTimer({
      duration,
      remaining: duration,
      status: 'running',
    });
  };

  /*
   * UPDATE REMAINING
   */

  const updateRemaining = (
    remaining: number,
  ): void => {
    setActiveTimer(current => {
      if (!current) {
        return null;
      }

      return {
        ...current,
        remaining,
      };
    });
  };

  /*
   * PAUSE TIMER
   */

  const pauseTimer = (): void => {
    setActiveTimer(current => {
      if (!current) {
        return null;
      }

      return {
        ...current,
        status: 'paused',
      };
    });
  };

  /*
   * RESUME TIMER
   */

  const resumeTimer = (): void => {
    setActiveTimer(current => {
      if (!current) {
        return null;
      }

      return {
        ...current,
        status: 'running',
      };
    });
  };

  /*
   * CANCEL TIMER
   */

  const cancelTimer = (): void => {
    setActiveTimer(null);
  };

  /*
   * PROVIDER
   */

  return (
    <TimerContext.Provider
      value={{
        /*
         * SAVED TIMERS
         */

        savedTimers,

        addSavedTimer,

        removeSavedTimer,

        /*
         * ACTIVE TIMER
         */

        activeTimer,

        startTimer,

        updateRemaining,

        pauseTimer,

        resumeTimer,

        cancelTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

/*
 * HOOK
 */

export const useTimer =
  (): TimerContextType => {
    const context =
      useContext(TimerContext);

    if (!context) {
      throw new Error(
        'useTimer must be used inside TimerProvider',
      );
    }

    return context;
  };
