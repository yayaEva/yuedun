import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Icon, Row, DatePicker } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { Button, Modal, AsyncSelect } from 'components'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
@withI18n()
@Form.create()
class UserModal extends PureComponent {
  handleOk = () => {
    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      onOk(data)
    })
  }

  render() {
    const { item = {}, onOk, form, i18n, ...modalProps } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label={i18n.t`Web资产名称`} {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: item.name,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input allowClear placeholder={i18n.t`请输入`} />)}
          </FormItem>
          <FormItem label={i18n.t`URL`} {...formItemLayout}>
            {getFieldDecorator('url', {
              initialValue: item.url,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input allowClear placeholder={i18n.t`URL地址：http://www.example.com或http：//192.168.1.100`} />)}
          </FormItem>
          <FormItem label={i18n.t`Web资产IP`} {...formItemLayout}>
            {getFieldDecorator('ip', {
              initialValue: item.ip,
            })(<Input allowClear placeholder={i18n.t`例如 192.168.1.100，不填写系统会根据域名自动解析IP`} />)}
          </FormItem>
          <FormItem label={i18n.t`开办单位`} {...formItemLayout}>
            {getFieldDecorator('companty', {
              initialValue: item.companty,
            })(<Input allowClear />)}
          </FormItem>
          <FormItem label={i18n.t`开通时间`} {...formItemLayout}>
            {getFieldDecorator('start', {
              initialValue: item.start,
            })(<DatePicker allowClear format="YYYY-MM-DD" style={{ width: '100%' }} />)}
          </FormItem>
          <FormItem label={i18n.t`到期时间`} {...formItemLayout}>
            {getFieldDecorator('end', {
              initialValue: item.end,
            })(<DatePicker allowClear format="YYYY-MM-DD" style={{ width: '100%' }} />)}
          </FormItem>
          <FormItem label={i18n.t`Web资产运行方式`} {...formItemLayout}>
            {getFieldDecorator('fs', {
              initialValue: item.fs,
            })(<Input allowClear placeholder={i18n.t`例如：虚拟机、自管主机、托管主机`} />)}
          </FormItem>
          <FormItem label={i18n.t`域名注册服务商`} {...formItemLayout}>
            {getFieldDecorator('ym', {
              initialValue: item.ym,
            })(<Input allowClear />)}
          </FormItem>
          <FormItem label={i18n.t`工信部许可/备案号`} {...formItemLayout}>
            {getFieldDecorator('beian', {
              initialValue: item.beian,
            })(<Input allowClear />)}
          </FormItem>
          <FormItem label={i18n.t`开发单位`} {...formItemLayout}>
            {getFieldDecorator('unit', {
              initialValue: item.unit,
            })(<Input allowClear />)}
          </FormItem>
          <FormItem label={i18n.t`等级保护定级`} {...formItemLayout}>
            {getFieldDecorator('level', {
              initialValue: item.level,
            })(<Input allowClear />)}
          </FormItem>
          <FormItem label={i18n.t`服务器物理地址`} {...formItemLayout}>
            {getFieldDecorator('addr', {
              initialValue: item.addr,
            })(<Input allowClear />)}
          </FormItem>
          <FormItem label={i18n.t`中间件`} {...formItemLayout}>
            {getFieldDecorator('middle', {
              initialValue: item.middle,
            })(<Input allowClear />)}
          </FormItem>
          <FormItem label={i18n.t`操作系统`} {...formItemLayout}>
            {getFieldDecorator('czxt', {
              initialValue: item.czxt,
            })(<Input allowClear />)}
          </FormItem>
          <FormItem label={i18n.t`开发架构`} {...formItemLayout}>
            {getFieldDecorator('jg', {
              initialValue: item.jg,
            })(<Input allowClear />)}
          </FormItem>
          <FormItem label={i18n.t`是否开通外网`} {...formItemLayout}>
            {getFieldDecorator('ww', {
              initialValue: item.ww,
            })(<Input allowClear />)}
          </FormItem>
          <FormItem label={i18n.t`负责人`} {...formItemLayout}>
            {getFieldDecorator('f', {
              initialValue: item.f,
            })(<Input prefix={<Icon type="user" style={{ color: '#71bfb4' }} />} allowClear placeholder={i18n.t`请输入负责人名称`} />)}
          </FormItem>
          <FormItem label={i18n.t`手机`} {...formItemLayout}>
            {getFieldDecorator('fMobile', {
              initialValue: item.fMobile,
            })(<Input prefix={<Icon type="mobile" style={{ color: '#71bfb4' }} />} allowClear placeholder={i18n.t`输入11位手机号码`} />)}
          </FormItem>
          <FormItem label={i18n.t`座机`} {...formItemLayout}>
            {getFieldDecorator('fPhone', {
              initialValue: item.fPhone,
            })(<Input prefix={<Icon type="phone" style={{ color: '#71bfb4' }} />} allowClear placeholder={i18n.t`例：010-00000000`} />)}
          </FormItem>
          <FormItem label={i18n.t`邮箱`} {...formItemLayout}>
            {getFieldDecorator('fEmail', {
              initialValue: item.fEmail,
            })(<Input prefix={<Icon type="mail" style={{ color: '#71bfb4' }} />} allowClear placeholder={i18n.t`例：xxxxxxxxxx@qq.com`} />)}
          </FormItem>
          <FormItem label={i18n.t`安全联系人`} {...formItemLayout}>
            {getFieldDecorator('a', {
              initialValue: item.a,
            })(<Input prefix={<Icon type="user" style={{ color: '#71bfb4' }} />} allowClear placeholder={i18n.t`请输入负责人名称`} />)}
          </FormItem>
          <FormItem label={i18n.t`手机`} {...formItemLayout}>
            {getFieldDecorator('aMobile', {
              initialValue: item.aMobile,
            })(<Input prefix={<Icon type="mobile" style={{ color: '#71bfb4' }} />} allowClear placeholder={i18n.t`输入11位手机号码`} />)}
          </FormItem>
          <FormItem label={i18n.t`座机`} {...formItemLayout}>
            {getFieldDecorator('aPhone', {
              initialValue: item.aPhone,
            })(<Input prefix={<Icon type="phone" style={{ color: '#71bfb4' }} />} allowClear placeholder={i18n.t`例：010-00000000`} />)}
          </FormItem>
          <FormItem label={i18n.t`邮箱`} {...formItemLayout}>
            {getFieldDecorator('aEmail', {
              initialValue: item.aEmail,
            })(<Input prefix={<Icon type="mail" style={{ color: '#71bfb4' }} />} allowClear placeholder={i18n.t`例：xxxxxxxxxx@qq.com`} />)}
          </FormItem>
          <FormItem label={i18n.t`开发者`} {...formItemLayout}>
            {getFieldDecorator('p', {
              initialValue: item.p,
            })(<Input prefix={<Icon type="user" style={{ color: '#71bfb4' }} />} allowClear placeholder={i18n.t`请输入开发者名称`} />)}
          </FormItem>
          <FormItem label={i18n.t`手机`} {...formItemLayout}>
            {getFieldDecorator('pMobile', {
              initialValue: item.pMobile,
            })(<Input prefix={<Icon type="mobile" style={{ color: '#71bfb4' }} />} allowClear placeholder={i18n.t`输入11位手机号码`} />)}
          </FormItem>
          <FormItem label={i18n.t`邮箱`} {...formItemLayout}>
            {getFieldDecorator('pEmail', {
              initialValue: item.pEmail,
            })(<Input prefix={<Icon type="mail" style={{ color: '#71bfb4' }} />} allowClear placeholder={i18n.t`例：xxxxxxxxxx@qq.com`} />)}
          </FormItem>
          <FormItem label={i18n.t`相关组件`} {...formItemLayout}>
            <Row type="flex" justify="space-between">
              {getFieldDecorator('component', {
                initialValue: item.component,
              })(<AsyncSelect defaultOptions={[]} placeholder={i18n.t`--选择服务--`} width="40%" />)}
              {getFieldDecorator('zj', {
                initialValue: item.zj,
              })(<Input allowClear style={{ width: '40%' }} />)}
              <a style={{ color: '#71bfb4', lineHeight: '32px' }}><Icon type="plus" /></a>
            </Row>
          </FormItem>
          <FormItem label={i18n.t`备注信息`} {...formItemLayout}>
            {getFieldDecorator('remark', {
              initialValue: item.remark,
            })(<Input allowClear placeholder={i18n.t`Web资产地址说明、标识Web资产特征`} />)}
          </FormItem>
          <FormItem label={i18n.t`所属资产组`} {...formItemLayout}>
            <Row type="flex" justify="space-between">
              {getFieldDecorator('group', {
                initialValue: item.group,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<AsyncSelect defaultOptions={[]} placeholder={i18n.t`研究机构`} width="60%" />)}
              <a style={{ color: '#71bfb4', lineHeight: '32px' }}>创建资产组</a>
            </Row>
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

UserModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default UserModal
