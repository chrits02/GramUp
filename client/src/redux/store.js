const { createStore, combineReducers } = Redux

const initialState = {
  isLoading: false,
  notifyWhenQueueFinished: false,
  instagram: {
    isStopped: true,
  },
  connection: {
    status: CONNECTION.UNKNOWN,
    description: '',
  },
  log: JSON.parse(localStorage.getItem('log')) || [],
  user: {},
  error: '',
}

const reducer = (state = initialState, action) => {
  console.log('action', action)

  if (action.type === 'PRINT_LOG') {
    const { line, newLine } = action.payload

    const log = newLine
      ? [ ...state.log, `<br>`, line ]
      : [ ...state.log, line ]

    localStorage.setItem('log', JSON.stringify(log))

    return {
      ...state,
      log,
    }
  }

  if (action.type === 'INSTAGRAM') {
    const { isStopped } = action.payload.instagram

    if (!state.isStopped && isStopped) {
      if (state.notifyWhenQueueFinished) {
        alert(`Queue finished!`)

        return {
          ...state,
          notifyWhenQueueFinished: false,
          isStopped,
        }
      }
    }
  }

  return {
    ...state,
    ...action.payload,
  }
}

const store = createStore(reducer)
