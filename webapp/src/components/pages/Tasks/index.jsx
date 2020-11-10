import React from 'react'

import Header from 'components/layout/Header'
import Main from 'components/layout/Main'


export default () => {
  return (
    <>
      <Header withLinks />
      <Main className="tasks">
        <div className="container">
          <section>
            OK
          </section>
        </div>
      </Main>
    </>
  )
}
