import React, { Component } from 'react'
import './Home.css'

class Home extends Component {
    state = {
        name: '',
        balance: ''
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    continueHandler = () => {
        const data = {
            name: this.state.name,
            balance: this.state.balance
        }
        const dat = JSON.stringify(data)
        localStorage.setItem('data', dat)
        this.props.history.replace('/game')
    }

    render() {
        return (
            <>
                <header>
                    <h1>Card Game</h1>
                </header>
                <div className="container">
                    <div className="loginCard">
                        <div className="content">
                            <h2>Welcome Player</h2>
                            <input type="text" id="name" placeholder="Write your name" onChange={this.onChangeHandler} style={{ marginBottom: '20px' }} />
                            <input type="text" id="balance" placeholder="Insert your balance" onChange={this.onChangeHandler} style={{ marginBottom: '20px' }} />
                            <button onClick={this.continueHandler}>Continue</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Home