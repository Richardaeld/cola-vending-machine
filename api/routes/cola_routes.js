const express = require('express');
const db = require('../models/cola_models');

const router = expresss.Router();

// ---------------------Cola
// Add Cola(s)
// All View Cola (with description)
// Restocker View All Cola (without description)
// View Single Cola
// Patch 'name' of Single Cola
// Patch 'amount' of Single Cola
// Patch 'max_amount' of Single Cola
// Patch 'price' of Single Cola
// Patch 'description' of Single Cola
// Put (update) entire Single Cola
