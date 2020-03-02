import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Progress } from 'components'
import { Trans, withI18n } from '@lingui/react'
import styles from './CardList.less'

@withI18n()
class CardList extends PureComponent {
  render() {
    const { dataSource = [], title,color=[] } = this.props
    return (
      <div className={styles.card}>
        <div className={styles.inner}>
          {title ? <div className={styles.title}><div>{title}</div><div>TOP5</div></div> : null}
          <div className={styles.body}>
            {dataSource.map((v, i) => {
              return <Progress strokeColor={color[i]} textColor={color[i]} className={styles.progress} headerClass={styles.progressHeader} key={i} title={v.title} percent={v.percent} value={v.value} />
            })}
          </div>
        </div>
      </div>
    )
  }
}

CardList.propTypes = {
  title: PropTypes.string,
  dataSource: PropTypes.array,
}

export default CardList
