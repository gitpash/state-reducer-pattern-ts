import React from 'react';
import Switch from './components/Switch';

export interface ToggleProps {
  on: boolean;
  toggle: () => void;
  setOn: () => void;
  setOff: () => void;
}

type Action = {
  type: string;
  changes: any;
};
type State = {
  on: boolean;
};
type Reducer = (currentState: State, action: Action) => State;
type UseToggleProp = { reducer?: Reducer };

function toggleReducer({ on }: State, { type }: Action): State {
  switch (type) {
    case useToggle.types.toggle: {
      return { on: !on };
    }
    case useToggle.types.on: {
      return { on: true };
    }
    case useToggle.types.off: {
      return { on: false };
    }
    default: {
      throw new Error(`Unhandled type: ${type}`);
    }
  }
}

function useToggle({
  reducer = (s, { changes }) => changes,
}: UseToggleProp = {}) {
  const [{ on }, dispatch] = React.useReducer(
    (state, action) => {
      const changes = toggleReducer(state, action);
      const res = reducer(state, { ...action, changes });

      return res;
    },
    { on: false },
  );

  const toggle = () => dispatch({ type: useToggle.types.toggle });
  const setOn = () => dispatch({ type: useToggle.types.on });
  const setOff = () => dispatch({ type: useToggle.types.off });

  return { on, toggle, setOn, setOff };
}
useToggle.types = {
  toggle: 'TOGGLE',
  on: 'ON',
  off: 'OFF',
};

export function Toggle() {
  const [clicksSinceReset, setClicksSinceReset] = React.useState(0);
  const tooManyClicks = clicksSinceReset >= 4;
  console.log('tooManyClicks: ', tooManyClicks);

  function handleClick() {
    /** siple solition */
    // if (tooManyClicks) return null;
    toggle();
    setClicksSinceReset(count => count + 1);
  }

  const { on, toggle, setOn, setOff } = useToggle({
    reducer({ on }, { type, changes }) {
      if (tooManyClicks && type === useToggle.types.toggle) {
        return { ...changes, on };
      }
      return changes;
    },
  });

  return (
    <div>
      <button onClick={setOff}>Switch Off</button>
      <button onClick={setOn}>Switch On</button>
      <Switch on={on} onClick={handleClick} />
      {tooManyClicks ? (
        <button onClick={() => setClicksSinceReset(0)}>Reset</button>
      ) : null}
    </div>
  );
}
