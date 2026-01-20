import { Router } from 'express';
import {
  getAllForms,
  getFormById,
  getFormByClientId,
  createForm,
  updateForm,
  deleteForm,
} from '../controllers/formController';

const router = Router();

// GET /api/forms - Get all release forms
router.get('/', getAllForms);

// GET /api/forms/:id - Get a specific release form by ID
router.get('/:id', getFormById);

// GET /api/forms/client/:clientId - Get release form for a specific client
router.get('/client/:clientId', getFormByClientId);

// POST /api/forms - Create a new release form
router.post('/', createForm);

// PUT /api/forms/:id - Update a release form
router.put('/:id', updateForm);

// DELETE /api/forms/:id - Delete a release form
router.delete('/:id', deleteForm);

export default router;
