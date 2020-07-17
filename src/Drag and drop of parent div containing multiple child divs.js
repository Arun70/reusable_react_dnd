import React from 'react';
import ReactDOM from 'react-dom';

var placeholder = document.createElement("section");
placeholder.className = "placeholder";

class Draggable extends React.Component {

    constructor(props) {
        super(props);
        // console.log(props);
        this.state = { items: [], name1: '' };
        this.addChange = this.addChange.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    addChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onClickHandler = (event) => {
        console.log(this.state.name1);
        this.setState({
            items: [...this.state.items, this.state.input]
        });
    }

    dragStart(e) {
        this.dragged = e.currentTarget;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.dragged);
    }

    dragEnd(e) {
        this.dragged.style.display = 'block';
        if (placeholder.parentNode) {
            if (this.dragged.parentNode && this.dragged.parentNode.children && this.dragged.parentNode.children.length) {
                let matched = false;
                for (let item of this.dragged.parentNode.children) {
                    if (item && item.nodeName && item.nodeName === 'SECTION') {
                        matched = true;
                        break;
                    }
                }
                if (matched) {
                    this.dragged.parentNode.removeChild(placeholder);
                    // update state
                    var data = this.state.items;
                    var from = Number(this.dragged.dataset.id);
                    var to = Number(this.over.dataset.id);
                    // if (from < to) to--;
                    data.splice(to, 0, data.splice(from, 1)[0]);
                    this.setState({ items: data });
                }

            }
        }
    }

    dragOver(e) {
        e.preventDefault();
        this.dragged.style.display = "none";
        // this.dragged.style.background = "red";
        if (e.target.className === 'placeholder') return;
        this.over = e.target;
        e.target.parentNode.insertBefore(placeholder, e.target);
    }

    render() {
        var listItems = this.state.items.map((item, i) => {
            return (
                <div
                    style={{ 'padding': '40px' }}
                    data-id={i}
                    key={i}
                    draggable='true'
                    onDragEnd={this.dragEnd.bind(this, item)}
                    onDragStart={this.dragStart.bind(this)}>
                    <div draggable='true'>
                        {item}
                        <div><input type="text" name="name" id="name" /></div>
                        <div><textarea type="text" name="description" id="description" /></div>
                    </div>
                </div>
            )
        });
        return (
            <div>
                <h1>Hello, this is dummy data for drag & drop.</h1>
                <h3>This is the list of the your Items:</h3>
                <div>
                    <div onDragOver={this.dragOver.bind(this)}>{listItems}</div>
                </div >
                <h3>Enter the Item:</h3>
                {this.state.name1}
                <div>
                    <div>
                        <input
                            type='text'
                            name='input'
                            placeholder="Enter your item"
                            value={this.state.input || ''}
                            onChange={this.addChange}
                        />
                    </div>
                    <div>
                        <button onClick={this.onClickHandler}>Add</button>
                    </div>
                </div>
                {/* {this.state.name} */}
            </div>
        )
    }
}
export default Draggable