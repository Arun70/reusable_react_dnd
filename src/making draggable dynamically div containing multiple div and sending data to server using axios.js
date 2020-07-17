import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from './draggable';
import axios from 'axios';
// import { response } from 'express';

class ForDraggable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:
                [
                    {
                        LI: '',
                        SA: '',
                        PT: '',
                        Rate: 2,
                        Qt: 6,
                        Bt: '',
                        Amt: 8,
                        Det: ''
                    }
                ],
            a: 1
        };
        this.addChange = this.addChange.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        // this.makeDraggable = this.makeDraggable.bind(this);
    }

    addChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onClickHandler2 = () => {
        axios.post('http://localhost:4000/itemData', this.state.data);
    }

    // componentDidMount(){
    //     axios.get('http://localhost:4000/itemData')
    //     .then(response => {
    //         this.setState({data:response.data})
    //     })
    //     .catch(error =>{
    //         this.setState({errormsg:'error in getting data...'})
    //     })
    // }

    makeDraggable = () => {
        return (
            <div className="flex-container">
                {new Date().getTime()}
                {this.state.a++};
                        <div className="flex-container"
                    style={{ 'display': 'inline' }}>
                    <div>hello world</div>
                    <span className="flex-container"
                        style={{ 'display': 'inline' }}>
                        <div className="flex-container"
                            style={{ 'display': 'inline' }}>
                            <input type="text"
                                name="LI"
                                value={this.state.data.LI}
                                placeholder="Custom Line Item Title"
                                onChange={this.addChange} />
                        </div>
                        <div className="flex-container"
                            style={{ 'display': 'inline' }}>
                            <div className="react-tag "></div>
                            <div className="react-tag "></div>
                        </div>
                    </span>
                    <select className="flex-container"
                        style={{ 'display': 'inline' }}
                        name="SA"
                        value={this.state.value}>
                        <option value="">
                            Select ServiceAgreement</option>
                        <option value="01HGu0N6HH">
                            Filter Prog (FIXED - ANNUALLY)</option>
                        <option value="9c7HKizz4c">
                            Gold Service Agreement (FIXED - ANNUALLY)
                                </option>
                        <option value="EavULOyVKC">
                            Non-SA</option>
                    </select>
                    <select className="flex-container"
                        placeholder="Select Pricing Tier"
                        name="PT"
                        value={this.state.value}>
                        <option value="">Select Pricing Tier</option>
                        <option value="YAV94cP1xn">NA</option>
                    </select>
                    <span className="flex-container">
                        <input type="text"
                            title="Rate of a single Line Item"
                            disabled=""
                            name="Rate"
                            placeholder="Rate" maxLength="10"
                            value={this.state.data.Rate} />
                    </span>
                    <span className="flex-container">
                        <input
                            title="Quantity of Line Item"
                            type="text"
                            name="Qt"
                            value={this.state.data.Qt}
                            placeholder="Qty" maxLeng   th="5" />
                    </span>
                    <span className="flex-container">
                        <span className="flex-container">
                            <button className="ui button positive active">
                                Taxable</button>
                            <span className="or"></span>
                            <button className="ui button">
                                Non taxable</button>
                        </span>
                    </span>
                    <span className="flex-container">
                        <span className="react-tag total_amount">
                            ${this.state.data.Rate}</span>
                    </span>
                    <i className="flex-container"></i>
                </div>
                <div className="flex-container2">
                    <div>
                        <button>
                            <i className="chevron down icon">
                            </i>Line Item Description
                        </button>
                    </div>
                    <div>
                        <textarea maxLength="3999"
                            name="Det"
                            value={this.state.data.Det}>
                        </textarea>
                    </div>
                </div>
                {/* <div>{console.log(this.state.data)}</div> */}
            </div>
            )
    }

    onClickHandler = (e) => {
        this.setState({
            data: [
                ...this.state.data,
                {
                    [e.target.name]: e.target.value
                }
            ]
        }, () => {
            e.preventDefault()
            if (this.draggable &&
                this.draggable.onRender &&
                this.draggable.onRender.constructor === Function) {
                    this.draggable.onRender
                    (
                        this.makeDraggable()
                        // <div>
                        // <input type="text" 
                        // name="LI"
                        // value={this.state.data.LI}
                        // placeholder="Title 1" 
                        // onChange={this.addChange}/>
                        // <input type="text" 
                        // name="SA"
                        // value={this.state.data.SA}
                        // placeholder="Title 2" 
                        // onChange={this.addChange}/>
                        // </div>
                    )
            }
        }
        )
    }

    render() {
        return (
            <div>
                <h1>Hello, this is dummy data for drag & drop.</h1>
                <h3>This is the list of the your Items:</h3>
                <form></form>
                <div>
                    <Draggable
                        ref={(item) => { this.draggable = item }}
                    />
                </div>
                {/* {this.state.errormsg? <div>{this.state.errormsg} </div>:null} */}
                <h3>Enter the Item:</h3>
                <div>
                    <button onClick={this.onClickHandler}>Add</button>
                </div>
                <div>
                    <button onClick={this.onClickHandler2}>Save</button>
                </div>
            </div>
        )
    }
}
export default ForDraggable;


// makeDraggable( lineItem ){
//     if(lineItem.length){
//         let temp = lineItem.map( item => this.renderLineItems(item) )

//     return (<Draggable components={temp} />)
//     }
//     return null;
// }