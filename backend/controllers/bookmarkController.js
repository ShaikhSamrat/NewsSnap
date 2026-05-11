import Bookmark from '../models/Bookmark.js';

// Get all bookmarks
export const getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find().sort({ createdAt: -1 });
    res.json(bookmarks);
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    res.status(500).json({ error: 'Failed to fetch bookmarks' });
  }
};

// Save a bookmark
export const saveBookmark = async (req, res) => {
  try {
    const { title, description, url, image, source, publishedAt } = req.body;

    // Check if already bookmarked
    const existing = await Bookmark.findOne({ url });
    if (existing) {
      return res.status(400).json({ error: 'Already bookmarked' });
    }

    const bookmark = new Bookmark({
      title,
      description,
      url,
      image,
      source,
      publishedAt
    });

    await bookmark.save();
    res.status(201).json(bookmark);
  } catch (error) {
    console.error('Error saving bookmark:', error);
    res.status(500).json({ error: 'Failed to save bookmark' });
  }
};

// Delete a bookmark
export const deleteBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    await Bookmark.findByIdAndDelete(id);
    res.json({ message: 'Bookmark removed' });
  } catch (error) {
    console.error('Error deleting bookmark:', error);
    res.status(500).json({ error: 'Failed to delete bookmark' });
  }
};