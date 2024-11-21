const db = require("../config/database");

// GET all articles
exports.getAllArticles = (req, res) => {
  const sql = "SELECT * FROM articles";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    res.status(200).json(results);
  });
};

// GET article by ID
exports.getArticleById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM articles WHERE article_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    if (result.length === 0) return res.status(404).json({ message: "Article not found" });
    res.status(200).json(result[0]);
  });
};

// CREATE a new article
exports.createArticle = (req, res) => {
  const { title, description, author_id, status } = req.body;

  if (!title || !description || !author_id) {
    return res.status(400).json({ message: "Title, description, and author_id are required" });
  }

  const sql = "INSERT INTO articles (title, description, author_id, status) VALUES (?, ?, ?, ?)";
  db.query(sql, [title, description, author_id, status], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    res.status(201).json({ message: "Article created successfully", article_id: result.insertId });
  });
};

// DELETE an article
exports.deleteArticle = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM articles WHERE article_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Article not found" });
    res.status(200).json({ message: "Article deleted successfully" });
  });
};
