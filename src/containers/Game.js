import React, { Component } from 'react'
import Axios from 'axios'
import './Game.css'
import photo from '../images/cardbg.jpg'

class Game extends Component {
    state = {
        name: '',
        balance: '',
        round: 0,
        remain: 52,
        deck_id: '',
        winningPool: 0,
        start: false,
        msg: '',
        cards: [],
        clicked: false,
        id: []
    }

    componentDidMount() {
        const data = localStorage.getItem('data')
        const datta = JSON.parse(data)
        this.setState({ name: datta.name, balance: datta.balance })
    }

    componentDidUpdate() {
        if (this.state.balance < 4) {
            this.return()
            alert('Your balance is not enough to play again.')
        }
    }

    onClickHandler = (img, value) => {
        this.setState({ clicked: true, id: img })
        setTimeout(() => {
            this.setState({ clicked: false, id: [] })
        }, 1000)
        if (value === 'ACE' || value === "10" || value === "8" || value === "6" || value === "5" || value === "3" || value === "KING" || value === "QUEEN" || value === "9") {
            this.setState({ winningPool: this.state.winningPool + (10 * this.state.round), msg: 'You Won!', round: this.state.round + 1 })
            Axios.get('https://deckofcardsapi.com/api/deck/' + this.state.deck_id + '/draw/?count=4').then(res => {
                this.setState({
                    cards: res.data.cards, remain: res.data.remaining, start: true
                })
                setTimeout(() => {
                    this.setState({ msg: '' })
                }, 2000)
            })
        } else {
            this.setState({ msg: 'You Lose!', start: false, round: 0, cards: [], remain: 52, winningPool: 0 })
            setTimeout(() => {
                this.setState({ msg: '' })
            }, 2000)
        }
    }

    startGame = () => {
        const sum = this.state.balance - 6
        this.setState({ balance: sum })
        Axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=4').then(res => {
            this.setState({
                cards: res.data.cards, remain: res.data.remaining, deck_id: res.data.deck_id, start: true, round: this.state.round + 1, msg: ''
            })
        }).catch(err => console.log(err))
        this.setState({ clicked: false })
    }

    return = () => {
        this.props.history.replace('/')
    }

    forfeit = () => {
        this.setState({ balance: this.state.balance + this.state.winningPool, start: false, round: 0, cards: [], remain: 52, winningPool: 0 })
    }

    render() {
        const { cards } = this.state
        cards.map((card) => (
            card.imageBg = photo
        ))
        return (
            <>
                <header>
                    <h1>Welcome: {this.state.name}</h1><h1>Your balance is: {this.state.balance} Euros</h1>
                </header>
                <div className="btns">
                    {this.state.start ? <button onClick={this.forfeit} style={{ marginRight: '30px' }}>Forfeit</button> : <button onClick={this.startGame} style={{ marginRight: '30px' }} >Start Game</button>}
                    <button onClick={this.return} style={{ marginRight: '30px' }}>Logout</button>
                </div>
                <div className="grid-container">
                    <div className="cards">
                        {cards.map(card => (
                            <img src={!this.state.clicked ? card.imageBg : ''} key={card.code} width="222" alt="" onClick={() => this.onClickHandler(card.image, card.value)} />
                        ))}
                        <img src={this.state.id} width="222" alt="" />
                    </div>
                    <div className="box">
                        <h1>Game Info</h1>
                        <h2>Round: {this.state.round}</h2>
                        <h2>Winning Pool: {this.state.winningPool}</h2>
                        <h2>Remaining Cards: {this.state.remain}</h2>
                    </div>
                    {this.state.msg ? <p className="message">{this.state.msg}</p> : null}
                </div>
            </>
        )
    }
}

export default Game