import React, { useState } from "react";
import "../task3/style.scss";

export function Task4() {
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [billResult, setBillResult] = useState(null);
    const [isDivided, setIsDivided] = useState(false);

    const assignProductToCustomerDividingForAll = (
        productIndex,
        customerIndex
    ) => {
        const updatedProducts = [...products];
        const consumers = updatedProducts[productIndex].consumers;

        if (!consumers.includes(customerIndex)) {
            consumers.push(customerIndex);
        } else {
            consumers.splice(consumers.indexOf(customerIndex), 1);
        }

        updatedProducts[productIndex].consumers = consumers;

        // Update the quantity in the consumption object
        const quantity = consumers.length;
        const consumption = updatedProducts[productIndex].consumption;
        Object.keys(consumption).forEach((key) => {
            consumption[key] = quantity;
        });

        setProducts(updatedProducts);
    };

    const addProduct = () => {
        if (selectedProduct !== "") {
            setProducts([
                ...products,
                {
                    name: selectedProduct,
                    price: 0,
                    consumers: [],
                    consumption: {},
                },
            ]);
            setSelectedProduct("");
        }
    };

    const setConsumption = (productIndex, customerIndex, consumption) => {
        const updatedProducts = [...products];
        updatedProducts[productIndex].consumption[customerIndex] = consumption;
        setProducts(updatedProducts);
    };

    const addCustomer = () => {
        if (selectedCustomer !== "") {
            setCustomers([
                ...customers,
                { name: selectedCustomer, includeServiceCharge: false },
            ]);
            setSelectedCustomer("");
        }
    };

    const setProductPrice = (index, price) => {
        const updatedProducts = [...products];
        updatedProducts[index].price = parseFloat(price);
        setProducts(updatedProducts);
    };

    const assignProductToCustomer = (productIndex, customerIndex) => {
        const updatedProducts = [...products];
        const consumption = updatedProducts[productIndex].consumption;

        if (!consumption[customerIndex]) {
            consumption[customerIndex] = 1;
        } else {
            consumption[customerIndex] = consumption[customerIndex] + 1;
        }

        updatedProducts[productIndex].consumption = consumption;
        setProducts(updatedProducts);
    };

    const toggleServiceCharge = (customerIndex) => {
        const updatedCustomers = [...customers];
        updatedCustomers[customerIndex].includeServiceCharge =
            !updatedCustomers[customerIndex].includeServiceCharge;
        setCustomers(updatedCustomers);
    };

    const calculateBill = () => {
        const customerAmounts = {};

        customers.forEach((customer, customerIndex) => {
            customerAmounts[customer.name] = 0;
            products.forEach((product) => {
                if (product.consumption[customerIndex]) {
                    const productAmount = parseFloat(product.price);
                    const consumptionQuantity = parseFloat(
                        product.consumption[customerIndex]
                    );
                    const amountPerConsumer = productAmount / quantity; // Use 'quantity' here
                    customerAmounts[customer.name] += amountPerConsumer;
                }
            });

            if (customer.includeServiceCharge) {
                customerAmounts[customer.name] *= 1.1;
            }
        });

        const billResult = Object.keys(customerAmounts).map((customer) => {
            return { name: customer, amount: customerAmounts[customer] };
        });

        setBillResult(billResult);
    };

    return (
        <div className="container-bill">
            <h2>Calculadora de Divisão de Conta</h2>
            <div className="content">
                <div className="container-products">
                    <label className="product-name">
                        Nome dos produtos:
                        <input
                            type="text"
                            value={selectedProduct}
                            onChange={(e) => setSelectedProduct(e.target.value)}
                        />
                        <button onClick={addProduct}>Adicionar</button>
                    </label>
                    <ul>
                        {products.map((product, index) => (
                            <li key={index}>
                                <div className="inputs-wrapper">
                                    <span className="name">{product.name}</span>
                                    <div>
                                        <span className="value">
                                            Valor do Produto{" "}
                                        </span>
                                        R$:{" "}
                                        <input
                                            className="number"
                                            type="number"
                                            value={product.price}
                                            onChange={(e) =>
                                                setProductPrice(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="constumer-check">
                                    <p>Quem consumiu esse produto?</p>
                                    <div className="ifDivided">
                                        <label htmlFor="">
                                            O valor será dividido para quem
                                            consumiu
                                        </label>
                                        <input
                                            type="checkbox"
                                            checked={isDivided}
                                            onChange={() =>
                                                setIsDivided(!isDivided)
                                            }
                                        />
                                    </div>
                                    <div>
                                        {customers.map(
                                            (customer, customerIndex) => (
                                                <div key={customerIndex}>
                                                    {customer.name}
                                                    <input
                                                        type="checkbox"
                                                        checked={product.consumers.includes(
                                                            customerIndex
                                                        )}
                                                        onChange={() =>
                                                            isDivided
                                                                ? assignProductToCustomerDividingForAll(
                                                                      index
                                                                  )
                                                                : assignProductToCustomer(
                                                                      index,
                                                                      customerIndex
                                                                  )
                                                        }
                                                    />
                                                    {isDivided &&
                                                        product.consumers.includes(
                                                            customerIndex
                                                        ) && (
                                                            <>
                                                                {" "}
                                                                Quantidade:
                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    value={
                                                                        product
                                                                            .consumption[
                                                                            customerIndex
                                                                        ]
                                                                            ? product
                                                                                  .consumption[
                                                                                  customerIndex
                                                                              ]
                                                                            : ""
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setConsumption(
                                                                            index,
                                                                            customerIndex,
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                            </>
                                                        )}
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="constumers-wrapper">
                    <label className="label-clients">
                        Clientes:
                        <input
                            type="text"
                            value={selectedCustomer}
                            onChange={(e) =>
                                setSelectedCustomer(e.target.value)
                            }
                        />
                        <button onClick={addCustomer}>Adicionar</button>
                    </label>
                    <div className="checkDiv">
                        {customers.length > 0 ? (
                            <div></div>
                        ) : (
                            <span>Quem irá pagar os 10%?</span>
                        )}
                        <ul>
                            {customers.map((customer, index) => (
                                <li key={index}>
                                    <input
                                        type="checkbox"
                                        checked={customer.includeServiceCharge}
                                        onChange={() =>
                                            toggleServiceCharge(index)
                                        }
                                    />
                                    {customer.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="calculate">
                    <div className="button">
                        <button onClick={calculateBill}>Calcular Conta</button>
                    </div>
                    {billResult && (
                        <div>
                            <h3>Resultado</h3>
                            <ul>
                                {billResult.map((result, index) => (
                                    <li key={index}>
                                        {result.name}: R$
                                        {result.amount.toFixed(2)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
