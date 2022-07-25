import Auth from './auth'
import expenceAdd from './expence'
import getData from './getData'

export default {
  ...Auth,
  ...expenceAdd,
  ...getData,
}
