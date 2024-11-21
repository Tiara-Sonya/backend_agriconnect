const db = require("../config/database");

// GET all activities
exports.getAllActivities = (req, res) => {
  const sql = "SELECT * FROM activities";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    res.status(200).json(results);
  });
};

// CREATE a new activity
exports.createActivity = (req, res) => {
  const { user_id, action } = req.body;

  if (!user_id || !action) {
    return res.status(400).json({ message: "User ID and action are required" });
  }

  const sql = "INSERT INTO activities (user_id, action) VALUES (?, ?)";
  db.query(sql, [user_id, action], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    res.status(201).json({ message: "Activity created successfully", activity_id: result.insertId });
  });
};

// DELETE an activity
exports.deleteActivity = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM activities WHERE activity_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Activity not found" });
    res.status(200).json({ message: "Activity deleted successfully" });
  });
};
