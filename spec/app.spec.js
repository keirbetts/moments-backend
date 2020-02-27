process.env.NODE_ENV = "test";
const app = require("../server");
const request = require("supertest")(app);

describe("/api/upload", () => {
  describe("POST", () => {
    test("status: 200 with correct keys and success message", () => {
      return request
        .post("/api/upload")
        .send({
          imageLocation: "https://moments-nc.s3.eu-west-2.amazonaws.com/image-1582728740883.jpeg",
          usr: "crookydan"
        })
        .expect(201)
        .then(({ body }) => {
          expect(body.msg).toBe("success DB update");
          expect(body).toHaveProperty("location");
        });
    }, 10000);
    test("status: 404 when passed an incorrect endpoint", () => {
      return request
        .post("/api/uploa")
        .send({
          imageLocation: "https://moments-nc.s3.eu-west-2.amazonaws.com/image-1582728740883.jpeg",
          usr: "crookydan"
        })
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Path not found");
        });
    }, 10000);
    test("status: 400 when passed incorrect request body", () => {
      return request
        .post("/api/upload")
        .send({
          imageLocation: "https://moments-nc.s3.eu-west-2.amazonaws.com/image-1582728740883.jpeg"
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("The provided key element does not match the schema");
        });
    }, 10000);
    test("status: 400 when passed incorrect request body, user not in database", () => {
      return request
        .post("/api/upload")
        .send({
          imageLocation: "https://moments-nc.s3.eu-west-2.amazonaws.com/image-1582728740883.jpeg",
          usr: "a"
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe(
            "The provided expression refers to an attribute that does not exist in the item"
          );
        });
    }, 10000);
  });
});

describe("api/images/:usr", () => {
  describe("GET", () => {
    test("status: 200 with correct keys and type of string for url", () => {
      return request
        .get("/api/images/crookydan")
        .expect(200)
        .then(({ body }) => {
          if (body.images.length > 0) {
            expect(typeof body.images[0]).toBe("string");
          }
          expect(body).toHaveProperty("images");
        });
    }, 10000);

    test("status: 404 if user does not exist in database", () => {
      return request.get("/api/images/notAuser").expect(404);
    }, 10000);

    test("status: 404 if user does not exist in database", () => {
      return request
        .get("/api/images/notAuser")
        .expect(404)
        .then(({ text }) => {
          expect(text).toBe("user doesn't exist in DB");
        });
    }, 10000);
  });
});
