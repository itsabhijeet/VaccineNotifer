import { getSlots, getSlotsByDistrict } from '../controller/apiController'
import { addNewUser, getUsers } from '../controller/dbController'

const routes = (app) => {
    app.route('/slots/:date/:pin')
        .get((req,res) => getSlots(req, res))
    
    app.route('/slotsByDistrict/:districtCode')
        .get((req,res) => getSlotsByDistrict(req,res))

    app.route('/add')
        .post((req,res) => addNewUser(req, res))
    
    app.route('/users')
        .get((req,res) =>  getUsers(req, res))
}


export default routes;