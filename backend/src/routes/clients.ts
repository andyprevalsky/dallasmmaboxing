import { Router } from 'express';
import {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} from '../controllers/clientController';

const router = Router();

// GET /api/clients - Get all clients
router.get('/', getAllClients);

// GET /api/clients/:id - Get a specific client by ID
router.get('/:id', getClientById);

// POST /api/clients - Create a new client
router.post('/', createClient);

// PUT /api/clients/:id - Update a client
router.put('/:id', updateClient);

// DELETE /api/clients/:id - Delete a client
router.delete('/:id', deleteClient);

export default router;
