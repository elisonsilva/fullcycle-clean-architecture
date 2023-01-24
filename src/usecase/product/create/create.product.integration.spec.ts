import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";
import CreateProductUseCase from "./create.product.usecase";

describe("Unit Test create product use case", () => {
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
     * Should create a product
     */
    it("should create a product", async () => {
        const repository = new ProductRepository();
        const usecase = new CreateProductUseCase(repository)
        const input: InputCreateProductDto = {
            name: "Product 1",
            price: 150
        }

        const output: OutputCreateProductDto = await usecase.execute(input)                                                                                                                                                                                                           
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
    });

    /**
     * Should thrown an error when name is missing
     */
    it("should thrown an error when name is missing", async () => {
        const repository = new ProductRepository();
        const usecase = new CreateProductUseCase(repository)
        const input: InputCreateProductDto = {
            name: "",
            price: 158
        }
        expect(async () => await usecase.execute(input)).rejects.toThrow("Name is required");                                                                                                                                                                                                          
    })

    /**
     * Should thrown an error when price is zero
     */
    it("should thrown an error when price is zero", async () => {
        const repository = new ProductRepository();
        const usecase = new CreateProductUseCase(repository)
        const input: InputCreateProductDto = {
            name: "Product 1",
            price: 0
        }
        expect(async () => await usecase.execute(input)).rejects.toThrow("Price must be greater than zero");
    })
})