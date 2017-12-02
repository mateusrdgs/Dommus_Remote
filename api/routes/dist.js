const express = require('express'),
      path = require('path'),
      router = express.Router();

router.use('/', express.static('dist', { redirect: false }));
router.get('*', (req, res) => {
  res.sendFile(path.resolve('dist/index.html'));
});

module.exports = router;