import Product from "./product";

describe("Product unit tests", () => {

  /**
   * Should throw error when id is empty
  */
  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "Product 1", 100);
    }).toThrowError("product: Id is required");
  });

  /**
   * Should throw error when name is empty
  */
  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("123", "", 100);
    }).toThrowError("product: Name is required");
  });

  /**
   * Should throw error when name is and id are empty
  */
  it("should throw error when name is and id are empty", () => {
    expect(() => {
      const product = new Product("", "", 100);
    }).toThrowError("product: Id is required,product: Name is required");
  });
  
  /**
     * Should throw error when price is less than zero
    */
  it("should throw error when price is less than zero", () => {
    expect(() => {
      const product = new Product("123", "Name", -1);
    }).toThrowError("product: Price must be greater than zero");
  });

  /**
   * Should change name
  */
  it("should change name", () => {
    const product = new Product("123", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  /**
   * Should change price
  */
  it("should change price", () => {
    const product = new Product("123", "Product 1", 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });
});
