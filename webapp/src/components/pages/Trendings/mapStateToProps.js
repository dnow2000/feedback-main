import { selectTrendings } from '../../../selectors'

function mapStateToProps(state) {
  return {
    trendings: selectTrendings(state)
  }
}

export default mapStateToProps
