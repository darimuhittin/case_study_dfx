/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import type { UserType } from 'common/types/global'
import { Card, CardContent } from '@mui/material'

import classNames from 'common/util/classNames'
import styles from './UserCard.module.scss'

const UserCard = ({ user }: { user: UserType }): JSX.Element => {
  const isActive = Math.round(Math.random()) === 1
  return (
    <Card className={styles.root}>
      <CardContent className={styles.container}>
        <div className={styles.top_bar}>
          <div className={styles.profile_container}>
            <img
              src={`https://i.pravatar.cc/64?u=${user.email as string}`}
              className={styles.image}
            />
            <span className={styles.user_name}>{user.username}</span>
          </div>
          <div className={styles.status_section}>
            <div className={classNames(styles.status_container)}>
              <span className={styles.bold}>Status :</span>

              <div className={classNames(isActive ? styles.active : styles.inactive)} />
              <span className={styles.status_result}>{isActive ? 'ACTIVE' : 'INACTIVE'}</span>
            </div>
          </div>
        </div>
        <div className={styles.data_container}>
          <div className={styles.data_container__info}>
            <div className={styles.data_field}>
              <span className={classNames(styles.bold, styles.data_field__caption)}>Name :</span>
              <span>{user.name}</span>
            </div>
            <div className={styles.data_field}>
              <span className={classNames(styles.bold, styles.data_field__caption)}>Phone :</span>
              <span>{user.phone}</span>
            </div>{' '}
            <div className={styles.data_field}>
              <span className={classNames(styles.bold, styles.data_field__caption)}>Web :</span>
              <span>{user.website}</span>
            </div>
            <div className={styles.data_field}>
              <span className={classNames(styles.bold, styles.data_field__caption)}>Email :</span>
              <span className={styles.email_field}>{user.email}</span>
            </div>
          </div>
          <div className={styles.buttons_container}>
            <div className={styles.buttons_container__inner}>
              <FontAwesomeIcon icon={faInfoCircle} className={styles.details} size={'2x'} />
              <FontAwesomeIcon
                icon={faEdit}
                className={styles.edit}
                style={{ marginLeft: '10px' }}
                size={'2x'}
              />
              <FontAwesomeIcon
                icon={faTrash}
                className={styles.delete}
                size={'2x'}
                style={{ marginLeft: '10px' }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default React.memo(UserCard)
