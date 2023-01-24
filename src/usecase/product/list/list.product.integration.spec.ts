import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe("Unit Test list products use case", () => {
    let sequelize: Sequelize; 
    jest.setTimeout(10_000);
    
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        })

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    /**
     * Should list all products
     */
    it("should list all products", async () => {

        const product1 = new Product("222","Product 1",510);
        const product2 = new Product("111","Product 2",50);

        const repository = new ProductRepository();
        await repository.create(product1);
        await repository.create(product2);

        const result = await new ListProductUseCase(repository).execute({});
        
        // 1
        expect(result.products.length).toBe(2);
        expect(result.products[0].id).toBe(product1.id);
        expect(result.products[0].name).toBe(product1.name);
        expect(result.products[0].price).toBe(product1.price);
        // 2
        expect(result.products[1].id).toBe(product2.id);
        expect(result.products[1].name).toBe(product2.name);
        expect(result.products[1].price).toBe(product2.price);
    });

    /**
     * should return empty list
     */
    it("should return empty list", async () => {
        const repository = new ProductRepository();
        const result = await new ListProductUseCase(repository).execute({});
        expect(result.products.length).toBe(0);
        expect(result.products).toEqual([]);
    });
});