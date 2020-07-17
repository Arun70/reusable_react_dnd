import React from 'react';
import ReactDOM from 'react-dom';

import style from './Mypr.css'

class Mypr extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            // item: [{
            name: '',
            // }, {
            //id: null,
            // }, {
            //order: null
            // }],
            // des1: 'write name',
            // des2: 'write ID',
            // des3: 'write order',
            //error: ''
        };
        this.addChange = this.addChange.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    // myChangeHandler = (event) => {
    //     let nam = event.target.name;
    //     let val = event.target.value;
    //     let err = '';
    //     if (nam === "id" || nam === "order") {
    //         if (val != "" && !Number(val)) {
    //             err = 'Enter a valid number'
    //         }
    //     }
    //     this.setState({ [nam]: val, error: err });
    // }
    addChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        this.setState({ [e.target.id]: e.target.value });
        this.setState({ [e.target.order]: e.target.value });
    }

    deleteEvent = (event) => {
        const d1 = Object.assign(this.state.name);
        d1.splice(this.props, 1);
        this.setState(this.state.item, d1);
    }
    // selection = (items) => {
    //     // let concatvalue = items.concat(this.state.name);
    //     // console.log('concatvalue', concatvalue)
    //     this.setState(items.concat[this.state.name,this.state.id,this.state.order])
    // }

    onClickHandler = (event) => {
        debugger
        console.log([...this.state.items, this.state.name]);
        this.setState({
            items: [...this.state.items, this.state.name]
        });
    }

    render() {
        return (
            <div>
                <h1>Hello, this is dummy data for drag & drop.</h1>
                {/* <form> */}
                <h3>Enter your Name, ID and Order of the Item:</h3>
                <div className="flex" >
                    <div className="flex-contained" >
                        <p>Enter your name:</p>
                        <input
                            type='text'
                            name='name'
                            value={this.state.name || ''}
                            onChange={this.addChange}
                        />
                    </div>
                    <div className="flex-contained" >
                        <p>Enter ID:</p>
                        <input
                            type='text'
                            name='id'
                            value={this.state.id || ''}
                            onChange={this.addChange}
                        />
                    </div>
                    <div className="flex-contained" >
                        <p>Enter order:</p>
                        <input
                            type='text'
                            name='order'
                            value={this.state.order || ''}
                            onChange={this.addChange}
                        />
                    </div>
                    {this.state.err}
                </div>
                <br>
                </br>
                {/* {this.state.name} */}
                <div className="flex" >
                    <div className="flex-contained" >
                        <select >
                            {
                                this.state.items.map(item => (
                                    <option value={item}>{item}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="flex-contained" >
                        <button onClick={this.onClickHandler}>Add</button>
                    </div>
                    <div className="flex-contained" >
                        <button onClick={this.delete}>Delete</button>
                    </div>
                    {/* </form> */}
                </div >
            </div>
        )
    }
}
export default Mypr;