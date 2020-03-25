const {Router} = require('express')
const routes = Router();

const IncidentController = require('./controllers/IncidentController')

const OngController = require('./controllers/OngsController')

const ProfileController = require('./controllers/ProfileController');

const SessionController = require('./controllers/SessionController');

routes.get('/ongs',OngController.index)

routes.post('/ongs', OngController.create)



//incidents 
routes.get('/incidents', IncidentController.index)

routes.post('/incidents', IncidentController.create)
routes.delete('/incidents/:id', IncidentController.delete)

routes.get('/profile', ProfileController.index);

//login

routes.post('/session', SessionController.create)



module.exports = routes