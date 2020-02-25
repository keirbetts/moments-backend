process.env.NODE_ENV = "test";
const app = require("../server");
const request = require("supertest")(app);

describe("/api/upload", () => {
  describe("POST", () => {
    test("status: 200 returns object with correct keys when passed a .jpg file", () => {
      return request
        .post("/api/upload")
        .expect(200)
        .attach("image.jpeg", "spec/spec-images/IMG_1028.jpg")
        .then(({ body: { img } }) => {
          expect(img).toHaveProperty("image");
          expect(img).toHaveProperty("location");
        });
    });
    test("status: 200 returns object with correct keys when passed a .jpeg file", () => {
      return request
        .post("/api/upload")
        .attach("image.jpeg", "spec/spec-images/IMG_1028.jpeg")
        .expect(200);
    });
    test("status: 200 returns object with correct keys when passed a .png file", () => {
      return request
        .post("/api/upload")
        .attach("image.jpeg", "spec/spec-images/IMG_1028.png")
        .expect(200);
    });
    test("status: 400 returns object with error when passed a .gif file", () => {
      return request
        .post("/api/upload")
        .attach("image.jpeg", "spec/spec-images/shockedPug.gif")
        .expect(400)
        .then(({ body }) => {
          expect(body).toHaveProperty("msg");
          expect(body.msg).toBe("File type must be jpeg|jpg|png");
        });
    });
    test("status: 404 when passed an incorrect endpoint", () => {
      return request
        .post("/api/uploa")
        .attach("image.jpeg", "spec/spec-images/IMG_1028.jpg")
        .expect(404);
    });
    test("status: 400 when passed the wrong field name", () => {
      return request
        .post("/api/upload")
        .attach("imag", "spec/spec-images/IMG_1028.jpg")
        .expect(400);
    });
  });
});
