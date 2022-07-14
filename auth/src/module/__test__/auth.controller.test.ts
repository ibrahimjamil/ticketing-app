import request from 'supertest';
import app  from '../../app';

it("return 400 if email not correct", async () => {
    await request(app.getApp())
            .post('/api/users/signup')
            .send({
                name: "test",
                password: "test@123",
                email: "test123gmail.com",
                userType: "admin"
            })
            .expect(400);
})

it("return 400 if fields are missing", async () => {
    await request(app.getApp())
            .post('/api/users/signup')
            .send({})
            .expect(400);
})