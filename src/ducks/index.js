import {combineReducers} from 'redux'
import repository from './repository'

//Aqui importamos todos os reducers e os combinamos num único objeto.
//Os valores criados na store poderão ser acessados pelas propriedades que adicionamos com o combineReducers.
//Ex.: store.repository.repositoriesList

export default combineReducers({
    repository
})
