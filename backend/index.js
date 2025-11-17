// index.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// Correct path to your existing database
const dbPath = path.join(__dirname, 'pitches.db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error('Failed to open database:', err.message);
  } else {
    console.log('Database connected:', dbPath);
  }
});

app.get('/', (req, res) => {
  res.send('Hello, MLB backend!');
});

const allowedPitchers = [
  'Logan Webb', 'Carlos Rodón', 'Garrett Crochet', 'Zac Gallen',
  'Max Fried', 'Jake Irvin', 'MacKenzie Gore', 'Brad Lord',
  'Jose A. Ferrer', 'Matt Waldron'
];

// Get list of allowed pitchers
app.get('/api/pitchers', (req, res) => {
  const placeholders = allowedPitchers.map(() => '?').join(',');
  db.all(
    `SELECT player_id, name_use || ' ' || name_last AS full_name
     FROM players
     WHERE name_use || ' ' || name_last IN (${placeholders})`,
    allowedPitchers,
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// Get summary for a specific pitcher
app.get('/api/pitcher/:id/summary', (req, res) => {
  const pitcherId = req.params.id;

  const sql = `
    WITH pitcher_pitches AS (
      SELECT * FROM pitches WHERE pitcher_id = ?
    ), totals AS (
      SELECT COUNT(*) AS total_pitches FROM pitcher_pitches
    )
    SELECT
      COALESCE(pitch_type, pitch_type_abbrev) AS pitch_type,
      COUNT(*) AS pitch_count,
      ROUND((COUNT(*) * 1.0 / totals.total_pitches) * 100.0, 2) AS usage_pct,
      ROUND(AVG(release_speed), 2) AS avg_release_speed,
      ROUND(AVG(horizontal_break), 2) AS avg_horizontal_break,
      ROUND(AVG(induced_vertical_break), 2) AS avg_induced_vertical_break,
      ROUND(AVG(spin_rate), 2) AS avg_spin_rate,
      ROUND(AVG(hit_exit_speed), 2) AS avg_hit_exit_speed,
      ROUND(AVG(hit_launch_angle), 2) AS avg_hit_launch_angle
    FROM pitcher_pitches, totals
    GROUP BY COALESCE(pitch_type, pitch_type_abbrev)
    ORDER BY pitch_count DESC;
  `;

  db.all(sql, [pitcherId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
