import { Request, Response } from 'express';
import { ClientModel } from '../models/Client';

export const getAllClients = async (_req: Request, res: Response): Promise<void> => {
  try {
    const clients = await ClientModel.findAll();
    res.json({
      success: true,
      data: clients,
    });
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch clients',
    });
  }
};

export const getClientById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const client = await ClientModel.findById(id);

    if (!client) {
      res.status(404).json({
        success: false,
        error: 'Client not found',
      });
      return;
    }

    res.json({
      success: true,
      data: client,
    });
  } catch (error) {
    console.error('Error fetching client:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch client',
    });
  }
};

export const createClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, address } = req.body;

    if (!name || !email || !phone) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, phone',
      });
      return;
    }

    // Check if email already exists
    const existingClient = await ClientModel.findByEmail(email);
    if (existingClient) {
      res.status(409).json({
        success: false,
        error: 'Client with this email already exists',
      });
      return;
    }

    const newClient = await ClientModel.create({
      name,
      email,
      phone,
      address,
    });

    res.status(201).json({
      success: true,
      data: newClient,
    });
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create client',
    });
  }
};

export const updateClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const updateData = req.body;

    const updatedClient = await ClientModel.update(id, updateData);

    if (!updatedClient) {
      res.status(404).json({
        success: false,
        error: 'Client not found',
      });
      return;
    }

    res.json({
      success: true,
      data: updatedClient,
    });
  } catch (error) {
    console.error('Error updating client:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update client',
    });
  }
};

export const deleteClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await ClientModel.delete(id);

    if (!deleted) {
      res.status(404).json({
        success: false,
        error: 'Client not found',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Client deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting client:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete client',
    });
  }
};
