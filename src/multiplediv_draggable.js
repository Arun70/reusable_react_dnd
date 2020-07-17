import React from 'react';
import ReactDOM from 'react-dom';

var placeholder = document.createElement("div");
placeholder.className = "placeholder";

class MDD extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [{ name: 'abc', id: '1' }, { name: 'def', id: '2' }, { name: 'ghi', id: '3' }],
        }
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
        var listItems = this.state.items.map((item, i) => {
            return (
                <div
                    style={{ 'padding': "40px" }}
                    data-id={i}
                    key={i}
                    className="flex"
                    draggable='true'
                    onDragEnd={this.dragEnd.bind(this, item)}
                    onDragStart={this.dragStart.bind(this)}>
                    <div className="flex2" draggable="false">
                        <div>{item.name}</div><div>{item.id}</div>
                    </div>
                </div>
            )
        });

        return (
            <div onDragOver={this.dragOver.bind(this)}>
                {listItems}
            </div>
        )
    }
}


export default MDD;