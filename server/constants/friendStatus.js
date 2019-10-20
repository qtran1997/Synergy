const friendStatus = {
  AddFriend: 0, // OK best used for READ and UPDATE
  Requested: 1,
  Pending: 2, // NOCONTENT best used for DELETE Operations
  Friends: 3
};

export default friendStatus;
