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
    .get('/adoptions/get', AdoptionsController.getAll)
    .get('/adoptions/get/:id', AdoptionsController.getById)
    .post('/adoptions', AdoptionsController.create)
    .put('/adoptions', AdoptionsController.update)
    .delete('/adoptions/:id', AdoptionsController.delete)

    .get('/adoptions/forms', AdoptionsController.getAllForms)
    .post('/adoptions/forms', AdoptionsController.createForm)
    .get('/adoptions/forms/accept/:id', AdoptionsController.acceptForm)
    .delete('/adoptions/forms/deny/:id', AdoptionsController.denyForm);
    
//-----Sponsorships routes
router
    .get('/sponsorships/get', SponsorshipsController.getAll)
    .get('/sponsorships/get/:id', SponsorshipsController.getById)
    .post('/sponsorships', SponsorshipsController.create)
    .put('/sponsorships', SponsorshipsController.update)
    .delete('/sponsorships/:id', SponsorshipsController.delete)

    .get('/sponsorships/forms', SponsorshipsController.getAllForms)
    .post('/sponsorships/forms', SponsorshipsController.createForm)
    .get('/sponsorships/forms/accept/:id', SponsorshipsController.acceptForm)
    .delete('/sponsorships/forms/deny/:id', SponsorshipsController.denyForm);

//-----Volunteers routes
router
    .get('/volunteers/get', VolunteersController.getAll)
    .get('/volunteers/get/:id', VolunteersController.getById)
    .post('/volunteers', image.single('image'), VolunteersController.create)
    .put('/volunteers', image.single('image'), VolunteersController.update)
    .delete('/volunteers/:id', VolunteersController.delete)

    .get('/volunteers/forms', VolunteersController.getAllForms)
    .post('/volunteers/forms', VolunteersController.createForm)
    .get('/volunteers/forms/accept/:id', VolunteersController.acceptForm)
    .delete('/volunteers/forms/deny/:id', VolunteersController.denyForm);

//-----Admins routes
router
    .get('/admins', AuthController.getAll)
    .get('/admins/get/:id', AuthController.getById)
    .get('/admins/verify/:id', AuthController.verifyUser)
    .get('/admins/login', AuthController.login)
    .post('/admins', AuthController.create)
    .put('/admins', AuthController.update)
    .delete('/admins/:id', AuthController.delete);

export default router;