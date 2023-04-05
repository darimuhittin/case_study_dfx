import React, { useEffect, useState } from 'react'
import Client from './api/API'
import {
  Container,
  Button,
  Snackbar,
  Alert,
  // List,
  // ListItem,
  Grid,
  Input,
  CircularProgress,
  Box
} from '@mui/material'
import UserCard from './common/components/UserCard/UserCard'
import type { UserType } from 'common/types/global'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch } from 'app/store'
import { fetchUsers } from './slices/globalSlice'

import styles from './App.module.scss'

const inputSx = {
  '& .MuiInputBase-input': {
    color: '#262626',
    backgroundColor: 'white',
    borderRadius: '5px',
    padding: '10px',
    fontSize: '16px',
    border: 'none',
    '&:focus': {
      outline: 'none'
    }
  }
}

function App(): JSX.Element {
  const [open, setOpen] = React.useState(false)
  const [errMessage, setErrMessage] = React.useState('')
  const { data, status } = useSelector((state: any) => state.global)
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([])
  const [filter, setFilter] = useState<Record<string, string>>({})
  const [filterShadow, setFilterShadow] = useState<Record<string, string>>({})

  const dispatch = useDispatch<AppDispatch>()

  const handlePutError = (): void => {
    Client.put('/users_error')
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        setErrMessage(err.message)
        setOpen(true)
      })
  }

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const handleFilter = (): void => {
    setFilter(filterShadow)
  }

  useEffect(() => {
    void dispatch(fetchUsers())
  }, [])

  useEffect(() => {
    if (data.length > 0) {
      const filtered = data.filter((user: UserType) => {
        let namePass = true
        let emailPass = true
        let webPass = true
        if (filter.name != null) {
          namePass = user.name.toLowerCase().includes(filter.name?.toLowerCase())
        }
        if (filter.email != null) {
          emailPass = user.email.toLowerCase().includes(filter.email?.toLowerCase())
        }
        if (filter.web != null) {
          webPass = user.website.toLowerCase().includes(filter.web?.toLowerCase())
        }

        return namePass && emailPass && webPass
      })
      setFilteredUsers(filtered)
    }
  }, [filter, data])
  return (
    <Container className={styles.root}>
      <Button variant="contained" color="error" onClick={handlePutError}>
        PUT ERROR
      </Button>
      <div className={styles.filter}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <span>Name</span>
            <Input
              onChange={(e) => {
                setFilterShadow({ ...filter, name: e.target.value })
              }}
              fullWidth
              className={styles.filter__input}
              sx={inputSx}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <span>Email</span>
            <Input
              onChange={(e) => {
                setFilterShadow({ ...filter, email: e.target.value })
              }}
              fullWidth
              className={styles.filter__input}
              sx={inputSx}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <span>Web</span>
            <Input
              onChange={(e) => {
                setFilterShadow({ ...filter, web: e.target.value })
              }}
              fullWidth
              className={styles.filter__input}
              sx={inputSx}
            />
          </Grid>{' '}
          <Grid item xs={12} md={3}>
            <div className={styles.filter_button_container}>
              <Button variant="contained" onClick={handleFilter} fullWidth>
                Filter
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
      <main className={styles.content}>
        {status === 'loading' ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {filteredUsers.map((user: any) => (
              <Grid item xs={12} md={6} key={user.id}>
                <UserCard user={user} />
              </Grid>
            ))}
          </Grid>
        )}
      </main>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {errMessage}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default App
