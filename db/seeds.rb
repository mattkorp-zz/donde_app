User.destroy_all
Friendship.destroy_all
# lol

u1 = User.new({
  username: "matt",
  email: "matt@korp.com",
  password: "matt",
  password_confirmation: "matt"
})
u1.save

u2 = User.new({
  username: "katt",
  email: "katt@korp.com",
  password: "katt",
  password_confirmation: "katt"
})
u2.save

u3 = User.new({
  username: "batt",
  email: "batt@korp.com",
  password: "batt",
  password_confirmation: "batt"
})
u3.save

u4 = User.new({
  username: "satt",
  email: "satt@korp.com",
  password: "satt",
  password_confirmation: "satt"
})
u4.save

u3.friends << u4
u2.friends << u4
u4.friends << u3 << u2

u2.save
u3.save
u4.save
