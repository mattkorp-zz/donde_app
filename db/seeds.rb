User.destroy_all
Friendship.destroy_all
# lol

u1 = User.new({
  username: "matt",
  email: "matt@korp.com",
  password: "matt",
  password_confirmation: "matt"
})
u1.latitude = 50
u1.longitude = 50
u1.active = true

u2 = User.new({
  username: "jon",
  email: "jon@korp.com",
  password: "jon",
  password_confirmation: "jon"
})
u2.latitude = 50.00002
u2.longitude = 50.01
u2.active = true

u3 = User.new({
  username: "phil",
  email: "phil@korp.com",
  password: "phil",
  password_confirmation: "phil"
})
u3.latitude = 50.10002
u3.longitude = 50.011
u3.active = true

u4 = User.new({
  username: "katt",
  email: "katt@korp.com",
  password: "katt",
  password_confirmation: "katt"
})
u4.latitude = 50.0102
u4.longitude = 50.011
u4.active = true

u5 = User.new({
  username: "zatt",
  email: "zatt@korp.com",
  password: "zatt",
  password_confirmation: "zatt"
})
u5.latitude = 50
u5.longitude = 50
u5.active = true


u3.friends << u4 << u1
u2.friends << u4 << u1 << u3 << u5
u5.friends << u2 << u1

u4.friends << u2
u1.friends << u3 << u2 << u4 << u5

u1.save
u2.save
u3.save
u4.save
u5.save

