/*
    O duck pattern consiste em reunir action creators e reducers em um único arquivo,
    de modo a simplificar a escalabilidade da arquitetura flux com o Redux.

    O arquivo é composto pelo objeto Types, que são as actions propriamente ditas. Elas serão invocadas
    pelos métodos do objeto Creators, que são os dispatchers das actions e são associadas pela propriedade
    "type" do objeto a ser passado para o reducer.

    Além disso, há a função reducer que recebe o objeto INITIAL_STATE como estado padrão e o objeto action que
    possuirá a propriedade "type" (listada pelo objeto Types) juntamente com outras que podem ou não ser
    passadas também.
*/

import api from '../services/api'
import moment from 'moment'

export const Types = {
  SEARCH_REPOSITORY_SUCCESS: 'repository/SEARCH_REPOSITORY_SUCCESS',
  SEARCH_REPOSITORY_LOADING: 'repository/SEARCH_REPOSITORY_LOADING',
  SEARCH_REPOSITORY_FAILURE: 'repository/SEARCH_REPOSITORY_FAILURE',
  CLEAR_SEARCH_RESULTS: 'repository/CLEAR_SEARCH_RESULTS',
  ADD_REPOSITORY: 'repository/ADD_REPOSITORY',
  REMOVE_REPOSITORY: 'repository/REMOVE_REPOSITORY'
}

const INITIAL_STATE = {
  repositoriesList: [],
  searchResult: null,
  requestStatus: {
    loading: false,
    error: {
      status: false,
      message: null
    }
  }
}

export default function repository(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SEARCH_REPOSITORY_LOADING:
      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
          loading: true
        }
      }
    case Types.SEARCH_REPOSITORY_SUCCESS:
      return {
        ...state,
        searchResult: action.searchResult,
        requestStatus: {
          ...INITIAL_STATE.requestStatus
        }
      }
    case Types.SEARCH_REPOSITORY_FAILURE:
      return {
        ...state,
        searchResult: null,
        requestStatus: {
          ...INITIAL_STATE.requestStatus,
          error: {
            status: true,
            message: action.message
          }
        }
      }
    case Types.CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        searchResult: null,
        requestStatus: {...INITIAL_STATE.requestStatus}
      }
    case Types.ADD_REPOSITORY:
      return {
        ...state,
        repositoriesList: [...state.repositoriesList, action.repository]
      }
    case Types.REMOVE_REPOSITORY:
      return {
        ...state,
        repositoriesList: [...state.repositoriesList.filter(r => r.id !== action.repoId)] }
    default:
      return state
  }
}

export const Creators = {
  searchRepository: repoPath => {
    return dispatch => {
      dispatch({
        type: Types.SEARCH_REPOSITORY_LOADING
      })
      api.get(`repos/${repoPath}`)
        .then(response => {
          dispatch({
            type: Types.SEARCH_REPOSITORY_SUCCESS,
            searchResult: {
              id: response.data.id,
              name: response.data.name,
              username: response.data.owner.login,
              url: response.data.html_url,
              lastUpdate: moment(response.data.updated_at).format('DD/MM/YYYY HH:mm:ss')
            }
          })
        })
        .catch(err => {
          dispatch({
            type: Types.SEARCH_REPOSITORY_FAILURE,
            message: err.response.data.message
          })
        })
    }
  },
  addRepository: repository => {
    return dispatch => {
      dispatch({
        type: Types.ADD_REPOSITORY,
        repository
      })
      dispatch({
        type: Types.CLEAR_SEARCH_RESULTS
      })
    }
  },
  removeRepository: repoId => {
    return dispatch => {
      dispatch({
        type: Types.REMOVE_REPOSITORY,
        repoId
      })
    }
  },
  clearResult: () => {
    return dispatch => {
      dispatch({
        type: Types.CLEAR_SEARCH_RESULTS
      })
    }
  }
}
