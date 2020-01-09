import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Checkbox, Form, Icon, Input } from 'antd'
import { GlobalFooter } from 'ant-design-pro'
import { Trans, withI18n } from '@lingui/react'
import { setLocale } from 'utils'
import config from 'utils/config'
import { Button } from 'components'
import ReactWOW from 'react-wow'

import styles from './index.less'
const FormItem = Form.Item

@withI18n()
@connect(({ loading }) => ({ loading }))
@Form.create()
class Login extends PureComponent {
  handleOk = () => {
    const { dispatch, form } = this.props
    const { validateFieldsAndScroll } = form
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({ type: 'login/login', payload: values })
    })
  }

  componentWillMount() {
    if (document.querySelector('#loginStyle')) return
    const head = document.getElementsByTagName('head')[0]
    const style = document.createElement('style')
    style.id = 'loginStyle'
    style.type = 'text/css'
    style.appendChild(document.createTextNode(`
      .bounceInDown {
        animation-name: bounceInDown;
      }
      .bounceInLeft {
        animation-name: bounceInLeft;
      }
      .shake {
        animation-name: shake;
      }
      .animated {
        animation-duration: 1s;
        animation-fill-mode: both;
      }
      @keyframes bounceInDown {
        0%,60%,75%,90%,to {
          animation-timing-function: cubic-bezier(.215,.61,.355,1)
        }
        0% {
          opacity: 0;
          transform: translate3d(0,-3000px,0)
        }
        60% {
          opacity: 1;
          transform: translate3d(0,25px,0)
        }
        75% {
          transform: translate3d(0,-10px,0)
        }
        90% {
          transform: translate3d(0,5px,0)
        }
        to {
          transform: none
        }
      }
      @keyframes bounceInLeft {
        0%,60%,75%,90%,to {
          animation-timing-function: cubic-bezier(.215,.61,.355,1)
        }
        0% {
          opacity: 0;
          transform: translate3d(-3000px,0,0)
        }
        60% {
          opacity: 1;
          transform: translate3d(25px,0,0)
        }
        75% {
          transform: translate3d(-10px,0,0)
        }
        90% {
          transform: translate3d(5px,0,0)
        }
        to {
          transform: none;
        }
      }
      @keyframes shake {
        0%,100%,20%,50%,80% {
          transition-timing-function: cubic-bezier(0.215,.61,.355,1);
          transform: translate3d(0,0,0);
        }
        40%,43% {
          transition-timing-function: cubic-bezier(0.755,0.50,0.855,0.060);
          transform: translate3d(0,-30px,0);
        }
        70% {
          transition-timing-function: cubic-bezier(0.755,0.050,0.855,0.060);
          transform: translate3d(0,-15px,0);
        }
        90% {
          transform: translate3d(0,-4px,0);
        }
      }
    `))
    head.appendChild(style)
  }

  render() {
    const { loading, form, i18n } = this.props
    const { getFieldDecorator } = form

    return (
      <div className={styles.wrapper}>
        <ReactWOW animation="bounceInLeft" delay="0.15s">
          <div className={styles.form}>
            {/*<div className={styles.logo}>
              <img alt="logo" src={config.logoPath} />
              <span>{config.siteName}</span>
            </div>*/}
            <div className={styles.title}>
              <img alt="title" src={'login_title.svg'} />
            </div>
            <form>
              <FormItem>
                {getFieldDecorator('username', {
                  rules: [
                    {
                      required: false,
                      message: '请输入账号',
                    },
                  ],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: '#fff' }} />}
                    onPressEnter={this.handleOk}
                    placeholder={i18n.t`账号`}
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: false,
                      message: '请输入密码',
                    },
                  ],
                })(
                  <Input
                    type="password"
                    prefix={<Icon type="lock" style={{ color: '#fff' }} />}
                    onPressEnter={this.handleOk}
                    placeholder={i18n.t`密码`}
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: false,
                })(<Checkbox>{i18n.t`记住密码`}</Checkbox>)}
                <a className={styles.forgot} href="javasript:;">
                  {i18n.t`忘记密码`}
                </a>
                <Button
                  type="default"
                  className={styles.login}
                  onClick={this.handleOk}
                  loading={loading.effects.login}
                >
                  <Trans>登录</Trans>
                </Button>
              </FormItem>
            </form>
          </div>
        </ReactWOW>
        <ReactWOW animation="bounceInDown" delay="0.15s">
          <div className={styles.login_logo}>
            {/*<div className={styles.login_logo_ball}></div>*/}
            {/*<ReactWOW animation="shake" delay="0.15s" iteration="infinite">*/}
              <div className={styles.login_logo_ball}></div>
            {/*</ReactWOW>*/}
          </div>
        </ReactWOW>
      </div>
    )
  }
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Login
