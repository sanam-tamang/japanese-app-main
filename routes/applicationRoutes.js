const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  applyToInstitute,
  getMyApplications,
  getInstituteApplications,
  updateDocumentStatus
} = require('../controllers/applicationController');

// Student
router.post('/apply', auth, applyToInstitute);
router.get('/my', auth, getMyApplications);

// Institute
router.get('/institute-apps', auth, getInstituteApplications);
router.put('/update-doc', auth, updateDocumentStatus);

module.exports = router;
