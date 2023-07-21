const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const supertest = require("supertest");
const bcrypt = require("bcrypt");

const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("a specific blog is within the returned blogs", async () => {
  const response = await api.get("/api/blogs");
  const contents = response.body.map((r) => r.title);
  expect(contents).toContain("emmin blogi");
});

test("a valid blog can be added ", async () => {
  const newBlog = {
    title: "lillin blogi",
    author: "lilli gunnar",
    url: "lilli.gunnar@blogi.fi",
    likes: 100,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((b) => b.title);
  expect(titles).toContain("lillin blogi");
});

test('id field name is "id"', async () => {
  const response = await api.get("/api/blogs");
  response.body.forEach((obj) => {
    console.log(obj.id);
    expect(obj.id).toBeDefined();
  });
});

test("number of likes is zero", async () => {
  const newBlog = {
    title: "sannan blogi",
    author: "sanna gunnar",
    url: "sanna.gunnar@blogi.fi",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const addedBlog = blogsAtEnd.find((b) => b.title === "sannan blogi");
  expect(addedBlog.likes).toBe(0);
});

test("blog without title is not added", async () => {
  const newBlog = {
    author: "liisa malin",
    url: "liisa.malin@blogi.fi",
    likes: 150,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

test("blog without url is not added", async () => {
  const newBlog = {
    title: "liisan blogi",
    author: "liisa malin",
    likes: 150,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

test("a blog can be deleted", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

  const contents = blogsAtEnd.map((r) => r.title);

  expect(contents).not.toContain(blogToDelete.title);
});

test("a blog can be changed ", async () => {
  const updateBlog = {
    title: "lillin blogi",
    author: "lilli gunnar",
    url: "lilli.gunnar@blogi.fi",
    likes: 200,
  };

  await api
    .put("/api/blogs")
    .send(updateBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((b) => b.title);
  expect(titles).toContain("lillin blogi");
});

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "jmalin",
      name: "Julia Malin",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("expected `username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails if username is too short", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "ro",
      name: "RO",
      password: "sala",
    };
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "User validation failed: username: Path `username` (`ro`) is shorter than the minimum allowed length (3).",
    );
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails if there is no username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "",
      name: "keke",
      password: "sala",
    };
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "User validation failed: username: Path `username` is required.",
    );
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
