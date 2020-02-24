process.env.NODE_ENV = "test";
const app = require("../server");
const request = require("supertest")(app);

describe("/api/upload", () => {
  describe("POST", () => {
    test("status: 200 returns an object with keys of image and location", () => {
      return request
        .post("/api/upload")
        .expect(200)
        .attach("image.jpeg", "spec/spec-images/IMG_1028.jpg")
        .then(({ body: { img } }) => {
          expect(img).toHaveProperty("image");
          expect(img).toHaveProperty("location");
        });
    });
  });
});
