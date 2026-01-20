import { Router } from 'express';
import {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
} from '../controllers/classController';

const router = Router();

// GET /api/classes - Get all classes
router.get('/', getAllClasses);

// GET /api/classes/:id - Get a specific class by ID
router.get('/:id', getClassById);

// POST /api/classes - Create a new class
router.post('/', createClass);

// PUT /api/classes/:id - Update a class
router.put('/:id', updateClass);

// DELETE /api/classes/:id - Delete a class
router.delete('/:id', deleteClass);

export default router;
