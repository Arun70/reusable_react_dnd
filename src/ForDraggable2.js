import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from './draggable';

class ForDraggable2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            nextId: 1,
            inp1:'',
            data: [
                { text: 'Item 1', id: 1 },
                { text: 'Item 2', id: 2 }
            ],
        };
        this.addChange = this.addChange.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        // this.onClickHandler1 = this.onClickHandler1.bind(this);
    }

    async componentDidMount() {
        const data = this.state.data || [];
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            if (this.draggable &&
                this.draggable.onRender &&
                this.draggable.onRender.constructor === Function) {
                await this.draggable.onRender(
                    <div>
                        <div style={{ 'display': 'inline' }}>
                            <input
                                type="text"
                                name='inp1'
                                className="react-tag"
                                placeholder="Item Title"
                                value={this.state.inp1 || ''}
                                onChange={this.addChange} />
                        </div>
                        <div style={{ 'display': 'inline' }}>
                            <button id={item.id} onClick={
                                () => this.idChange(this.state.nextId++)}>
                                Add
                            </button>
                        </div>
                    </div>
                );
            }
        }
    }

    addChange = (e) => {
        this.setState({
            data: [
                ...this.state.data,
                {
                    [e.target.name]: e.target.value,
                    id: e.target.id
                }
            ]
        });
        // this.setState({ [e.target.name]: e.target.value });
    }

    idChange = (id) => {
        alert("Clicked on Add Button of ID: " + id);
    }

    onClickHandler = () => {
        this.setState({
            items: [...this.state.items, this.state.text]
        }, () => {
            if (this.draggable &&
                this.draggable.onRender &&
                this.draggable.onRender.constructor === Function) {
                this.draggable.onRender(
                    <div>
                        <div style={{ 'display': 'inline' }}>
                            <input
                                type="text"
                                name='inp1'
                                className="react-tag"
                                placeholder="Item Title"
                                value={this.state.inp1 || ''}
                                onChange={this.addChange} 
                                />
                        </div>
                        <div style={{ 'display': 'inline' }}>
                            <button onClick={
                                () => this.idChange(this.state.nextId++)}>
                                Add
                        </button>
                        </div>
                    </div>);
            }
        });
    }

    render() {
        return (
            <div>
                <h1>Hello, this is dummy data for drag & drop.</h1>
                <h3>This is the list of the your Items:</h3>

                <div >
                    {
                        (this.state.data || []).map((item) => {
                            return (
                                <div key={item.id}>
                                    <b>{item.id}</b>  <code>{item.text}</code>
                                </div>
                            );
                        })
                    }
                </div>

                <div>
                    <Draggable
                        ref={
                            (component) => {
                                this.draggable = component
                            }
                        }
                    />
                </div >
                <h3>Enter the Item:</h3>
                <div>
                    {/* <div>
                        <input
                            type='text'
                            name='name'
                            placeholder="Enter your item"
                            value={this.state.name || ''}
                            onChange={this.addChange}
                        />
                    </div> */}
                    <div>
                        <button onClick={this.onClickHandler}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default ForDraggable2;