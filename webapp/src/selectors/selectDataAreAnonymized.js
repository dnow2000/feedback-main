import selectHasCurrentRoleByType from './selectHasCurrentRoleByType'


export default state => !selectHasCurrentRoleByType(state, 'INSPECTOR')
