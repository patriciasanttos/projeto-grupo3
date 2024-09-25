import { Router } from "express";
import multer from 'multer';

const storage = multer.memoryStorage();
const image = multer({ storage });

import AnimalsController from "./controllers/AnimalsController";
import AdoptionsController from "./controllers/AdoptionsController";
import SponsorshipsController from "./controllers/SponsorshipsController";
import VolunteersController from "./controllers/VolunteersController";
import AuthController from "./controllers/AuthController";

const router = Router();

//-----Animals routes
router
    .get('/animals', AnimalsController.getAll)
    .get('/animals/:id', AnimalsController.getById)
    .post('/animals', image.single('image'), AnimalsController.create)
    .put('/animals', image.single('image'), AnimalsController.update)
    .delete('/animals/:id', AnimalsController.delete);

//-----Adoptions routes
router
    .get('/adoptions', AdoptionsController.getAll)
    .get('/adoptions/:id', AdoptionsController.getById)
    .post('/adoptions', AdoptionsController.create)
    .put('/adoptions', AdoptionsController.update)
    .delete('/adoptions/:id', AdoptionsController.delete);
    
//-----Sponsorships routes
router
    .get('/sponsorships', SponsorshipsController.getAll)
    .get('/sponsorships/:id', SponsorshipsController.getById)
    .post('/sponsorships', SponsorshipsController.create)
    .put('/sponsorships', SponsorshipsController.update)
    .delete('/sponsorships/:id', SponsorshipsController.delete);

//-----Volunteers routes
router
    .get('/volunteers', VolunteersController.getAll)
    .get('/volunteers/:id', VolunteersController.getById)
    .post('/volunteers', image.single('image'), VolunteersController.create)
    .put('/volunteers', image.single('image'), VolunteersController.update)
    .delete('/volunteers/:id', VolunteersController.delete);


    //-----Admins routes
router
    .get('/admins', AuthController.getAll)
    .get('/admins/get/:id', AuthController.getById)
    .get('/admins/verify/:id', AuthController.verifyUser)
    .get('/admins/login', AuthController.login)
    .post('/admins', image.single('image'), AuthController.register)
    .put('/admins', image.single('image'), AuthController.update)
    .delete('/admins/:id', AuthController.delete);

export default router;