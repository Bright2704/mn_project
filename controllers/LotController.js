const Lot = require('../models/Lot');

// Get all lots
exports.getAllLots = async (req, res) => {
  try {
    const lots = await Lot.find();
    res.status(200).json(lots);
  } catch (err) {
    console.error('Error fetching lots:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get the latest lot
exports.getLatestLot = async (req, res) => {
  try {
    const latestLot = await Lot.findOne().sort({ lot_id: -1 });
    res.json(latestLot || { lot_id: 'LOT-00000' });
  } catch (err) {
    console.error('Error fetching latest lot:', err);
    res.status(500).json({ error: err.message });
  }
};

// Create new lot
exports.createLot = async (req, res) => {
  const { lot_id, lot_type } = req.body;

  try {
    // Validate required fields
    if (!lot_id || !lot_type) {
      return res.status(400).json({ error: 'lot_id and lot_type are required' });
    }

    const newLot = new Lot({
      lot_id,
      lot_type,
      in_cn: '',
      out_cn: '',
      in_th: '',
      num_item: '0',
      note: ''
    });

    const savedLot = await newLot.save();
    res.status(201).json(savedLot);
  } catch (err) {
    console.error('Error creating lot:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get lot by ID
exports.getLotById = async (req, res) => {
  try {
    const lot = await Lot.findOne({ lot_id: req.params.lotId });
    if (!lot) {
      return res.status(404).json({ error: 'Lot not found' });
    }
    res.json(lot);
  } catch (err) {
    console.error('Error fetching lot:', err);
    res.status(500).json({ error: err.message });
  }
};

// Update lot
exports.updateLot = async (req, res) => {
  const { lotId } = req.params;
  const updateData = { ...req.body };

  try {
    // Handle file paths if files were uploaded
    if (req.files) {
      if (req.files['lotFile'] && req.files['lotFile'][0]) {
        updateData.file_path = `/storage/lot/lot_file/${req.files['lotFile'][0].filename}`;
      }
      if (req.files['lotImage'] && req.files['lotImage'][0]) {
        updateData.image_path = `/storage/lot/lot_image/${req.files['lotImage'][0].filename}`;
      }
    }

    const updatedLot = await Lot.findOneAndUpdate(
      { lot_id: lotId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedLot) {
      return res.status(404).json({ error: 'Lot not found' });
    }
    res.json(updatedLot);
  } catch (err) {
    console.error('Error updating lot:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get lot attachments
exports.getLotAttachments = async (req, res) => {
  try {
    const lot = await Lot.findOne({ lot_id: req.params.lotId });
    if (!lot) {
      return res.status(404).json({ error: 'Lot not found' });
    }
    res.json({
      file_path: lot.file_path || null,
      image_path: lot.image_path || null
    });
  } catch (err) {
    console.error('Error fetching lot attachments:', err);
    res.status(500).json({ error: err.message });
  }
};

// Delete lot
exports.deleteLot = async (req, res) => {
  try {
    const lot = await Lot.findOneAndDelete({ lot_id: req.params.lotId });
    if (!lot) {
      return res.status(404).json({ error: 'Lot not found' });
    }
    res.json({ message: 'Lot deleted successfully' });
  } catch (err) {
    console.error('Error deleting lot:', err);
    res.status(500).json({ error: err.message });
  }
};