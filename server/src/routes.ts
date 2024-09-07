import { Router } from "express";
import AnimalsController from "./controllers/AnimalsController";
import AdoptionsController from "./controllers/AdoptionsController";
import SponsorshipsController from "./controllers/SponsorshipsController";
import VolunteersController from "./controllers/VolunteersController";

const router = Router();

//-----Animals routes
router
    .get('/animals', AnimalsController.getAll)
    .get('/animals/:id', AnimalsController.getById)
    .post('/animals', AnimalsController.create)
    .put('/animals', AnimalsController.update)
    .delete('/animals/:id', AnimalsController.delete)

//-----Adoptions routes
router
    .get('/adoptions', AdoptionsController.getAll)
    .get('/adoptions/:id', AdoptionsController.getById)
    .post('/adoptions', AdoptionsController.create)
    .put('/adoptions', AdoptionsController.update)
    .delete('/adoptions/:id', AdoptionsController.delete)
    
//-----Sponsorships routes
router
    .get('/sponsorships', SponsorshipsController.getAll)
    .get('/sponsorships/:id', SponsorshipsController.getById)
    .post('/sponsorships', SponsorshipsController.create)
    .put('/sponsorships', SponsorshipsController.update)
    .delete('/sponsorships/:id', SponsorshipsController.delete)

//-----Volunteers routes
router
    .get('/volunteers', VolunteersController.getAll)
    .get('/volunteers/:id', VolunteersController.getById)
    .post('/volunteers', VolunteersController.create)
    .put('/volunteers', VolunteersController.update)
    .delete('/volunteers/:id', VolunteersController.delete)


export default router;