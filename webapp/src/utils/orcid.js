import createDecorator from 'final-form-calculate'
import { createSelector } from 'reselect'

import { API_URL } from './config'
import { isEmpty } from './form'


export const getRecord = createSelector(
  orcidId => orcidId,
  async orcidId => {

    if (!orcidId || isEmpty(orcidId)) {
      return {}
    }

    try {
      const orcidUrl = `${API_URL}/orcid/${orcidId}`
      const response = await fetch(orcidUrl)
      if (response.status === 400) {
        const body = await response.json()
        return {
          error: body.orcidId[0],
          values: null
        }
      }

      const body = await response.json()
      return { values: body }

    } catch (error) {

      return {
        error: 'Unable to check the ORCID id',
        values: null
      }
    }
  }
)


export const orcidDecorator = createDecorator(
  {
    field: 'orcidId',
    updates: async (orcidId, urlKey, formValues)  => {
      const record = await getRecord(orcidId)
      if (!record) {
        return {}
      }
      return Object.assign({}, record.values, formValues)
    }
  }
)
