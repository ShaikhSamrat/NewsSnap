import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  image: String,
  source: {
    name: String
  },
  publishedAt: String,
}, { timestamps: true });

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
export default Bookmark;