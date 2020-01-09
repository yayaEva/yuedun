import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'

const { Option } = Select
const defaultFieldNames = {
  value: 'value',
  label: 'label',
}
const optionsCache = {}

class AsyncSelect extends PureComponent {
  constructor(props) {
    super()
    this.state = {
      defaultOptions: Array.isArray(props.defaultOptions) ? props.defaultOptions : undefined,
      loadedOptions: [],
      inputValue: '',
      isLoading: props.defaultOptions === true,
      defaultFieldNames: { ...defaultFieldNames, ...props.defaultFieldNames },
    }
  }

  mounted = false

  componentDidMount() {
    this.mounted = true
    const { defaultOptions, cacheType } = this.props
    const { inputValue } = this.state
    if (defaultOptions === true) {
      if (cacheType && optionsCache[cacheType]) {
        this.setState({ defaultOptions: optionsCache[cacheType], isLoading: false })
        return
      }

      this.loadOptions(inputValue, options => {
        if (!this.mounted) return
        this.setState({ defaultOptions: options || [], isLoading: false }, () => {
          if (cacheType) {
            optionsCache[cacheType] = options
          }
        })
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultOptions !== this.props.defaultOptions) {
      this.setState({
        defaultOptions: Array.isArray(nextProps.defaultOptions) ? nextProps.defaultOptions : undefined,
      })
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  loadOptions = (inputValue, callback) => {
    const { loadOptions } = this.props

    if (!loadOptions) return callback()

    const loader = loadOptions(inputValue, callback)

    if (loader && typeof loader.then === 'function') {
      loader.then(callback, () => callback())
    }
  }

  onSearch = (value) => {
    const { onSearch, async } = this.props

    let inputValue = value

    if (onSearch) {
      const newValue = onSearch(value)
      if (typeof newValue === 'string') {
        inputValue = newValue
      }
    }

    if (!inputValue || !async) {
      this.setState({
        inputValue: '',
        loadedOptions: [],
      })
    }

    if (!async) return

    this.setState({
      inputValue,
      isLoading: true,
      loadedOptions: [],
    }, () => {
      this.loadOptions(inputValue, options => {
        if (!this.mounted) return
        this.setState({ loadedOptions: options || [], isLoading: false })
      })
    })
  }

  render() {
    const { width = '100%', valueInlabel, async, children, ...restProps } = this.props
    const { defaultOptions, defaultFieldNames, loadedOptions, inputValue, isLoading } = this.state
    const options = inputValue ? loadedOptions : defaultOptions || []
    const loadingText = isLoading ? <div style={{ textAlign: 'center' }}>Loading...</div> : restProps.notFoundContent
    const filterOption = async ? false : (restProps.filterOption || true)

    delete restProps.defaultOptions
    delete restProps.loadOptions
    delete restProps.defaultFieldNames
    delete restProps.cacheType

    // 仅显示文本
    if (valueInlabel) {
      if (!options.length) return null
      return options.find((_) => _.value === valueInlabel)[defaultFieldNames.label]
    }

    // 显示下拉框
    return (
      <React.Fragment>
        <Select showSearch allowClear {...restProps} filterOption={filterOption} notFoundContent={loadingText} loading={isLoading} onSearch={this.onSearch} style={{ width }}>
          {options.map((n) => {
            return <Option key={n[defaultFieldNames.value]} value={n[defaultFieldNames.value]}>{n[defaultFieldNames.label]}</Option>
          })}
        </Select>
        {children}
      </React.Fragment>
    )
  }
}

AsyncSelect.defaultProps = {
  defaultFieldNames,
  async: false,
  valueInlabel: '',
  cacheType: '',
}

AsyncSelect.propTypes = {
  defaultFieldNames: PropTypes.object,
  defaultOptions: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  loadOptions: PropTypes.func,
  async: PropTypes.bool,
}

export default AsyncSelect
