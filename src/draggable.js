import React from 'react';

var placeholder = document.createElement("section");
placeholder.className = "draggable-placeholder";

class Draggable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            components: []
        };
    }

    onRender(component) {
        return new Promise((resolve, reject) => {
            this.setState({
                components: [...this.state.components, component]
            }, () => {
                resolve();
            });
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
            if (this.dragged.parentNode &&
                this.dragged.parentNode.children &&
                this.dragged.parentNode.children.length) {
                let matched = false;
                for (let item of this.dragged.parentNode.children) {
                    if (item && item.className && item.className === 'draggable-placeholder') {
                        matched = true;
                        break;
                    }
                }
                if (matched) {
                    this.dragged.parentNode.removeChild(placeholder);
                    // update state
                    var data = this.state.components;
                    var from = Number(this.dragged.dataset.id);
                    var to = Number(this.over.dataset.id);
                    data.splice(to, 0, data.splice(from, 1)[0]);
                    this.setState({ components: data });
                }
            }
        }
    }

    dragOver(e) {
        e.preventDefault();
        this.dragged.style.display = "none";
        if (e.target.className === 'draggable-placeholder') return;
        this.over = e.target;
        e.target.parentNode.insertBefore(placeholder, e.target);
    }

    render() {
        var listItems = this.state.components.map((item, i) => {
            return (
                <div
                    style={{ 'padding': '40px' }}
                    data-id={i}
                    key={i}
                    draggable='true'
                    onDragEnd={this.dragEnd.bind(this, item)}
                    onDragStart={this.dragStart.bind(this)}>
                    <div draggable='true'>
                        <div draggable='false'>
                            {item}
                        </div>
                    </div>
                </div>
            )
        });
        return (
            // <div>
                <div onDragOver={this.dragOver.bind(this)}>{listItems}</div>
            // </div >
        )
    }
}
export default Draggable;