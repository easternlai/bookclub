const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require("../../middleware/auth");
const Book = require("../../models/Book");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

router.post("/", auth, async (req, res)=> {
    try {
        const user = await User.findById(req.user.id).select('-password');

        console.log(req);

        const newBook = new Book({
            title: req.body.title,
            author: req.body.author,
            name: user.name,
            user: req.user.id
        });

        const book = await newBook.save();
        res.json(book);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get("/", auth, async (req, res)=> {
    try {
        console.log("test");
        const books = await Book.find().sort({ date: -1 });
        res.json(books);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

router.get('/:id', auth, async (req, res) => {
    try {
        const books = await Book.findById(req.params.id);
        if(!books){
            return res.status(400).json({msg: 'No books found'});
        }
        res.json(books);
    } catch (err) {
        console.error(err.message);
        if(err.kind==="ObjectId"){
            return res.status(404).json({ msg: 'Books not found'});
        }
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', auth, async (req, res)=>{
try {
    const book = await Book.findById(req.params.id);

    if(!book){
        return res.status(404).json({msg: "No book found"});
    }

    if(book.user.toString() !== req.user.id){
        return res.status(401).json({msg: "User not authorized"});
    }

    await book.remove();
    res.json(book);
} catch (err) {
    console.error(err.message);
    if(err.kind==="ObjectId"){
        return res.status(404).json({ msg: 'Books not found'});
    }
    res.status(500).send('Server Error');
}
});

router.put('/like/:id', auth, async(req, res)=> {
    try {
        const book = await Book.findById(req.params.id);
        if(book.likes.filter(like => like.user.toString()===req.user.id).length >0){
            return res.status(400).json({msg: 'Post already liked.'});
        }

        book.likes.unshift({ user: req.user.id });

        await book.save();

        res.json(book.likes);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book.likes.filter(like=> like.user.toString()===req.user.id).length ===0){
            return res.status(400).json({msg: "Post not liked."});
        }

        book.likes = book.likes.filter(({user})=> user.toString() !== req.user.id);

        await book.save();

        res.json(book.likes);
        
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post(
    "/comment/:id",
    [auth, [check("text", "Text is required").not().isEmpty()]],
    async (req, res) => {
        const errors = validationResult(req);
  
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() });
        }
  
        try {
            const user = await User.findById(req.user.id).select('-password');
            const book = await Book.findById(req.params.id);
  
          const newComment = {
              name: user.name,
              user: req.user.id,
              text: req.body.text
          };

          book.comments.unshift(newComment);
          await book.save();
          res.json(book.comments);
  
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
  );

  router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    
    try {
        const book = await Book.findById(req.params.id);

        const comment = book.comments.find(comment => comment.id === req.params.comment_id);

        if(!comment){
            return res.status(404).json({msg: 'Comment does not exist'});
        }

        if(!comment.user.toString() === req.user.id){
            return res.status(401).json({msg: 'User not authorized'});
        }

        book.comments = book.comments.filter(({ id }) => id !== req.params.comment_id);


        await book.save();
        
        res.json('Comment Deleted');
    } catch (err) {
        console.error(err.message);
            res.status(500).send('Server Error');
    }
  });

module.exports = router;



