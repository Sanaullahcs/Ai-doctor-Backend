import mongoose from "mongoose";
import profileModel from "../models/profileModel.js";
import multer from "multer";
import fs from "fs";
import path from "path";

// get the user profile with the id of the user
const getCurrentProfileInfo = async (req, res) => {
  // const { id } = req.params;
  // const { id } = req.params;
  // console.log(id);
  const userId = req.user._id.toString(); // Convert ObjectId to string
  console.log(userId);

  try {
    const profile = await profileModel.findOne({ userId: userId });
    // .populate("userId");

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// update profile info on the base of userId
// const updateProfileInfo = async (req, res) => {
//   const userId = req.user._id.toString(); // Convert ObjectId to string
//   console.log(userId);
//   const profile = req.body;
//   try {
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(404).send(`No user with id: ${userId}`);
//     }

//     // Retrieve the old profile to get the previous image path
//     const oldProfile = await profileModel.findOne({ userId });
//     const oldImagePath = oldProfile.image || "";

//     let image = "";

//     // Check if an image was uploaded
//     if (req.file) {
//       image = req.file.path;
//     }

//     const updatedProfile = await profileModel.findOneAndUpdate(
//       { userId },
//       { ...profile, image: image },
//       { new: true }
//     );

//     // Remove the previous image file
//     if (oldImagePath && image !== "") {
//       fs.unlinkSync(oldImagePath);
//     }

//     res.status(200).json(updatedProfile);
//   } catch (error) {
//     res
//       .status(404)
//       .json({ message: "updateProfileInfo controller ---" + error.message });
//   }
// };
const updateProfileInfo = async (req, res) => {
  const userId = req.user._id.toString(); // Convert ObjectId to string
  console.log(userId);
  const profile = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).send(`No user with id: ${userId}`);
    }

    // Retrieve the old profile to get the previous image path
    const oldProfile = await profileModel.findOne({ userId });
    const oldImagePath = oldProfile.image || "";

    let image = oldImagePath; // Default to old image path

    // // Check if an image was uploaded
    // if (req.file) {
    //   image = req.file.path;
    //   // Remove the previous image file
    //   if (oldImagePath) {
    //     fs.unlinkSync(oldImagePath);
    //   }
    // }
    if (req.file) {
      image = req.file.path;
      // Remove the previous image file
      if (oldImagePath && fs.existsSync(path.resolve(oldImagePath))) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const updatedProfile = await profileModel.findOneAndUpdate(
      { userId },
      { ...profile, image: image },
      { new: true }
    );

    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(404).json({
      message:
        "catch error in updateProfileInfo controller -->" + error.message,
    });
  }
};

export { getCurrentProfileInfo, updateProfileInfo };
