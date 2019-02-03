import React, {Component} from 'react'
import axios from 'axios'
import Main from '../template/main'

const headerProps = {
  icon: 'users',
  title: 'Usuarios',
  subtitle: 'cadastro de usuarios: incluir, listar, alterar e excluir'
}

const baseUrl = 'http://localhost:8001/users'
const initilState = {
  user: { name:'',email:''},
  list:[]
}

export default class userCrud extends Component {

  state = {...initilState}

  componentWillMount(){
    axios(baseUrl).then(resp => {
      this.setState({list: resp.data});
    })
  }

  clear() {
    this.setState({user: initilState.user})
  }

  save() {
    const user = this.state.user
    const method = user.id ? 'put' : 'post'
    const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
    axios[method](url, user)
      .then(resp => {
        const list = this.getUpdateList(resp.data)
        this.setState({user: initilState.user, list})
      })
  }

  getUpdateList(user, add=true) {
    const list = this.state.list.filter(u => u.id !== user.id)
    if(add)list.unshift(user)
    return list
  }

  updateField(event) {
    const user = {...this.state.user}
    user[event.target.name] = event.target.value
    this.setState({user})
  }

  renderForm(){
    return(
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Nome</label>
              <input type="text" className="form-control"
                name="name" value={this.state.user.name} onChange={e => this.updateField(e)}
                placeholder="Digite o nome"/>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>email</label>
              <input type="text" className="form-control"
                name="email" value={this.state.user.email} onChange={e => this.updateField(e)}
                placeholder="digite o email"/>
            </div>
          </div>
        </div>
        <hr />
          <div className="row">
            <div className="col-12 d-flex justify-content-end">
              <button className="btn btn-primary" onClick={e => this.save(e)}>Salvar</button>
              <button className="btn btn-secondary ml-2" onClick={e => this.clear(e)}>cancelar</button>
            </div>
          </div>
      </div>
    )
  }

  load(user) {
    this.setState({user})
  }

  remove(user) {
    axios.delete(`${baseUrl}/${user.id}`).then(resp => {
      const list = this.getUpdateList(user, false)
      this.setState({list})
    })
  }

  renderTable(){
    return(
      <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>email</th>
            <th>ação</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    )
  }

  renderRows() {
    return this.state.list.map(user => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>
            <button className="btn btn btn-warning" onClick={() => this.load(user)}><i className="fa fa-pencil"></i></button>
            <button className="btn btn btn-danger ml-2" onClick={() => this.remove(user)}><i className="fa fa-trash"></i></button>
          </td>
        </tr>
      )
    })
  }

  render(){
    return(
      <Main {...headerProps}>
        {this.renderForm()}
        {this.renderTable()}
      </Main>
    )
  }
}
