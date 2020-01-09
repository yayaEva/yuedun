import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

/**
 * requestAnimationFrame polyfill
 */
(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }
  if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = window.setTimeout(function() {
        callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
  if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
    clearTimeout(id);
  };
}());

function createCanvas(canvas, config = {}) {
  const context = canvas.getContext('2d')
  const centerX = canvas.width / 2
  const centerY = canvas.height / 2
  const rad = Math.PI * 2 / 100
  const radius = canvas.width * .5 * .75

  Object.assign(config || {}, { strokeWidth: 5, gutter: 10 })

  function circle(n, i, itemStyle = {}) {
    context.save()
    context.beginPath()
    context.strokeStyle = itemStyle.color || '#56b300'
    context.lineWidth = itemStyle.strokeWidth || config.strokeWidth
    context.arc(centerX, centerY, radius - i * config.gutter, Math.PI / 2, Math.PI / 2 + n * rad, false)
    context.stroke()
    context.restore()
  }

  function line(i, lineStyle = {}) {
    context.save()
    context.beginPath()
    context.strokeStyle = lineStyle.color || '#42dda9'
    context.lineWidth = lineStyle.strokeWidth || 1
    context.arc(centerX, centerY, radius - i * config.gutter, 0, Math.PI * 2, false)
    context.stroke()
    context.closePath()
    context.restore()
  }

  function convert(nums) {
    return nums.map((v) => {
      if (typeof v !== 'object') {
        return {
          name: v,
          value: v,
        }
      }
      return v
    })
  }

  function draw(nums = [], colors = []) {
    context.clearRect(0, 0, canvas.width, canvas.height)
    convert(nums).forEach((v, i) => {
      line(i, v.lineStyle)
      circle(v.value, i, v.itemStyle || { color: colors[i] })
    })
  }



  function drawFrame(nums = [], colors = []) {
    let _speed = 0, _timeout = null, _isEnd = true, _nums = convert(nums)

    function _reset() {
      _speed = 0
      _isEnd = true
      if (_timeout) {
        window.cancelAnimationFrame(_timeout)
        _timeout = null
      }
    }

    function _draw() {
      _isEnd = true
      _speed += 2.5
      context.clearRect(0, 0, canvas.width, canvas.height)
      _nums.forEach((v, i) => {
        if (_speed < v.value) _isEnd = false
        let value = _speed < v.value ? _speed : v.value
        value = value <= 100 ? value : 100
        line(i, v.lineStyle)
        circle(value, i, v.itemStyle || { color: colors[i] })
      })
      if (!_isEnd) {
        _timeout = window.requestAnimationFrame(_draw)
      } else {
        _reset()
      }
    }

    _reset()
    _draw()
  }

  return {
    draw,
    drawFrame,
  }
}

class CircleProgress extends PureComponent {
  componentDidMount() {
    const { data, color } = this.props
    this.ctx = createCanvas(this.refs.canvas)
    data && this.ctx.drawFrame(data, color)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      nextProps.data && this.ctx.drawFrame(nextProps.data, nextProps.color)
    }
  }

  render() {
    const { width, height, className } = this.props
    return (
      <canvas ref={'canvas'} className={className} width={width} height={height}>
        <p>You browser not support canvas!</p>
      </canvas>
    )
  }
}

CircleProgress.defaultProps = {
  data: [],
  color: [],
  width: 200,
  height: 200,
}

CircleProgress.propTypes = {
  data: PropTypes.array,
  color: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
}

export default CircleProgress
