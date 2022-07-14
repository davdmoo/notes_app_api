const { getDatabase } = require("../config/mongoConnection");
const { ObjectId } = require("mongodb");

class Note {
  static async getNotes(req, res, next) {
    try {
      const db = getDatabase();
      console.log(req.query);

      const notes = await db.collection("notes").find().toArray();

      if (notes == null) {
        res.status(404).json({ message: "Not found" })

        return null;
      };

      res.status(200).json(notes);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getNoteById(req, res, next) {
    try {
      const { id } = req.params;
      const db = getDatabase();
      const note = await db.collection("notes").findOne({ _id: ObjectId(id) });
      
      if (note == null) {
        res.status(404).json({ message: `Note ${id} is not found`});
  
        return null;
      }
      
      res.status(200).json(note);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
  
  static async createNote(req, res, next) {
    try {
      const { title, content } = req.body;

      if (content == undefined && title == undefined) {
        res.status(400).json({ message: "Title and content are needed" });

        return null;
      } else if (content == undefined) {
        res.status(400).json({ message: "Content is needed" });

        return null;
      } else if (title == undefined) {
        res.status(400).json({ message: "Title is needed" });
      }

      const db = getDatabase();

      const response = await db.collection("notes").insertOne({ title, content });

      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  static async updateNote(req, res, next) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;

      if (content == undefined && title == undefined) {
        res.status(400).json({ message: "Title and content are needed" });

        return null;
      } else if (content == undefined) {
        res.status(400).json({ message: "Content is needed" });

        return null;
      } else if (title == undefined) {
        res.status(400).json({ message: "Title is needed" });
      }

      const db = getDatabase();

      const query = { _id: ObjectId(id) };
      const update = {
        $set: { title, content },
      };
      const response = await db.collection("notes").updateOne(query, update);

      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  static async deleteNote(req, res, next) {
    try {
      const { id } = req.params;
      const db = getDatabase();

      const query = { _id: ObjectId(id) };
      const note = await db.collection("notes").findOne(query);
      
      if (note == null || note == undefined) {
        res.status(404).json({ message: `Note ${id} is not found`});

        return null;
      }

      await db.collection("notes").deleteOne(query, (err, result) => {
        if (err) {
          res.status(400).json({ message: `Error deleting note ${id}` });

          return null;
        }
      });

      res.status(200).json({ message: `Note ${id} succesfully deleted` });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}

module.exports = Note;
