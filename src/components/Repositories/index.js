import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Creators as RepoActions } from '../../ducks/repository'

const Repositories = () => {
  const repositories = useSelector(state => state.repository.repositoriesList) || []
  const requestStatus = useSelector(state => state.repository.requestStatus) || {}
  const searchResult = useSelector(state => state.repository.searchResult)
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [repository, setRepository] = useState('')

  const handleUsernameInput = e => {
    const { value } = e.target
    const username = value.replace(/[^A-z0-9]/, '').toLowerCase().trim()
    setUsername(username)
  }
  const handleRepositoryInput = e => {
    const { value } = e.target
    const repository = value.replace(/[^A-z0-9_-]/, '').toLowerCase().trim()
    setRepository(repository)
  }
  const handleSearch = e => {
    e.preventDefault()
    const pathRepo = `${username}/${repository}`
    dispatch(RepoActions.searchRepository(pathRepo))
    setUsername('')
    setRepository('')
  }

  return (
    <div className="columns is-vcentered">
      <div className="column">
        <div className="container">
          <div className="notification is-primary">
            <h1 className="h1"><strong><FontAwesomeIcon icon="list" /> Minha Lista de Repositórios GitHub</strong></h1>
          </div>
          <div className="tile is-ancestor">
            <div className="tile is-vertical is-8">
              <div className="tile is-parent">
                <article className="tile is-child notification is-dark">
                  <p className="title"><FontAwesomeIcon icon="clipboard-list" /> Repositórios adicionados</p>
                  <p className="subtitle">Você pode adicionar mais repositórios pesquisando ao lado</p>
                  <div className="content">
                    {
                      repositories.length === 0 &&
                      <p className="title"><FontAwesomeIcon icon="folder-open" /> Nada para mostrar.</p>
                    }
                    {
                      repositories.length > 0 &&
                      <table className="table is-rounded">
                        <tbody>
                          {repositories.map((repository, index) => (
                            <tr key={index}>
                              <td><p>{`${repository.username}/${repository.name}`}</p></td>
                              <td>
                                <a className="button is-success" href={repository.url} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon="link" /></a> &nbsp;
                                <button className="button is-danger" onClick={() => dispatch(RepoActions.removeRepository(repository.id))} ><FontAwesomeIcon icon="trash-alt" /></button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    }
                  </div>
                </article>
              </div>
            </div>
            <div className="tile is-parent">
              <article className="tile is-child notification is-success">
                <div className="content">
                  <p className="title"><FontAwesomeIcon icon="search" /> Pesquisar</p>
                  <p className="subtitle">Digite nos campos abaixo o usuário e o repositório desejado</p>
                  <div className="content">
                    <div className="field">
                      <div className="control is-medium">
                        <input className="input is-rounded" type="text" placeholder="Usuário GitHub" value={username} onChange={handleUsernameInput} />
                      </div>
                    </div>
                    <div className="field">
                      <div className="control is-medium">
                        <input className="input is-rounded" type="text" placeholder="Nome do Repositório" value={repository} onChange={handleRepositoryInput} />
                      </div>
                    </div>
                    <button disabled={!(username.length >= 3 && repository.length >= 3)} className="button is-light is-large is-rounded is-fullwidth" onClick={handleSearch}>Pesquisar</button>
                  </div>
                </div>
              </article>
            </div>
          </div>
          <div className="tile">
            {
              searchResult !== null &&

              <article className="tile is-child notification is-primary">
                <div className="content">
                  <p className="title"><FontAwesomeIcon icon="download" /> Resultado da Pesquisa</p>
                  <p className="subtitle">A busca retornou o seguinte resultado: </p>
                  <div className="content">
                    <table className="table is-rounded">
                      <thead>
                        <tr>
                          <th><FontAwesomeIcon icon="user" /> Usuário</th>
                          <th><FontAwesomeIcon icon="file" /> Nome do Repositório</th>
                          <th><FontAwesomeIcon icon="link" /> URL do Repositório</th>
                          <th><FontAwesomeIcon icon="clock" /> Última atualização</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{searchResult.username}</td>
                          <td>{searchResult.name}</td>
                          <td><a href={searchResult.url} target="_blank" rel="noopener noreferrer">{searchResult.url}</a></td>
                          <td>{searchResult.lastUpdate}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="box">
                      <p className="subtitle">Escolha uma opção abaixo</p>
                      <div className="buttons is-centered">
                        <button className="button is-success" onClick={() => dispatch(RepoActions.addRepository(searchResult))}><span><FontAwesomeIcon icon="plus" /> Adicionar</span></button>
                        <button className="button is-danger" onClick={() => dispatch(RepoActions.clearResult())}><span><FontAwesomeIcon icon="times" /> Remover</span></button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

            }
            {
              requestStatus.error.status === true &&
              <article className="tile is-child notification is-danger">
                <div className="content">
                  <p className="title">A pesquisa não encontrou resultados. Tente novamente. </p>
                  <p className="subtitle">Detalhes: {requestStatus.error.message} </p>
                </div>
              </article>
            }
          </div>
        </div>

      </div>
    </div>
  )
}

export default Repositories
