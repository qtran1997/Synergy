import express from "express";
import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { dbKey } from "../../config/keys";
import passport from "passport";

// HTTP Status Codes
import statusCodes from "../../constants/statusCodes";

// Friends Enum
import friendStatus from "../../constants/friendStatus";

// Load User schema
import Friend from "../../models/Friend";
import User from "../../models/User";

import ObjectId from "../../util/toObjectId";

const router = express.Router();

// TODO: ADD NOTIFICATIONS TO THE OTHER USER ABOUT STATUS

/**
 * @operation GET
 * @route     api/friends/tests
 * @desc      Test friends route
 */
router.get("/test", (_req, res) => res.json({ msg: "Friends API Works" }));

/**
 * @operation POST
 * @route     api/friends/send
 * @desc      Send friend request
 */
router.post(
  "/send",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Create 2 documents - one for the requester and one for the recipient in order to display 2 different statuses
    const currentUser = req.user.id;
    const recipientUser = req.body.id;

    let currentUserDocId;
    let recipientUserDocId;

    Friend.findOneAndUpdate(
      { requester: currentUser, recipient: recipientUser },
      { $set: { status: friendStatus.Requested } },
      { upsert: true, new: true }
    )
      .then(currentUserDoc => (currentUserDocId = currentUserDoc))
      .catch(err =>
        res.status(statusCodes.BADREQUEST).json({ err: "An error has occured" })
      );

    Friend.findOneAndUpdate(
      { requester: recipientUser, recipient: currentUser },
      { $set: { status: friendStatus.Pending } },
      { upsert: true, new: true }
    )
      .then(recipientUserDoc => (recipientUserDocId = recipientUserDoc))
      .catch(err =>
        res.status(statusCodes.BADREQUEST).json({ err: "An error has occured" })
      );

    User.findOneAndUpdate(
      { _id: currentUser },
      { $push: { friends: ObjectId(currentUserDocId) } }
    ).catch(err =>
      res.status(statusCodes.BADREQUEST).json({ err: "An error has occured" })
    );

    User.findOneAndUpdate(
      { _id: recipientUser },
      { $push: { friends: ObjectId(recipientUserDocId) } }
    ).catch(err =>
      res.status(statusCodes.BADREQUEST).json({ err: "An error has occured" })
    );

    res.json("You have sent a friend request to this user");
  }
);

/**
 * @operation POST
 * @route     api/friends/remove
 * @desc      Remove friend from list
 */
router.post(
  "/remove",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const currentUser = req.user.id;
    const recipientUser = req.body.id;

    Friend.findOneAndUpdate(
      { requester: currentUser, recipient: recipientUser },
      { $set: { status: friendStatus.AddFriend } }
    )
      .then(currentUserDoc => (currentUserDocId = currentUserDoc))
      .catch(err =>
        res.status(statusCodes.BADREQUEST).json({ err: "An error has occured" })
      );
    Friend.findOneAndUpdate(
      { requester: recipientUser, recipient: currentUser },
      { $set: { status: friendStatus.AddFriend } }
    )
      .then(recipientUserDoc => (recipientUserDocId = recipientUserDoc))
      .catch(err =>
        res.status(statusCodes.BADREQUEST).json({ err: "An error has occured" })
      );

    res.json({
      success: "You have removed this person from your friend's list"
    });
  }
);

/**
 * @operation POST
 * @route     api/friends/accept
 * @desc      Accept friend request
 */
router.post(
  "/accept",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const currentUser = req.user.id;
    const recipientUser = req.body.id;

    let currentUserDocId;
    let recipientUserDocId;

    Friend.findOneAndUpdate(
      { requester: currentUser, recipient: recipientUser },
      { $set: { status: friendStatus.Friends } }
    ).catch(err =>
      res.status(statusCodes.BADREQUEST).json({ err: "An error has occured" })
    );
    Friend.findOneAndUpdate(
      { requester: recipientUser, recipient: currentUser },
      { $set: { status: friendStatus.Friends } }
    ).catch(err =>
      res.status(statusCodes.BADREQUEST).json({ err: "An error has occured" })
    );

    User.findOneAndUpdate(
      { _id: currentUser },
      { $push: { friends: currentUserDocId } }
    ).catch(err =>
      res.status(statusCodes.BADREQUEST).json({ err: "An error has occured" })
    );
    User.findOneAndUpdate(
      { _id: recipientUser },
      { $push: { friends: recipientUserDocId } }
    ).catch(err =>
      res.status(statusCodes.BADREQUEST).json({ err: "An error has occured" })
    );

    res.json({ success: "You have accepted this person's friend request" });
  }
);

/**
 * @operation POST
 * @route     api/friends/deny
 * @desc      Deny friend request
 */
router.post(
  "/deny",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const currentUser = req.user.id;
    const recipientUser = req.body.id;

    let currentUserDocId;
    let recipientUserDocId;

    Friend.findOneAndUpdate(
      { requester: currentUser, recipient: recipientUser },
      { $set: { status: friendStatus.AddFriend } }
    ).catch(err =>
      res.status(statusCodes.BADREQUEST).json({ err: "An error has occured" })
    );
    Friend.findOneAndUpdate(
      { requester: recipientUser, recipient: currentUser },
      { $set: { status: friendStatus.AddFriend } }
    ).catch(err =>
      res.status(statusCodes.BADREQUEST).json({ err: "An error has occured" })
    );

    User.findOneAndUpdate(
      { _id: currentUser },
      { $push: { friends: currentUserDocId } }
    ).catch(err =>
      res.status(statusCodes.BADREQUEST).json({ err: "An error has occured" })
    );
    User.findOneAndUpdate(
      { _id: recipientUser },
      { $push: { friends: recipientUserDocId } }
    ).catch(err =>
      res.status(statusCodes.BADREQUEST).json({ err: "An error has occured" })
    );

    res.json({ success: "You have denied this person's friend request" });
  }
);

/**
 * @operation GET
 * @route     api/friends/:userId
 * @desc      Return whether the user is friends with this user
 */
router.get(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.params.userId)
      .then(user => {
        Friend.findOne({
          requester: req.user.id,
          recipient: req.params.userId
        })
          .then(friend => {
            switch (friend.status) {
              case 0: {
                res.json({ success: "You are not connected with this user" });
              }
              case 1: {
                res.json({
                  success: "You have sent a friend request to this user"
                });
              }
              case 2: {
                res.json({
                  success: "This user has sent you a friend request"
                });
              }
              case 3: {
                res.json({ success: "You are friends with this user" });
              }
            }
          })
          .catch(err =>
            res
              .status(statusCodes.NOTFOUND)
              .json({ err: "You are not connected with this user" })
          );
      })
      .catch(err =>
        res.status(statusCodes.NOTFOUND).json({ err: "User not found" })
      );
  }
);

export default router;
