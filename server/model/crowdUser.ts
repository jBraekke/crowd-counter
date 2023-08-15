import mongoose, { Schema } from "mongoose";
import { UserStatusEnum } from "../enum/user-status";

const userSchema = new Schema({
  userId: { type: String, unique: true },
  status: {
    type: Number,
    enum: [
      UserStatusEnum.Unknown,
      UserStatusEnum.Cool,
      UserStatusEnum.Eger,
      UserStatusEnum.Idle,
    ],
    default: UserStatusEnum.Unknown,
  },
  created: { type: Date, default: Date.now },
  ended: { type: Date, default: undefined },
});

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const user = mongoose.model("crowdUser", userSchema);

export async function createUser() {
  const item = new user();
  item.userId = uuid();
  item.status = UserStatusEnum.Idle;
  item.ended = null;
  await item.save();

  return { userID: item.userId, status: item.status };
}

export async function updateUser(userId: string, status: UserStatusEnum) {
  const item = await user.findOne({ userId: { $eq: userId } });
  item.status = status;
  await item.save();

  return { userID: item.userId, status: item.status };
}

export async function findAllUsers() {
  const allUsers = await user.find({});

  return allUsers.map(x => ({userID: x.userId, status: x.status}));
}