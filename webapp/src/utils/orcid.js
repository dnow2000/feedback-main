import createDecorator from 'final-form-calculate'
import { createSelector } from 'reselect'

import { API_URL } from './config'
import { isEmpty } from './form'


export const getOrcid = createSelector(
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
      return response.json()

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
      const orcid = await getOrcid(orcidId)
      if (!orcid) {
        return {}
      }
      return {...orcid, ...formValues }
    }
  }
)
