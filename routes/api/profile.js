const express = require("express");
const axios = require("axios");
const config = require("config");
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require("express-validator/check");
const normalize = require("normalize-url");
// const checkObjectId = require('../../middleware/checkObjectId');

const Profile = require("../../models/Profile");
const User = require('../../models/User');
const Book = require('../../models/Book');

router.get('/me',auth, async(req, res) => {


    try {
        const profile = await Profile.findOne({
            user: req.user.id
        }).populate('user', ['name']);

        if (!profile){
            return res.status(400).json({msg: 'There is no profile for this user.'});
        };
        res.json(profile);

    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

router.post(
  "/",
  [
    auth,
    [
      check("favoriteGenre", "This Field is required.").not().isEmpty(),
      check("location", "This field is required.").not().isEmpty()
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

 
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      location,
      education,
      language,
      bio,
      favoriteGenre,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram,
    } = req.body;

    const profileFields = {
      user: req.user.id,
      location,
      education,
      language,
      bio,
      favoriteGenre: Array.isArray(favoriteGenre)
        ? favoriteGenre
        : favoriteGenre
            .split(",")
            .map((favoriteGenre) => " " + favoriteGenre.trim())
    };

    const socialFields = { youtube, twitter, facebook, linkedin, instagram };

    for (const [key, value] of Object.entries(socialFields)) {
      if (value && value.length > 0) {
        socialFields[key] = normalize(value, { forceHttps: true });
      }
    }

    profileFields.social = socialFields;

    try {
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true }
      );
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name']);
        res.json(profiles);
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get(
    '/user/:user_id',
    async (req, res) => {
      console.log(req.params.user_id);
        try {
            const profile = await Profile.findOne({
                user: req.params.user_id
            }).populate('user', ['name']);

            if (!profile) return res.status(400).json({msg: 'Profile not found'});
            return res.json(profile);
        } catch (err) {
            console.err(err.message);
            if (err.king == "ObjectId"){
                return res.status(400).json({ msg: "Profile not found."});
            }
            return res.status(500).json({ msg: 'Server error'});
        }
    }
);


module.exports = router;
