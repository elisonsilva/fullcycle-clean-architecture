import {app, sequelize} from "../express"
import request from "supertest"

describe("E2E Test for product routes", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    });

    afterAll(async () => {
        await sequelize.close();
    });

    /**
     * should create a product
     */
    it("should create a product", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "Product 1",
                price: 100,
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe("Product 1");
        expect(response.body.price).toBe(100);
    });

    /**
     * Should not create a product
     */
    it("should not create a product", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "",
                price: 452,
            });
        expect(response.statusCode).toBe(500);
    });

    /**
     * Should list all products
     */
    it("should list all products", async () => {
        let response = await request(app)
        .post("/products")
        .send({
            name: "Product 1",
            price: 150
        });
        expect(response.statusCode).toBe(200);
        
        response = await request(app)
        .post("/products")
        .send({
            name: "Product 2",
            price: 200
        });
        expect(response.statusCode).toBe(200);

        response = await request(app)
            .get("/products")
            .send();

        expect(response.status).toBe(200);
        expect(response.body.products.length).toBe(2);
        expect(response.body.products[0].name).toBe("Product 1");
        expect(response.body.products[0].price).toBe(150);
        expect(response.body.products[1].name).toBe("Product 2");
        expect(response.body.products[1].price).toBe(200);
    });
});