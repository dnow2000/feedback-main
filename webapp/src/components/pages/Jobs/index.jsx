import React from 'react'
import {
  NavLink,
  Switch,
  Route,
  useLocation
} from 'react-router-dom'

import Header from 'components/layout/Header'
import Main from 'components/layout/Main'
import List from './List'
import Info from './Info'
import Sync from './SyncJobs'

import capitalizeAll from 'utils/capitalizeAll'


const tabs = [
  {
    component: Info,
    location: "/jobs/info",
    name: 'info'
  },
  {
    component: List,
    location: "/jobs/list",
    name: 'list'
  },
  {
    component: Sync,
    location: "/jobs/sync",
    name: 'sync'
  }
]

const _ = () => {
  const location = useLocation()

  return (
    <>
      <Header />
      <Main className='jobs'>
        <div className='container'>
          <div className='tab-bar'>
            {tabs.map(tab => (
              <NavLink
                className={`tab tab-${tab.name}`}
                key={tab.location}
                replace
                to={tab.location}
              >
                { capitalizeAll(tab.name, "-") }
              </NavLink>
            ))}
          </div>
          <Switch location={location}>
            {tabs.map(tab => (
              <Route
                component={tab.component}
                exact
                key={location}
                path={tab.location}
              />
            ))}
          </Switch>
        </div>
      </Main>
    </>
  )
}

export default _
