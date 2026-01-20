import { Request, Response } from 'express';
import { ReleaseFormModel } from '../models/ReleaseForm';

export const getAllForms = async (_req: Request, res: Response): Promise<void> => {
  try {
    const forms = await ReleaseFormModel.findAll();
    res.json({
      success: true,
      data: forms,
    });
  } catch (error) {
    console.error('Error fetching release forms:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch release forms',
    });
  }
};

export const getFormById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const form = await ReleaseFormModel.findById(id);

    if (!form) {
      res.status(404).json({
        success: false,
        error: 'Release form not found',
      });
      return;
    }

    res.json({
      success: true,
      data: form,
    });
  } catch (error) {
    console.error('Error fetching release form:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch release form',
    });
  }
};

export const getFormByClientId = async (req: Request, res: Response): Promise<void> => {
  try {
    const clientId = parseInt(req.params.clientId);
    const form = await ReleaseFormModel.findByClientId(clientId);

    if (!form) {
      res.status(404).json({
        success: false,
        error: 'Release form not found for this client',
      });
      return;
    }

    res.json({
      success: true,
      data: form,
    });
  } catch (error) {
    console.error('Error fetching client release form:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch client release form',
    });
  }
};

export const createForm = async (req: Request, res: Response): Promise<void> => {
  try {
    const { client_id, signed_pdf_url, signed_date, is_signed } = req.body;

    if (!client_id || is_signed === undefined) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields: client_id, is_signed',
      });
      return;
    }

    const newForm = await ReleaseFormModel.create({
      client_id,
      signed_pdf_url,
      signed_date: signed_date ? new Date(signed_date) : undefined,
      is_signed,
    });

    res.status(201).json({
      success: true,
      data: newForm,
    });
  } catch (error) {
    console.error('Error creating release form:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create release form',
    });
  }
};

export const updateForm = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const updateData = req.body;

    if (updateData.signed_date) {
      updateData.signed_date = new Date(updateData.signed_date);
    }

    const updatedForm = await ReleaseFormModel.update(id, updateData);

    if (!updatedForm) {
      res.status(404).json({
        success: false,
        error: 'Release form not found',
      });
      return;
    }

    res.json({
      success: true,
      data: updatedForm,
    });
  } catch (error) {
    console.error('Error updating release form:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update release form',
    });
  }
};

export const deleteForm = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await ReleaseFormModel.delete(id);

    if (!deleted) {
      res.status(404).json({
        success: false,
        error: 'Release form not found',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Release form deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting release form:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete release form',
    });
  }
};
