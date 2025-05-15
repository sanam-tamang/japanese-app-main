const Application = require('../models/Application');

// Student applies to institute
exports.applyToInstitute = async (req, res) => {
  const { instituteId, universityName, course, documents } = req.body;

  const app = await Application.create({
    studentId: req.user.id,
    instituteId,
    universityName,
    course,
    documentProgress: documents.map(title => ({ title }))
  });

  res.status(201).json(app);
};

// Student views their applications
exports.getMyApplications = async (req, res) => {
  const apps = await Application.find({ studentId: req.user.id }).populate('instituteId');
  res.json(apps);
};

// Institute views applications assigned to them
exports.getInstituteApplications = async (req, res) => {
  const apps = await Application.find({ instituteId: req.user.id }).populate('studentId');
  res.json(apps);
};

// Institute updates a document's progress
exports.updateDocumentStatus = async (req, res) => {
  const { appId, title, isSubmitted, remarks } = req.body;

  const app = await Application.findById(appId);
  if (!app) return res.status(404).json({ error: 'Application not found' });

  const doc = app.documentProgress.find(d => d.title === title);
  if (doc) {
    doc.isSubmitted = isSubmitted;
    doc.remarks = remarks || doc.remarks;
    doc.submittedAt = isSubmitted ? new Date() : null;
    await app.save();
    res.json({ message: 'Document updated', doc });
  } else {
    res.status(400).json({ error: 'Document title not found' });
  }
};