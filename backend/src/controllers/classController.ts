import { Request, Response } from 'express';
import { ClassModel } from '../models/Class';

export const getAllClasses = async (_req: Request, res: Response): Promise<void> => {
  try {
    const classes = await ClassModel.findAll();
    res.json({
      success: true,
      data: classes,
    });
  } catch (error) {
    console.error('Error fetching classes:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch classes',
    });
  }
};

export const getClassById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const classData = await ClassModel.findById(id);

    if (!classData) {
      res.status(404).json({
        success: false,
        error: 'Class not found',
      });
      return;
    }

    res.json({
      success: true,
      data: classData,
    });
  } catch (error) {
    console.error('Error fetching class:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch class',
    });
  }
};

export const createClass = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, schedule, price } = req.body;

    if (!name || !description || !schedule || !price) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields: name, description, schedule, price',
      });
      return;
    }

    const newClass = await ClassModel.create({
      name,
      description,
      schedule,
      price,
    });

    res.status(201).json({
      success: true,
      data: newClass,
    });
  } catch (error) {
    console.error('Error creating class:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create class',
    });
  }
};

export const updateClass = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const updateData = req.body;

    const updatedClass = await ClassModel.update(id, updateData);

    if (!updatedClass) {
      res.status(404).json({
        success: false,
        error: 'Class not found',
      });
      return;
    }

    res.json({
      success: true,
      data: updatedClass,
    });
  } catch (error) {
    console.error('Error updating class:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update class',
    });
  }
};

export const deleteClass = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await ClassModel.delete(id);

    if (!deleted) {
      res.status(404).json({
        success: false,
        error: 'Class not found',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Class deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting class:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete class',
    });
  }
};
