module.exports = {
  normalizeUrl: function(name) {
    return function normalizeUrl(req, res, next) {
        req.url = req.url.replace(/(\/|\.html)$/i, '');
        next();
    }
  }
}
