import React from 'react'
import { Result } from 'antd'
import { Page, Button } from 'components'
import { addLangPrefix } from 'utils'
import Link from 'umi/link'

const Error = () => (
  <Page inner>
    <Result
      status="404"
      title="404"
      subTitle="对不起，您访问的页面不存在。"
      extra={
        <Link to={addLangPrefix('/dashboard')}>
          <Button type="primary">
            返回首页
          </Button>
        </Link>
      }
    />
  </Page>
)

export default Error
