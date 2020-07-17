import React from 'react';
import ReactDOM from 'react-dom';

var placeholder = document.createElement("div");
placeholder.className = "placeholder1";
// var placeholder2 = document.createElement("li");
// placeholder2.className = "placeholder2";

class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = { items: [], name: '' };
        this.addChange = this.addChange.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    addChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onClickHandler = (event) => {
        // debugger
        // console.log([...this.state.items, this.state.name]);
        this.setState({
            items: [...this.state.items, this.state.name]
        });
    }

    dragStart(e) {
        this.dragged = e.currentTarget;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.dragged);
    }

    dragEnd(e) {
        this.dragged.style.display = 'block';
        this.dragged.parentNode.removeChild(placeholder);

        // update state
        var data = this.state.items;
        var from = Number(this.dragged.dataset.id);
        var to = Number(this.over.dataset.id);
        if (from < to) to--;
        data.splice(to, 0, data.splice(from, 1)[0]);
        this.setState({ items: data });
    }

    dragOver(e) {
        e.preventDefault();
        this.dragged.style.display = "none";
        if (e.target.className === 'placeholder') return;
        this.over = e.target;
        e.target.parentNode.insertBefore(placeholder, e.target);
    }

    render() {
        const { items } = this.state;
        var listItems = this.state.items.map((item, i) => {
            return (
                <div
                    data-id={i}
                    key={i}
                    draggable='true'
                    onDragEnd={this.dragEnd.bind(this, item)}
                    onDragStart={this.dragStart.bind(this)}>{item}{" "}{i}</div>
            )
        });

        return (
            <div>
                <h1>Hello, this is dummy data for drag & drop.</h1>
                {/* <form> */}
                <h3>This is the list of the yout Items:</h3>
                {/* <div className="flex" > */}
                <div>
                    <div onDragOver={this.dragOver.bind(this)}>{listItems}</div>
                </div >
                {/* </div> */}
                <h3>Enter the Item:</h3>
                <div>
                    <div>
                        {/* <p>Enter your name:</p> */}
                        <input
                            type='text'
                            name='name'
                            placeholder="Enter your item"
                            value={this.state.name || ''}
                            onChange={this.addChange}
                        />
                    </div>
                    <div>
                        <button onClick={this.onClickHandler}>Add</button>
                    </div>
                </div>
                <br>
                </br>
                {/* {this.state.name} */}
            </div>
        )
    }
}


export default List;