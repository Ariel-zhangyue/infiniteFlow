import React, { PureComponent } from 'react';
import Item from './Item';

export default class extends PureComponent {
  state = {
    displayQueue: [],
  }

  data = [
    { icon: 'a', text: '今天天气不错' },
    { icon: 'b', text: '恭喜王大锤中奖' },
    { icon: 'c', text: '明天会更好' },
  ];

  idx = 0;
  raf = null;
  containerRef = React.createRef();
  flag = false

  componentDidMount() {
    const { displayQueue = [] } = this.state;
    displayQueue.push({
      item: this.data[this.idx],
    });
    this.setState({
      displayQueue: [].concat(displayQueue),
    })
  }

  onMoveout = () => {
    const { displayQueue } = this.state
    displayQueue.shift()
    this.setState({
      displayQueue: [...displayQueue]
    })
  }

  onMovein = () => {

    const { displayQueue } = this.state
    this.idx = (this.idx + 1) % this.data.length;
    displayQueue.push({
      key: Date.now(),
      item: this.data[this.idx]
    })
    this.setState({
      displayQueue: [...displayQueue]
    })
  }

  render() {
    const { displayQueue = [] } = this.state;
    return <div
      ref={this.containerRef} style={{
        width: '100vw',
        overflow: 'hidden',
        height: '100px',
        backgroundColor: 'black',
        display: 'flex',
        color: '#FFF'
      }}>
      {displayQueue.map((item) =>
      (
        <Item
          key={item.key}
          item={item}
          onMovein={this.onMovein}
          onMoveout={this.onMoveout} />
      )
        // <div style={{
        //   position: 'relative',
        //   display: 'inline-block',
        //   left: item.x,
        // }}>{item.item.text}</div>
      )}
    </div>;
  }
}