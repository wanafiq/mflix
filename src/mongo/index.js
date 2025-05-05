import { MongoClient, ServerApiVersion } from "mongodb";

const uri =
  "mongodb+srv://feed:QVhJvTJebL9gwy6z@feed-cluster.ueynt4l.mongodb.net/?retryWrites=true&w=majority&appName=feed-cluster";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function setupDatabase() {
  try {
    await client.connect();

    const db = client.db("sample_mflix");

    return {
      client,
      db,
      users: db.collection("users"),
      sessions: db.collection("sessions"),
      movies: db.collection("movies"),
      embeddedMovies: db.collection("embedded_movies"),
      comments: db.collection("comments"),
      theaters: db.collection("theaters"),
    };
  } catch (err) {
    console.log("error connecting database");
    return {};
  }
}
