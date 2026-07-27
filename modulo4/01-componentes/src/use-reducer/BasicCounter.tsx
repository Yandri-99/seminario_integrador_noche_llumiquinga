// src/components/BasicCounter.tsx

import { useReducer } from 'react'

type CounterAction =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }
  | { type: 'SET_COUNT'; payload: number }
  | { type: 'SET_STEP'; payload: number }

interface CounterState {
  count: number
  step: number
}

function counterReducer(
  state: CounterState,
  action: CounterAction
): CounterState {
  switch (action.type) {
    case 'INCREMENT': return { count: state.count + state.step, step: state.step }
    case 'DECREMENT': return { count: state.count - state.step, step: state.step }
    case 'RESET':     return { count: 0, step: state.step }
    case 'SET_COUNT': return { count: action.payload, step: state.step }
    case 'SET_STEP':  return { count: state.count, step: action.payload }
  }
}

const INITIAL_STATE: CounterState = { count: 0, step: 5 }

export default function BasicCounter() {
  const [state, dispatch] = useReducer(counterReducer, INITIAL_STATE)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 200 }}>
      <p style={{ fontFamily: 'monospace', fontSize: 32, margin: 0, textAlign: 'center' }}>
        {state.count}
      </p>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        <button
          onClick={() => dispatch({ type: 'DECREMENT' })}
          style={btnStyle}
        >
          −
        </button>
        <button
          onClick={() => dispatch({ type: 'INCREMENT' })}
          style={btnStyle}
        >
          +
        </button>
      </div>
      <button
        onClick={() => dispatch({ type: 'SET_COUNT', payload: 100 })}
        style={{ ...btnStyle, fontSize: 12 }}
      >
        Poner en 100
      </button>
      <button
        onClick={() => dispatch({ type: 'SET_STEP', payload: 10 })}
        style={{ ...btnStyle, background: '#f3f4f6', color: '#6b7280' }}
      >
        Establecer paso en 10
      </button>
      <button
        onClick={() => dispatch({ type: 'RESET' })}
        style={{ ...btnStyle, background: '#f3f4f6', color: '#6b7280' }}
      >
        Reset
      </button>
    </div>
  )
}

const btnStyle: React.CSSProperties = {
  padding: '8px 16px',
  border: 'none',
  borderRadius: 6,
  background: '#0070f3',
  color: '#fff',
  cursor: 'pointer',
  fontWeight: 500,
}