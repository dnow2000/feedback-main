import React from 'react'

import CheckboxField from 'components/layout/form/fields/CheckboxField'
import { APP_NAME } from 'utils/config'


export default () => (
  <>
    <CheckboxField
      id="community-rules"
      name="communityRules"
      required
      text="I agree to comply to community rules."
    />
    <CheckboxField
      id="terms-and-conditions"
      name="termsAndConditions"
      required
      text={`I hereby accept Terms and Conditions relatives to ${APP_NAME}.`}
    />
  </>
)
